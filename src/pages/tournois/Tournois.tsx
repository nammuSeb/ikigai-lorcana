import React, { useEffect, useState } from 'react';
import './Tournois.css';
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

interface FetchState<T> {
    data: T[];
    loading: boolean;
    error: string | null;
}

const Tournois: React.FC = () => {
    const [tournoisState, setTournoisState] = useState<FetchState<Tournoi>>({
        data: [],
        loading: true,
        error: null
    });
    const [joueursState, setJoueursState] = useState<FetchState<Joueur>>({
        data: [],
        loading: true,
        error: null
    });
    const [activeTab, setActiveTab] = useState<string>('a_venir');

    const fetchData = async (url: string, options = {}) => {
        console.log('Fetching from URL:', url);
        const response = await fetch(url, options);
        console.log('Response status:', response.status);

        if (!response.ok) {
            const contentType = response.headers.get('content-type');
            const text = await response.text();
            console.log('Error response:', text);
            throw new Error(`Server returned status ${response.status}: ${text}`);
        }

        return response.json();
    };

    useEffect(() => {
        const fetchTournois = async () => {
            try {
                setTournoisState(prev => ({ ...prev, loading: true, error: null }));
                const data = await fetchData(`${API_BASE_URL}/api/tournois?statut=${activeTab}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Origin': window.location.origin,
                    },
                });
                setTournoisState({ data, loading: false, error: null });
            } catch (error) {
                console.error('Tournament fetch error:', error);
                setTournoisState(prev => ({
                    ...prev,
                    data: [],
                    loading: false,
                    error: error instanceof Error ? error.message : 'Une erreur est survenue'
                }));
            }
        };

        fetchTournois();
    }, [activeTab]);

    useEffect(() => {
        const fetchJoueurs = async () => {
            try {
                const data = await fetchData(`${API_BASE_URL}/api/joueurs`);
                setJoueursState({ data, loading: false, error: null });
            } catch (error) {
                console.error('Players fetch error:', error);
                setJoueursState(prev => ({
                    ...prev,
                    data: [],
                    loading: false,
                    error: error instanceof Error ? error.message : 'Une erreur est survenue'
                }));
            }
        };

        fetchJoueurs();
    }, []);

    const getGagnantInfo = (gagnantId: number | undefined) => {
        const gagnant = joueursState.data.find(joueur => joueur.id === gagnantId);
        return gagnant ? {
            pseudo: gagnant.pseudo,
            lien: `/membre/${gagnant.pseudo}`
        } : null;
    };

    // Show error if both requests failed
    if (tournoisState.error && joueursState.error) {
        return (
            <div className="error-container">
                <p className="error-message">Erreur tournois: {tournoisState.error}</p>
                <p className="error-message">Erreur joueurs: {joueursState.error}</p>
            </div>
        );
    }

    // Show loading only if tournaments are still loading
    if (tournoisState.loading) {
        return <div className="loading">Chargement des tournois...</div>;
    }

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
                {tournoisState.data.length === 0 ? (
                    <div className="no-tournaments">Aucun tournoi disponible pour le moment</div>
                ) : (
                    tournoisState.data.map((tournoi) => (
                        <div key={tournoi.id} className={`tournoi-card ${tournoi.statut === 'annule' ? 'cancelled' : ''}`}>
                            {activeTab === 'a_venir' ? (
                                <Link to={tournoi.lien}>
                                    <TournoiCard tournoi={tournoi} />
                                </Link>
                            ) : (
                                <div>
                                    <TournoiCard tournoi={tournoi} />
                                    {tournoi.statut === 'passe' && tournoi.gagnant_id && (
                                        <div className="gagnant-info">
                                            <img src="./winner.svg" alt="winner" style={{height: 24}}/>
                                            {(() => {
                                                const gagnantInfo = getGagnantInfo(tournoi.gagnant_id);
                                                return gagnantInfo ? (
                                                    <Link to={gagnantInfo.lien} className="gagnant-link">
                                                        {gagnantInfo.pseudo}
                                                    </Link>
                                                ) : (
                                                    'Non spécifié'
                                                );
                                            })()}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

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
