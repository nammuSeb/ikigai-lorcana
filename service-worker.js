// Nom du cache et version (à incrémenter lors des mises à jour)
const CACHE_NAME = 'inkigai-cache-v2'; // Incrémentation de la version
const DATA_CACHE_NAME = 'inkigai-data-cache-v2';

// Les ressources à mettre en cache au démarrage
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/point_yes.svg',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/defi_fixed.svg',
    '/defi_flex.svg',
    '/offline.html',
    '/app.js', // Assurez-vous d'inclure vos scripts JS principaux
    '/styles.css' // Et vos styles CSS
];

// Installation du service worker
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching files');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
            .catch(error => {
                console.error('Service Worker installation failed:', error);
            })
    );
});

// Activation du service worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');

    // Nettoyer les anciens caches
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== DATA_CACHE_NAME) {
                        console.log('Service Worker: Clearing Old Cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
            .then(() => self.clients.claim())
            .catch(error => {
                console.error('Service Worker activation failed:', error);
            })
    );
});

// Interception des requêtes réseau
self.addEventListener('fetch', (event) => {
    // Pour les requêtes API
    if (event.request.url.includes('/api/')) {
        event.respondWith(
            caches.open(DATA_CACHE_NAME).then((cache) => {
                return fetch(event.request)
                    .then((response) => {
                        // Si la réponse est valide, la mettre en cache
                        if (response.status === 200) {
                            cache.put(event.request.url, response.clone());
                            // Également stocker dans IndexedDB pour un accès offline plus robuste
                            storeApiResponseInIndexedDB(event.request.url, response.clone());
                        }
                        return response;
                    })
                    .catch(async (err) => {
                        console.log('Network request failed, attempting to use cache');
                        // En cas d'échec, essayer de récupérer depuis le cache
                        const cachedResponse = await cache.match(event.request);
                        if (cachedResponse) {
                            return cachedResponse;
                        }

                        // Si pas dans le cache, essayer de récupérer depuis IndexedDB
                        try {
                            const db = await openDB();
                            const dataFromIndexedDB = await getApiResponseFromIndexedDB(event.request.url);
                            if (dataFromIndexedDB) {
                                return new Response(JSON.stringify(dataFromIndexedDB), {
                                    headers: { 'Content-Type': 'application/json' }
                                });
                            }
                        } catch (dbError) {
                            console.error('Error retrieving data from IndexedDB:', dbError);
                        }

                        // Si la requête est pour les défis et que nous sommes hors ligne,
                        // retourner des données factices pour l'affichage
                        if (event.request.url.includes('/api/defis/')) {
                            return new Response(
                                JSON.stringify([
                                    {
                                        id: 1,
                                        nom: "Défis non disponibles",
                                        description: "Vous êtes hors ligne. Reconnectez-vous pour voir les défis actuels.",
                                        points: 0,
                                        max_points: 0,
                                        points_type: "fixed",
                                        type: "defi_semaine"
                                    }
                                ]),
                                {
                                    headers: { 'Content-Type': 'application/json' }
                                }
                            );
                        }

                        return Promise.reject('Erreur de récupération des données');
                    });
            })
        );
    }
    // Pour les autres requêtes (HTML, CSS, JS, images, etc.)
    else {
        event.respondWith(
            caches.match(event.request).then((response) => {
                // Cache hit - retourner la réponse du cache
                if (response) {
                    return response;
                }

                // Pas dans le cache, aller chercher sur le réseau
                return fetch(event.request)
                    .then((response) => {
                        // Vérifier que nous avons reçu une réponse valide
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Cloner la réponse
                        const responseToCache = response.clone();

                        // Mettre en cache la nouvelle ressource
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // Si la requête est pour une page HTML et que nous sommes hors ligne,
                        // retourner la page hors ligne
                        if (event.request.mode === 'navigate') {
                            return caches.match('/offline.html');
                        }

                        // Pour les autres ressources, retourner une réponse d'erreur
                        return new Response('Ressource non disponible hors ligne', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({
                                'Content-Type': 'text/plain'
                            })
                        });
                    });
            })
        );
    }
});

// Synchronisation en arrière-plan pour les actions en attente
self.addEventListener('sync', (event) => {
    console.log(`Service Worker: Sync event triggered: ${event.tag}`);
    if (event.tag === 'sync-defis-valides') {
        event.waitUntil(synchronizeDefiValidations());
    }
});

// Messages du client au service worker
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Fonction pour synchroniser les validations de défis stockées en local
async function synchronizeDefiValidations() {
    try {
        const db = await openDB();
        const pendingValidations = await db.getAll('pendingValidations');

        if (pendingValidations && pendingValidations.length > 0) {
            console.log(`Synchronisation de ${pendingValidations.length} validations en attente`);
            let successCount = 0;
            let failureCount = 0;

            for (const validation of pendingValidations) {
                try {
                    const response = await fetch('/api/defis/validate', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(validation.data)
                    });

                    if (response.ok) {
                        // Supprimer la validation de la base de données locale
                        await db.delete('pendingValidations', validation.id);
                        console.log(`Validation ${validation.id} synchronisée avec succès`);
                        successCount++;
                    } else {
                        console.error(`Échec de la synchronisation de la validation ${validation.id}:`, await response.text());
                        failureCount++;
                    }
                } catch (error) {
                    console.error('Erreur lors de la synchronisation:', error);
                    failureCount++;
                }
            }

            // Notifier l'application du résultat de la synchronisation
            const clients = await self.clients.matchAll();
            for (const client of clients) {
                client.postMessage({
                    type: 'SYNC_RESULT',
                    successCount,
                    failureCount,
                    totalCount: pendingValidations.length
                });
            }

            return successCount > 0 ? 'Synchronisation partiellement réussie' : 'Échec de synchronisation';
        } else {
            console.log('Aucune validation en attente à synchroniser');
            return 'Aucune donnée à synchroniser';
        }
    } catch (error) {
        console.error('Erreur lors de la synchronisation des validations:', error);
        return 'Erreur de synchronisation';
    }
}

