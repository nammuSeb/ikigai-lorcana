import React, { useEffect, useState } from 'react';
import './Tournois.css';

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
}

const Tournois: React.FC = () => {
    const [tournois, setTournois] = useState<Tournoi[]>([]);
    const [activeTab, setActiveTab] = useState<string>('a_venir');

    useEffect(() => {
        fetch(`http://localhost:3000/api/tournois?statut=${activeTab}`)
            .then((response) => response.json())
            .then((data) => setTournois(data))
            .catch((error) => console.error('Erreur lors de la récupération des tournois:', error));
    }, [activeTab]);

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

            <p className="tournois-description">
                Texte présentation tournoi + gagner du Flouzeborn
            </p>

            <div className="tournois-list">
                {tournois.map((tournoi) => (
                    <div key={tournoi.id} className={`tournoi-card ${tournoi.statut === 'annule' ? 'cancelled' : ''}`}>
                        <div className="tournoi-header">
                            <span className="tournoi-date">{new Date(tournoi.date).toLocaleDateString()} - {tournoi.heure}</span>
                            {tournoi.statut === 'annule' ? (
                                <span className="tournoi-status cancelled">ANNULÉ</span>
                            ) : (
                                <button className="register-button">Je m'inscris !</button>
                            )}
                        </div>
                        <h2 className="tournoi-title">
                            <span className={`tournoi-type ${tournoi.type.toLowerCase()}`}>{tournoi.type.toUpperCase()}</span> {tournoi.nom}
                        </h2>
                        <p className="tournoi-description">{tournoi.description}</p>
                        <div className="tournoi-details">
                            <span>{tournoi.prix} CHF {tournoi.inclus && `(incl. ${tournoi.inclus})`}</span>
                            <span>{tournoi.participants_max} Joueurs max.</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tournois;
