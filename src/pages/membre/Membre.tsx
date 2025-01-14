import React, { useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import DefisJoueur from './DefisJoueur';
import "./Membre.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
    points_type: string;
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
    const { slug } = useParams<{ slug: string }>();
    const [searchParams] = useSearchParams();
    const [membre, setMembre] = useState<MembreData | null>(null);
    const [currentWeek, setCurrentWeek] = useState(getCurrentWeek);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Remonter en haut de la page lors du montage du composant
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const weekFromURL = searchParams.get('week');
        if (weekFromURL) {
            const week = parseInt(weekFromURL, 10);
            if (week >= 1 && week <= 4) {
                setCurrentWeek(week);
            }
        }
    }, [searchParams]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [playerResponse, defisResponse] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/joueurs/slug/${slug}?week=${currentWeek}`),
                    fetch(`${API_BASE_URL}/api/defis/player/${slug}?week=${currentWeek}`)
                ]);

                if (!playerResponse.ok) {
                    throw new Error("Erreur lors du chargement des données du joueur.");
                }

                const playerData = await playerResponse.json();
                let defisData = { defis: [] };

                if (defisResponse.ok) {
                    defisData = await defisResponse.json();
                }

                setMembre({
                    ...playerData,
                    defis: defisData.defis
                });
                setError(null);
            } catch (err) {
                console.error("Erreur de chargement :", err);
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug, currentWeek]);

    if (loading) return <div className="loading-container">Chargement des données...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!membre) return <div className="not-found-message">Aucune donnée trouvée pour ce joueur.</div>;

    const totalWeekPoints = membre.weeklyPoints?.reduce((sum, w) => sum + w.points, 0) || 0;

    return (
        <div className="membre-container">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                    <img src="/header_icon_flouze.svg" alt="Flouze icon" />
                </div>
            </header>

            <div className="decorative-line">
                <div className="center-decor"></div>
            </div>

            <section className="points-section">
                <div className="week-navigation-row">
                    <button
                        onClick={() => currentWeek > 1 && setCurrentWeek(prev => prev - 1)}
                        disabled={currentWeek === 1}
                        className={`nav-button ${currentWeek === 1 ? 'disabled' : ''}`}
                    >
                        &lt;
                    </button>
                    <h3 className="section-title">Semaine {currentWeek}</h3>
                    <button
                        onClick={() => currentWeek < MAX_WEEKS && setCurrentWeek(prev => prev + 1)}
                        disabled={currentWeek === MAX_WEEKS}
                        className={`nav-button ${currentWeek === MAX_WEEKS ? 'disabled' : ''}`}
                    >
                        &gt;
                    </button>
                </div>

                <div className="points-display">
                    {Array.from({ length: 10 }).map((_, i) => (
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

            <hr />

            <DefisJoueur
                defis={membre.defis}
                currentWeek={currentWeek}
            />
        </div>
    );
};

export default Membre;