// Fonction pour stocker une réponse API dans IndexedDB
async function storeApiResponseInIndexedDB(url, response) {
    try {
        const clonedResponse = response.clone();
        const data = await clonedResponse.json();

        const db = await openDB();
        const transaction = db.transaction('cachedApiData', 'readwrite');
        const store = transaction.objectStore('cachedApiData');

        // Vérifier si l'entrée existe déjà
        const existingEntry = await store.get(url);

        if (existingEntry) {
            // Mettre à jour l'entrée existante
            existingEntry.data = data;
            existingEntry.timestamp = Date.now();
            await store.put(existingEntry);
        } else {
            // Créer une nouvelle entrée
            await store.add({
                url,
                data,
                timestamp: Date.now()
            });
        }

        console.log(`API response for ${url} stored in IndexedDB`);
    } catch (error) {
        console.error(`Failed to store API response in IndexedDB:`, error);
    }
}

// Fonction pour récupérer une réponse API depuis IndexedDB
async function getApiResponseFromIndexedDB(url) {
    try {
        const db = await openDB();
        const transaction = db.transaction('cachedApiData', 'readonly');
        const store = transaction.objectStore('cachedApiData');

        const entry = await store.get(url);

        if (entry) {
            console.log(`Retrieved API response for ${url} from IndexedDB`);
            return entry.data;
        }

        return null;
    } catch (error) {
        console.error(`Failed to retrieve API response from IndexedDB:`, error);
        return null;
    }
}

// Fonction pour ouvrir la base de données IndexedDB
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('inkigaiDB', 2); // Augmenter la version pour la mise à jour du schéma

        request.onerror = (event) => {
            console.error('Erreur d\'ouverture de la base de données:', event.target.error);
            reject('Erreur d\'ouverture de la base de données');
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            console.log('Base de données ouverte avec succès');

            // Ajouter des méthodes utiles
            db.getAll = (storeName) => {
                return new Promise((resolve, reject) => {
                    if (!db.objectStoreNames.contains(storeName)) {
                        return reject(`Le store ${storeName} n'existe pas`);
                    }

                    const transaction = db.transaction(storeName, 'readonly');
                    const store = transaction.objectStore(storeName);
                    const request = store.getAll();

                    request.onsuccess = () => resolve(request.result);
                    request.onerror = () => reject(request.error);
                });
            };

            db.get = (storeName, key) => {
                return new Promise((resolve, reject) => {
                    if (!db.objectStoreNames.contains(storeName)) {
                        return reject(`Le store ${storeName} n'existe pas`);
                    }

                    const transaction = db.transaction(storeName, 'readonly');
                    const store = transaction.objectStore(storeName);
                    const request = store.get(key);

                    request.onsuccess = () => resolve(request.result);
                    request.onerror = () => reject(request.error);
                });
            };

            db.delete = (storeName, key) => {
                return new Promise((resolve, reject) => {
                    if (!db.objectStoreNames.contains(storeName)) {
                        return reject(`Le store ${storeName} n'existe pas`);
                    }

                    const transaction = db.transaction(storeName, 'readwrite');
                    const store = transaction.objectStore(storeName);
                    const request = store.delete(key);

                    request.onsuccess = () => resolve(request.result);
                    request.onerror = () => reject(request.error);
                });
            };

            db.add = (storeName, data) => {
                return new Promise((resolve, reject) => {
                    if (!db.objectStoreNames.contains(storeName)) {
                        return reject(`Le store ${storeName} n'existe pas`);
                    }

                    const transaction = db.transaction(storeName, 'readwrite');
                    const store = transaction.objectStore(storeName);
                    const request = store.add(data);

                    request.onsuccess = () => resolve(request.result);
                    request.onerror = () => reject(request.error);
                });
            };

            db.put = (storeName, data) => {
                return new Promise((resolve, reject) => {
                    if (!db.objectStoreNames.contains(storeName)) {
                        return reject(`Le store ${storeName} n'existe pas`);
                    }

                    const transaction = db.transaction(storeName, 'readwrite');
                    const store = transaction.objectStore(storeName);
                    const request = store.put(data);

                    request.onsuccess = () => resolve(request.result);
                    request.onerror = () => reject(request.error);
                });
            };

            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            console.log("Mise à niveau de la base de données");

            // Créer le store pour les validations en attente s'il n'existe pas
            if (!db.objectStoreNames.contains('pendingValidations')) {
                db.createObjectStore('pendingValidations', { keyPath: 'id', autoIncrement: true });
                console.log("Store pendingValidations créé");
            }

            // Créer un store pour les réponses API mises en cache
            if (!db.objectStoreNames.contains('cachedApiData')) {
                const apiStore = db.createObjectStore('cachedApiData', { keyPath: 'url' });
                apiStore.createIndex('timestamp', 'timestamp', { unique: false });
                console.log("Store cachedApiData créé");
            }
        };
    });
}
