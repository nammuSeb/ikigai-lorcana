// src/utils/offlineUtils.ts
// Utilitaires pour la gestion du mode hors ligne

// Fonction pour valider un défi avec support hors ligne
export async function validateDefi(defiId: number, joueurId: number, points: number = 0) {
    const validationData = {
        defiId,
        joueurId,
        points
    };

    // Si en ligne, envoyer directement au serveur
    if (navigator.onLine) {
        try {
            const response = await fetch('/api/defis/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(validationData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la validation du défi');
            }

            return await response.json();
        } catch (error) {
            console.error('Erreur réseau:', error);

            // Si erreur réseau, tomber sur le stockage hors ligne
            return await storeValidationOffline(validationData);
        }
    } else {
        // Si hors ligne, stocker localement
        return await storeValidationOffline(validationData);
    }
}

// Fonction pour stocker une validation en local
async function storeValidationOffline(validationData: any) {
    try {
        // Stocker dans IndexedDB
        const db = await openDB();
        const id = await addToIndexedDB(db, 'pendingValidations', {
            data: validationData,
            timestamp: Date.now()
        });

        // Demander une synchronisation en arrière-plan quand possible
        if ('serviceWorker' in navigator && 'SyncManager' in window) {
            const registration = await navigator.serviceWorker.ready;
            await registration.sync.register('sync-defis-valides');
        }

        return {
            id,
            message: 'Défi validé localement. Sera synchronisé lorsque vous serez à nouveau en ligne.',
            offline: true
        };
    } catch (error) {
        console.error('Erreur lors du stockage hors ligne:', error);
        throw new Error('Impossible de stocker la validation hors ligne');
    }
}

// Fonction pour ouvrir/créer la base de données IndexedDB
function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('inkigaiDB', 1);

        request.onerror = () => reject(request.error);

        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;

            // Créer le store pour les validations en attente s'il n'existe pas
            if (!db.objectStoreNames.contains('pendingValidations')) {
                db.createObjectStore('pendingValidations', { keyPath: 'id', autoIncrement: true });
            }
        };
    });
}

// Fonction pour ajouter des données dans IndexedDB
function addToIndexedDB(db: IDBDatabase, storeName: string, data: any): Promise<number> {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.add(data);

        request.onsuccess = () => resolve(request.result as number);
        request.onerror = () => reject(request.error);
    });
}
