import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Leaderboard from './pages/leaderboard/Leaderboard';
import Defis from './pages/defis/Defis';
import Catalogue from './pages/catalogue/Catalogue';
import Tournois from './pages/tournois/Tournois';
import Reglement from './pages/reglement/reglement';
import Membre from './pages/membre/Membre';
import Footer from './components/footer/Footer';
import Menu from './components/menu/Menu';
import Background from './components/background';
import { ConnectionStatus } from './components/ConnectionStatus';
import LoreCounter from "./pages/lore/LoreCounter";
import './styles/App.css';

// Composant pour la bannière d'installation PWA
const InstallBanner: React.FC = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            // Empêcher Chrome d'afficher automatiquement la boîte de dialogue
            e.preventDefault();
            // Stocker l'événement pour l'utiliser plus tard
            setDeferredPrompt(e);
            // Afficher notre propre bouton d'installation
            setShowInstallPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Afficher la boîte de dialogue d'installation
        deferredPrompt.prompt();

        // Attendre la réponse de l'utilisateur
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`Installation: ${outcome}`);

        // On ne peut plus utiliser le prompt après cela
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
    };

    if (!showInstallPrompt) return null;

    return (
        <div className="install-banner">
            <p>Installez l'application Inkigai pour un accès rapide et hors ligne!</p>
            <div className="install-actions">
                <button onClick={handleInstallClick} className="install-button">
                    Installer
                </button>
                <button
                    onClick={() => setShowInstallPrompt(false)}
                    className="dismiss-button"
                >
                    Pas maintenant
                </button>
            </div>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <Background />
            <ConnectionStatus />
            <InstallBanner />
            <div className="app-content">
                <Routes>
                    <Route path="/" element={<Leaderboard />} />
                    <Route path="/defis" element={<Defis />} />
                    <Route path="/catalogue" element={<Catalogue />} />
                    <Route path="/tournois" element={<Tournois />} />
                    <Route path="/reglement" element={<Reglement />} />
                    <Route path="/lore" element={<LoreCounter />} />
                    {/* <Route path="/compteur" element={<Compteur />} /> */}
                    <Route path="/membre/:slug" element={<Membre />} />
                </Routes>
                <Footer />
                <Menu />
            </div>
        </Router>
    );
};

export default App;
