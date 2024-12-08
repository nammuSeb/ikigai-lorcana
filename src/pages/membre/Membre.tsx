import React, {useEffect, useState} from "react";
import {useParams, Link, useSearchParams} from "react-router-dom";
import "./Membre.css";

interface WeeklyPoints {
    points: number;
    startDate: string;
    endDate: string;
}

interface Defi {
    id: number;
    nom: string;
    description: string;
    points: number;
    completed: boolean;
}

interface MembreData {
    pseudo: string;
    nickname: string;
    argent: number;
    avatar_url: string;
    weeklyPoints: WeeklyPoints[];
    defis: Defi[];
}

const MAX_WEEKS = 4;
const POINT_ZERO = new Date("2024-11-15");

const getCurrentWeek = (): number => {
    const now = new Date();
    const timeDiff = now.getTime() - POINT_ZERO.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return Math.min(Math.max(Math.ceil(daysDiff / 7), 1), MAX_WEEKS);
};

const Membre: React.FC = () => {
    const {slug} = useParams<{ slug: string }>();
    const [searchParams] = useSearchParams();
    const [membre, setMembre] = useState<MembreData | null>(null);
    const [currentWeek, setCurrentWeek] = useState(getCurrentWeek);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const currentWeekFromURL = searchParams.get('week');

    useEffect(() => {
        if (currentWeekFromURL) {
            const week = parseInt(currentWeekFromURL, 10);
            if (week >= 1 && week <= 4) {
                setCurrentWeek(week);
            }
        }
    }, [currentWeekFromURL]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [playerResponse, defisResponse] = await Promise.all([
                fetch(`http://localhost:3000/api/joueurs/slug/${slug}?week=${currentWeek}`),
                fetch(`http://localhost:3000/api/defis/slug/${slug}?week=${currentWeek}`)
            ]);

            if (!playerResponse.ok) {
                throw new Error("Erreur lors du chargement des données du joueur.");
            }

            const playerData = await playerResponse.json();
            let defisData = {defis: []};

            if (defisResponse.ok) {
                defisData = await defisResponse.json();
            }

            // Dédupliquer les défis
            const uniqueDefis = Array.from(
                new Set(defisData.defis.map((d: Defi) => d.id))
            ).map(id => defisData.defis.find((d: Defi) => d.id === id));

            setMembre({
                ...playerData,
                defis: uniqueDefis
            });
            setError(null);
        } catch (err) {
            console.error("Erreur de chargement :", err);
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [slug, currentWeek]);

    const handlePreviousWeek = () => {
        if (currentWeek > 1) {
            setCurrentWeek(prev => prev - 1);
        }
    };

    const handleNextWeek = () => {
        if (currentWeek < MAX_WEEKS) {
            setCurrentWeek(prev => prev + 1);
        }
    };

    if (loading) return <div className="loading-container">Chargement des données...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!membre) return <div className="not-found-message">Aucune donnée trouvée pour ce joueur.</div>;

    const totalWeekPoints = membre.weeklyPoints?.reduce((sum, w) => sum + w.points, 0) || 0;

    return (
        <div className="membre-container">
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Link
                    to={`/?week=${currentWeek}`}
                    className="back-to-leaderboard"
                >
                    <span className="back-arrow">←</span>
                    <span>Retour au classement</span>
                </Link>
            </div>

            <header className="membre-header">
                <div className="membre-info">
                    <h2 className="player-name">{membre.pseudo}</h2>
                    {membre.nickname && <h4 className="player-nickname">{membre.nickname}</h4>}
                </div>
                <div className="membre-argent">
                    <span>{membre.argent}</span>
                    <img src="/header_icon_flouze.svg" alt="Flouze icon"/>
                </div>
            </header>

            <div className="decorative-line">
                <div className="center-decor"></div>
            </div>

            <section className="points-section">
                <div className="points-header">
                    <div className="week-navigation-row">
                        <button
                            onClick={handlePreviousWeek}
                            disabled={currentWeek === 1}
                            className={`nav-button ${currentWeek === 1 ? 'disabled' : ''}`}
                        >
                            &lt;
                        </button>
                        <h3 className="section-title">Semaine {currentWeek}</h3>
                        <button
                            onClick={handleNextWeek}
                            disabled={currentWeek === MAX_WEEKS}
                            className={`nav-button ${currentWeek === MAX_WEEKS ? 'disabled' : ''}`}
                        >
                            &gt;
                        </button>
                    </div>
                </div>

                <hr/>

                <div className="points-display">
                    {Array.from({length: 10}).map((_, i) => (
                        <div key={i} className="point-slot">
                            {i < totalWeekPoints ? (
                                <img
                                    src="/point_yes.svg"
                                    alt="Point obtenu"
                                    className="point-icon active"
                                    style={{
                                        transform: `rotate(${Math.floor(Math.random() * 360)}deg)`
                                    }}
                                />
                            ) : (
                                <div className="point-icon empty"></div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
            <hr/>
            <section className="defis-section">
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <h3 className="section-title">Défis de la semaine {currentWeek}</h3>
                </div>
                {membre.defis.length > 0 ? (
                        membre.defis.map((defi) => (
                            <div
                                key={defi.id}
                                className={`defi-card ${defi.completed ? 'completed' : ''}`}
                            >
                                <div className="defi-content">
                                    <h4 className="defi-title">{defi.nom}</h4>
                                    <p className="defi-description">{defi.description}</p>
                                    <div className="defi-points">
                                        {Array.from({length: defi.points}).map((_, i) => (
                                            <div key={i} className="point-slot small">
                                                {defi.completed ? (
                                                    <img
                                                        src="/point_yes.svg"
                                                        alt="Point obtenu"
                                                        className="point-icon small active"
                                                    />
                                                ) : (
                                                    <div className="point-icon small empty"></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-defis-message">Aucun défi disponible pour cette semaine.</p>
                    )}
            </section>
        </div>
    );
};

export default Membre;
