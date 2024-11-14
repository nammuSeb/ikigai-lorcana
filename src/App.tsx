import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Leaderboard from './pages/leaderboard/Leaderboard';
import Defis from './pages/defis/Defis';
import Catalogue from './pages/catalogue/Catalogue';
import Tournois from './pages/tournois/Tournois';
import Compteur from './pages/compteur/Compteur';
import Membre from './pages/membre/Membre';
import Footer from './components/footer/Footer';
import './styles/App.css';

const App: React.FC = () => {
    return (
        <Router>
            <div className="app-content">
                <Routes>
                    <Route path="/" element={<Leaderboard />} />
                    <Route path="/defis" element={<Defis />} />
                    <Route path="/catalogue" element={<Catalogue />} />
                    <Route path="/tournois" element={<Tournois />} />
                    {/* <Route path="/compteur" element={<Compteur />} /> */}
                    <Route path="/membre/:slug" element={<Membre />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
