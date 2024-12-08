import React, {useEffect, useState} from 'react';
import Header from '../../components/header/Header';
import Description from '../../components/description/';
import './Leaderboard.css';
import {Link, useSearchParams} from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Player {
    pseudo: string;
    nickname: string;
    pointsByDay: number[];
    totalPoints?: number;
}

interface WeekRange {
    startDate: string;
    endDate: string;
}

const Leaderboard: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [players, setPlayers] = useState<Player[]>([]);
    const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
    const [currentWeek, setCurrentWeek] = useState(1);
    const [weekDates, setWeekDates] = useState<WeekRange>({startDate: '', endDate: ''});
    const [progressPercentage, setProgressPercentage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [hideInactivePlayers, setHideInactivePlayers] = useState(false);

    // Calculer la semaine actuelle en fonction de la date
    const calculateCurrentWeek = (): number => {
        const leagueStart = new Date('2024-11-16');
        const now = new Date();
        const diffTime = now.getTime() - leagueStart.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const weekNumber = Math.floor(diffDays / 7) + 1;
        return Math.min(Math.max(1, weekNumber), 4);
    };

    // Initialiser la semaine depuis l'URL ou calculer la semaine actuelle
    useEffect(() => {
        const weekParam = searchParams.get('week');
        if (weekParam) {
            const weekNumber = parseInt(weekParam, 10);
            if (weekNumber >= 1 && weekNumber <= 4) {
                setCurrentWeek(weekNumber);
            } else {
                const actualWeek = calculateCurrentWeek();
                setSearchParams({week: actualWeek.toString()});
                setCurrentWeek(actualWeek);
            }
        } else {
            const actualWeek = calculateCurrentWeek();
            setSearchParams({week: actualWeek.toString()});
            setCurrentWeek(actualWeek);
        }
    }, [searchParams, setSearchParams]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/classements/leaderboard?week=${currentWeek}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Origin': window.location.origin,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const playersData = Array.isArray(data) ? data : data.players;
                if (Array.isArray(playersData)) {
                    const sortedPlayers = playersData
                        .map((player: Player) => ({
                            ...player,
                            totalPoints: player.pointsByDay.reduce((sum, points) => sum + points, 0),
                        }))
                        .sort((a, b) => b.totalPoints! - a.totalPoints!);

                    setPlayers(sortedPlayers);
                    setFilteredPlayers(sortedPlayers);
                    console.log('players', players)
                }
            })
            .catch((error) => console.error('Erreur lors de la récupération des joueurs :', error));
    }, [currentWeek]);

    useEffect(() => {
        const getCurrentWeekDates = (weekNumber: number): WeekRange => {
            const leagueStart = new Date('2024-11-16');

            const startOfWeek = new Date(leagueStart);
            startOfWeek.setDate(startOfWeek.getDate() + (7 * (weekNumber - 1)));

            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);

            const now = new Date();
            const totalDuration = 4 * 7;
            const startTime = leagueStart.getTime();
            const currentTime = now.getTime();
            const elapsedDays = Math.floor((currentTime - startTime) / (1000 * 60 * 60 * 24));
            const progress = Math.min(100, Math.max(0, (elapsedDays / totalDuration) * 100));

            setProgressPercentage(progress);

            return {
                startDate: startOfWeek.toISOString().split('T')[0],
                endDate: endOfWeek.toISOString().split('T')[0],
            };
        };

        setWeekDates(getCurrentWeekDates(currentWeek));
    }, [currentWeek]);

    useEffect(() => {
        const calculateProgress = () => {
            const leagueStart = new Date('2024-11-16');
            const now = new Date();
            const totalDuration = 4 * 7 * 24 * 60 * 60 * 1000; // 4 semaines en millisecondes
            const elapsedTime = now.getTime() - leagueStart.getTime();
            const progress = Math.min(100, Math.max(0, (elapsedTime / totalDuration) * 100));
            setProgressPercentage(progress);
        };

        calculateProgress();
        // Mettre à jour la progression toutes les minutes
        const intervalId = setInterval(calculateProgress, 60000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        let filtered = players;

        if (searchTerm) {
            filtered = filtered.filter(player =>
                player.pseudo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (player.nickname && player.nickname.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        if (hideInactivePlayers) {
            filtered = filtered.filter(player => player.totalPoints! > 0);
        }

        setFilteredPlayers(filtered);
    }, [searchTerm, players, hideInactivePlayers]);

    const handlePreviousWeek = () => {
        const newWeek = Math.max(1, currentWeek - 1);
        setSearchParams({week: newWeek.toString()});
        setCurrentWeek(newWeek);
    };

    const handleNextWeek = () => {
        const newWeek = Math.min(4, currentWeek + 1);
        setSearchParams({week: newWeek.toString()});
        setCurrentWeek(newWeek);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const toggleInactivePlayers = () => {
        setHideInactivePlayers(!hideInactivePlayers);
    };

    return (
        <div className="leaderboard">
            <Header/>
            <Description/>
            <div className="week-navigation-column">
                <div className="week-controls">
                    <button
                        onClick={handlePreviousWeek}
                        disabled={currentWeek <= 1}
                        className={currentWeek <= 1 ? 'disabled' : ''}
                    >
                        &lt;
                    </button>
                    <span className="semaine-name">Semaine {currentWeek}</span>
                    <button
                        onClick={handleNextWeek}
                        disabled={currentWeek >= 4}
                        className={currentWeek >= 4 ? 'disabled' : ''}
                    >
                        &gt;
                    </button>
                </div>
                <div className="week-dates">
                    <span style={{fontSize: '1.2em', fontWeight: 'bold'}}>
                        Du {weekDates.startDate} au {weekDates.endDate}
                    </span>
                </div>
            </div>

            <div className="container">
                <div className="progress" style={{height: '25px', width: '90vw'}}>
                    <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        style={{width: `${progressPercentage}%`}}
                        aria-valuenow={progressPercentage}
                        aria-valuemin={0}
                        aria-valuemax={100}>
                        <span style={{padding: 3, color: 'rgba(255,255,255,0.8)'}}>{progressPercentage.toFixed(1)}%</span>
                    </div>
                </div>
            </div>

            <div className="filters-container">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Rechercher un joueur..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-input"
                    />
                </div>
                <div className="toggle-container">
                    <label className="toggle-label">
                    <input
                            type="checkbox"
                            checked={hideInactivePlayers}
                            onChange={toggleInactivePlayers}
                            className="toggle-input"
                        />
                        <span className="toggle-text">
                            {hideInactivePlayers ? 'Afficher tous les joueurs' : 'Masquer les joueurs inactifs'}
                        </span>
                    </label>
                </div>
            </div>

            {filteredPlayers.length === 0 ? (
                <div className="no-results">Aucun joueur trouvé</div>
            ) : (
                filteredPlayers.map((player, index) => (
                    <div className="player" key={index}>
                        <Link to={`/membre/${player.pseudo}`}>
                            <div className="player-info">
                                <div className="player-name-container">
                                    <div className="player-name">
                                        {index + 1}. <span style={{color: '#fff'}}>{player.pseudo}</span>
                                    </div>
                                    {player.nickname && (
                                        <div className="player-nickname">
                                            {player.nickname}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="player-points">
                                <div className="points-row">
                                    {Array.from({length: 5}).map((_, i) => (
                                        <div key={i} className="point-wrapper" style={{height: 36, width: 36}}>
                                            {i < player.totalPoints! ? (
                                                <img
                                                    src={'./point_yes.svg'}
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
                                <div className="points-row">
                                    {Array.from({length: 5}).map((_, i) => (
                                        <div key={i + 5} className="point-wrapper" style={{height: 36, width: 36}}>
                                            {i + 5 < player.totalPoints! ? (
                                                <img
                                                    src={'./point_yes.svg'}
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
                            </div>
                        </Link>
                        <hr/>
                    </div>
                ))
            )}
        </div>
    );
};

export default Leaderboard;
