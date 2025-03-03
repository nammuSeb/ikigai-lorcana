// Nom du cache
const CACHE_NAME = 'lorcana-league-v1';

// Ressources à mettre en cache
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/assets/index.css',
    '/assets/index.js',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    // Ajoutez d'autres ressources statiques importantes
    '/defi_fixed.svg',
    '/defi_flex.svg',
    '/header_icon_defis.svg',
    '/favicon.ico'
];

// Installation du service worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache ouvert');
                return cache.addAll(urlsToCache);
            })
    );
});

// Stratégie de mise en cache: Network First avec fallback sur Cache
self.addEventListener('fetch', event => {
    // Ignorer les requêtes non GET
    if (event.request.method !== 'GET') return;

    // Ignorer les requêtes Chrome Extension
    if (event.request.url.startsWith('chrome-extension://')) return;

    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Si la requête est pour l'API, ne pas mettre en cache
                if (event.request.url.includes('/api/')) {
                    return response;
                }

                // Cloner la réponse
                const responseToCache = response.clone();

                // Mettre en cache la réponse
                caches.open(CACHE_NAME)
                    .then(cache => {
                        cache.put(event.request, responseToCache);
                    });

                return response;
            })
            .catch(() => {
                // En cas d'échec (hors ligne), essayer de servir depuis le cache
                return caches.match(event.request)
                    .then(cachedResponse => {
                        if (cachedResponse) {
                            return cachedResponse;
                        }

                        // Si pas dans le cache, tenter de retourner la page offline
                        if (event.request.mode === 'navigate') {
                            return caches.match('/offline.html');
                        }

                        // Pour les autres ressources, retourner une réponse vide
                        return new Response('', {
                            status: 408,
                            headers: { 'Content-Type': 'text/plain' }
                        });
                    });
            })
    );
});

// Mise à jour du service worker
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Synchronisation en arrière-plan (pour les validations de défis)
self.addEventListener('sync', event => {
    if (event.tag === 'validate-defi') {
        event.waitUntil(syncValidateDefi());
    }
});

// Fonction pour synchroniser les validations de défis stockées
async function syncValidateDefi() {
    try {
        // Ouvrir la base de données IndexedDB
        const db = await openDB();
        const pendingValidations = await db.getAll('pendingValidations');

        // Si pas de validations en attente, on termine
        if (!pendingValidations || pendingValidations.length === 0) {
            return;
        }

        // Envoyer chaque validation au serveur
        for (let validation of pendingValidations) {
            try {
                const response = await fetch('/api/defis/validate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(validation)
                });

                if (response.ok) {
                    // Supprimer la validation de la base de données
                    await db.delete('pendingValidations', validation.id);
                }
            } catch (error) {
                console.error('Erreur lors de la synchronisation:', error);
            }
        }
    } catch (error) {
        console.error('Erreur lors de la synchronisation:', error);
    }
}

// Fonction pour ouvrir la base de données IndexedDB
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('lorcanaLeagueDB', 1);

        request.onerror = event => {
            reject('Erreur d\'ouverture de la base de données');
        };

        request.onsuccess = event => {
            resolve(event.target.result);
        };

        request.onupgradeneeded = event => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('pendingValidations')) {
                db.createObjectStore('pendingValidations', { keyPath: 'id', autoIncrement: true });
            }
        };
    });
}
