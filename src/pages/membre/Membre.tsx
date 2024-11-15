import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Membre.css';

interface Defi {
    nom: string;
    complete: boolean;
}

interface MembreData {
    pseudo: string;
    nickname: string;
    rang: string;
    argent: number;
    points: number;
    semaine: number;
    set_ligue: number;
    avatar_url: string;
    progress_semaine?: number;
    progress_set?: number;
    pointsByWeek?: { [key: number]: number };
    defis?: Defi[];
    session?: number;
    league?: number;
}

const Membre: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [membre, setMembre] = useState<MembreData | null>(null);
    const [currentWeek, setCurrentWeek] = useState(1);
    const [currentSession, setCurrentSession] = useState(1);

    const fetchMembreData = () => {
        if (!slug) return;
        fetch(`https://server.inkigai.ch/api/joueurs/slug/${slug}?week=${currentWeek}&session=${currentSession}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Origin': window.location.origin, // Inclut l'origine actuelle de la requête
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched Membre Data:", data);
                setMembre(data);
            })
            .catch((error) => console.error("Error fetching player data:", error));
    };

    useEffect(() => {
        fetchMembreData();
    }, [slug, currentWeek, currentSession]);

    const handlePreviousWeek = () => setCurrentWeek((prev) => Math.max(prev - 1, 1));
    const handleNextWeek = () => setCurrentWeek((prev) => prev + 1);
    const handlePreviousSession = () => setCurrentSession((prev) => Math.max(prev - 1, 1));
    const handleNextSession = () => setCurrentSession((prev) => prev + 1);

    if (!membre) {
        return <p>Loading player data...</p>;
    }

    return (
        <div className="membre-container">
            <header className="membre-header">
                <h2>{membre.pseudo}</h2>
                <h4>{membre.nickname}</h4>
                <div className="membre-argent">
                    {membre.argent} <img src="/header_icon_flouze.svg" alt="Flouze icon" style={{ height: 32 }} />
                </div>
            </header>

            <div className="session-navigation">
                <button onClick={handlePreviousSession}>&lt;</button>
                <span>Session {membre.session} (League {membre.league})</span>
                <button onClick={handleNextSession}>&gt;</button>
            </div>

            <div className="week-navigation">
                <button onClick={handlePreviousWeek}>&lt;</button>
                <span>Week {currentWeek} of Session</span>
                <button onClick={handleNextWeek}>&gt;</button>
            </div>

            {membre.pointsByWeek && membre.pointsByWeek[currentWeek] !== undefined ? (
                <div>
                    <h3>Points for Week {currentWeek}</h3>
                    <div>Points: {membre.pointsByWeek[currentWeek]}</div>
                </div>
            ) : (
                <p>No data for this week.</p>
            )}

            <section className="defis-section">
                <h3>Weekly Challenges</h3>
                {membre.defis?.length ? (
                    membre.defis.map((defi, index) => (
                        <div key={index} className={`defi-item ${defi.complete ? 'completed' : ''}`}>
                            <span>{defi.nom}</span>
                        </div>
                    ))
                ) : (
                    <p>No challenges for this week.</p>
                )}
            </section>
        </div>
    );
};

export default Membre;
