import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    const { slug } = useParams<{ slug: string }>();
    const [membre, setMembre] = useState<MembreData | null>(null);
    const [currentWeek, setCurrentWeek] = useState(getCurrentWeek);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            setLoading(true);

            const [playerResponse, defisResponse] = await Promise.all([
                fetch(`https://server.inkigai.ch/api/joueurs/slug/${slug}?week=${currentWeek}`),
                fetch(`https://server.inkigai.ch/api/defis/slug/${slug}?week=${currentWeek}`),
            ]);

            if (!playerResponse.ok) {
                throw new Error("Erreur lors du chargement des données du joueur.");
            }
            if (!defisResponse.ok) {
                if (defisResponse.status === 404) {
                    throw new Error("Défis non trouvés.");
                }
                throw new Error("Erreur lors du chargement des défis.");
            }

            const playerData = await playerResponse.json();
            const defisData = await defisResponse.json();

            setMembre({
                ...playerData,
                defis: defisData.defis || [], // Sécurise en cas de données manquantes
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
            setCurrentWeek((prev) => prev - 1);
        }
    };

    const handleNextWeek = () => {
        if (currentWeek < MAX_WEEKS) {
            setCurrentWeek((prev) => prev + 1);
        }
    };

    if (loading) return <p>Chargement des données...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (!membre) return <p>Aucune donnée trouvée pour ce joueur.</p>;

    return (
        <div className="membre-container">
            <header className="membre-header">
                <div>
                    <h2 className="player-name">{membre.pseudo}</h2>
                    <h4>{membre.nickname}</h4>
                </div>
                <div className="membre-argent">
                    <span style={{fontSize: "2.6em"}}>{membre.argent} </span>
                    <img src="/header_icon_flouze.svg" alt="Flouze icon" style={{height: 64}}/>
                </div>
            </header>

            <div className="decorative-line">
                <div className="center-decor"></div>
            </div>

            <footer className="week-navigation">
                <button
                    onClick={handlePreviousWeek}
                    disabled={currentWeek === 1}
                    className={`nav-button ${currentWeek === 1 ? "disabled" : ""}`}
                >
                    Semaine Précédente
                </button>
                <button
                    onClick={handleNextWeek}
                    disabled={currentWeek === MAX_WEEKS}
                    className={`nav-button ${currentWeek === MAX_WEEKS ? "disabled" : ""}`}
                >
                    Semaine Suivante
                </button>
            </footer>

            <section className="points-area">
                <h3 className="semaine-name">Points Semaine {currentWeek}</h3>
                <div className="player-points">
                    {Array.from({length: 10}).map((_, i) => (
                        <div key={i} style={{height: 36, width: 36}}>
                            {i < (membre.weeklyPoints?.reduce((sum, w) => sum + w.points, 0) || 0) ? (
                                <img
                                    src={"/point_yes.svg"}
                                    alt="point icon"
                                    style={{
                                        transform: `rotate(${Math.floor(Math.random() * 360)}deg)`,
                                    }}
                                    className="point-icon"
                                />
                            ) : (
                                <div className="point_no"></div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <section className="defis-area">
                <h3 className="semaine-name">Défis Semaine {currentWeek}</h3>
                <div className="defis-list">
                    {membre.defis?.length > 0 ? (
                        membre.defis.map((defi, index) => (
                            <div
                                key={`${defi.id}-${index}`}
                                className={`defi-item ${defi.completed ? "completed" : ""}`}
                            >
                                <div className="defi-header">
                                    <h4 className="defi-title">{defi.nom}</h4>
                                </div>
                                <div className="defi-details">
                                    <p className="defi-description">{defi.description}</p>
                                    <p className="defi-points">Points : {defi.points}</p>
                                    <div className="defi-progress">
                                        {Array.from({length: 10}).map((_, i) => (
                                            <div>
                                                {i < defi.points ? (
                                                    <div key={i} style={{height: 64, width: 64}}>
                                                        <img
                                                            src={"/point_yes.svg"}
                                                            alt="point icon"
                                                            style={{
                                                                transform: `rotate(${Math.floor(Math.random() * 360)}deg)`,
                                                                height: 64,
                                                                width: 64
                                                            }}
                                                            className="point-icon"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Aucun défi trouvé pour cette semaine.</p>
                    )}
                </div>
            </section>

        </div>
    );
};

export default Membre;
