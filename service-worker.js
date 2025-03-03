// Nom du cache et version (à incrémenter lors des mises à jour)
const CACHE_NAME = 'inkigai-cache-v1';
const DATA_CACHE_NAME = 'inkigai-data-cache-v1';

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
  '/offline.html'
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
      }).then(() => self.clients.claim())
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
                }
                return response;
              })
              .catch(async (err) => {
                // En cas d'échec, essayer de récupérer depuis le cache
                const cachedResponse = await cache.match(event.request);
                if (cachedResponse) {
                  return cachedResponse;
                }

                // Si la requête est pour les défis et que nous sommes hors ligne,
                // retourner des données factices pour l'affichage
                if (event.request.url.includes('/api/defis/defi_semaine')) {
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
  if (event.tag === 'sync-defis-valides') {
    event.waitUntil(synchronizeDefiValidations());
  }
});

// Fonction pour synchroniser les validations de défis stockées en local
async function synchronizeDefiValidations() {
  try {
    const db = await openDB();
    const pendingValidations = await db.getAll('pendingValidations');

    if (pendingValidations && pendingValidations.length > 0) {
      console.log(`Synchronisation de ${pendingValidations.length} validations en attente`);

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
          } else {
            console.error(`Échec de la synchronisation de la validation ${validation.id}`);
          }
        } catch (error) {
          console.error('Erreur lors de la synchronisation:', error);
        }
      }
    }
  } catch (error) {
    console.error('Erreur lors de la synchronisation des validations:', error);
  }
}

// Fonction pour ouvrir la base de données IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('inkigaiDB', 1);

    request.onerror = (event) => {
      reject('Erreur d\'ouverture de la base de données');
    };

    request.onsuccess = (event) => {
      const db = event.target.result;

      // Ajouter des méthodes utiles
      db.getAll = (storeName) => {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction(storeName, 'readonly');
          const store = transaction.objectStore(storeName);
          const request = store.getAll();

          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });
      };

      db.delete = (storeName, key) => {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction(storeName, 'readwrite');
          const store = transaction.objectStore(storeName);
          const request = store.delete(key);

          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });
      };

      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Créer le store pour les validations en attente
      if (!db.objectStoreNames.contains('pendingValidations')) {
        db.createObjectStore('pendingValidations', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}
