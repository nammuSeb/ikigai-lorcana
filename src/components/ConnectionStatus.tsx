// src/components/ConnectionStatus.tsx
import React, { useState, useEffect } from 'react';

export const ConnectionStatus: React.FC = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setVisible(true);
            setTimeout(() => setVisible(false), 3000);
        };

        const handleOffline = () => {
            setIsOnline(false);
            setVisible(true);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (!visible) return null;

    return (
        <div className={`connection-status ${isOnline ? 'online' : 'offline'}`}>
            <p>
                {isOnline
                    ? 'Vous êtes de nouveau en ligne. Synchronisation en cours...'
                    : 'Vous êtes hors ligne. Certaines fonctionnalités peuvent être limitées.'}
            </p>
        </div>
    );
};
