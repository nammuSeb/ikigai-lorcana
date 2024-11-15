import React, { useEffect, useState } from 'react';
import './Tournois.css';
import { Link } from "react-router-dom";

interface Tournoi {
    id: number;
    nom: string;
    type: string;
    date: string;
    heure: string;
    prix: number;
    participants_max: number;
    description: string;
    location: string;
    lien: string;
    statut: string;
    gagnant_id?: number;
}

interface Joueur {
    id: number;
    pseudo: string;
}

const Tournois: React.FC = () => {
    const [tournois, setTournois] = useState<Tournoi[]>([]);
    const [activeTab, setActiveTab] = useState<string>('a_venir');
    const [joueurs, setJoueurs] = useState<Joueur[]>([]);

    useEffect(() => {
        fetch(`https://server.inkigai.ch/api/tournois?statut=${activeTab}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Origin': window.location.origin, // Inclut l'origine actuelle de la requête
            },
        })
            .then((response) => response.json())
            .then((data) => setTournois(data))
            .catch((error) => console.error('Erreur lors de la récupération des tournois:', error));

        // Récupérer les joueurs pour afficher le nom du gagnant si nécessaire
        fetch('https://server.inkigai.ch/api/joueurs')
            .then((response) => response.json())
            .then((data) => setJoueurs(data))
            .catch((error) => console.error('Erreur lors de la récupération des joueurs:', error));
    }, [activeTab]);

    // Trouver le nom du gagnant par son ID
    const getGagnantName = (gagnantId: number | undefined) => {
        const gagnant = joueurs.find(joueur => joueur.id === gagnantId);
        return gagnant ? gagnant.pseudo : 'Non spécifié';
    };

    return (
        <div className="tournois-container">
            <div className="header-title">
                <h1>Tournois</h1>
                <img src="./header_icon_tournois.svg" alt="Icone tournois" style={{ width: 86 }} />
            </div>
            <div className="decorative-line">
                <div className="center-decor"></div>
            </div>

            <div className="panel-tabs">
                <span
                    className={`tab ${activeTab === 'a_venir' ? 'active' : ''}`}
                    onClick={() => setActiveTab('a_venir')}
                >
                    À venir
                </span>
                <span
                    className={`tab ${activeTab === 'passe' ? 'active' : ''}`}
                    onClick={() => setActiveTab('passe')}
                >
                    Passés
                </span>
            </div>


            <div className="tournois-list">
                {tournois.map((tournoi) => (
                    <div key={tournoi.id} className={`tournoi-card ${tournoi.statut === 'annule' ? 'cancelled' : ''}`}>
                        {activeTab === 'a_venir' ? (
                            <Link to={tournoi.lien}>
                                <TournoiCard tournoi={tournoi} />
                            </Link>
                        ) : (
                            <div>
                                <TournoiCard tournoi={tournoi} />
                                {tournoi.statut === 'passe' && (
                                    <div className="gagnant-info">
                                        <img src="./winner.svg" alt="winner" style={{height: 24}}/> {getGagnantName(tournoi.gagnant_id)}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Composant TournoiCard pour simplifier le code et éviter la duplication
const TournoiCard: React.FC<{ tournoi: Tournoi }> = ({ tournoi }) => (
    <div className="tournoi-card-content">
        <div className="tournoi-header">
            <span className="tournoi-date">
                {new Date(tournoi.date).toLocaleDateString()} - {tournoi.heure}
            </span>
            {tournoi.statut === 'annule' ? (
                <span className="tournoi-status cancelled">ANNULÉ</span>
            ) : tournoi.statut === 'a_venir' ? (
                <button className="register-button">Je m'inscris !</button>
            ) : null}

        </div>
        <h4 className="tournoi-title">
            <span className={`chip tournoi-type`}>
                {tournoi.type.toUpperCase()}
            </span>
        </h4>
        <h3 style={{ color: '#312612', fontWeight: 'bold' }}>{tournoi.nom}</h3>
        <p className="tournoi-description">{tournoi.description}</p>
        <div className="tournoi-details">
            <span className="chip price-chip">{tournoi.prix} CHF</span>
            <span className="chip max-participants-chip">{tournoi.participants_max} Joueurs max.</span>
        </div>
    </div>
);

export default Tournois;
