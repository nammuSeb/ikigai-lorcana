import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Leaderboard from './pages/leaderboard/Leaderboard';
import Defis from './pages/defis/Defis';
import Catalogue from './pages/catalogue/Catalogue';
import Tournois from './pages/tournois/Tournois';
import Reglement from './pages/reglement/reglement';
import Compteur from './pages/compteur/Compteur';
import Membre from './pages/membre/Membre';
import Footer from './components/footer/Footer';
import Menu from './components/menu/Menu';
import Background from './components/background';
import './styles/App.css';
import LoreCounter from "./pages/lore/LoreCounter";

const App: React.FC = () => {
    return (
        <Router>
            <Background />
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
