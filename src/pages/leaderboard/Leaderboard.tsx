import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import './Leaderboard.css';
import { Link } from 'react-router-dom';

interface Player {
    pseudo: string;
    pointsByDay: number[];
}

const Leaderboard: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [currentWeek, setCurrentWeek] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:3000/api/classements/leaderboard?week=${currentWeek}`)
            .then((response) => response.json())
            .then((data) => {
                // Calculez la somme des points pour chaque joueur et triez-les par ordre décroissant
                const sortedPlayers = data
                    .map((player: Player) => ({
                        ...player,
                        totalPoints: player.pointsByDay.reduce((sum, points) => sum + points, 0), // Somme des points
                    }))
                    .sort((a, b) => b.totalPoints - a.totalPoints); // Tri décroissant par totalPoints

                setPlayers(sortedPlayers);
            })
            .catch((error) => console.error("Erreur lors de la récupération des joueurs :", error));
    }, [currentWeek]);

    const handlePreviousWeek = () => {
        setCurrentWeek((prevWeek) => Math.max(prevWeek - 1, 1));
    };

    const handleNextWeek = () => {
        setCurrentWeek((prevWeek) => prevWeek + 1);
    };

    return (
        <div className="leaderboard">
            <Header />
            <div className="week-navigation">
                <button onClick={handlePreviousWeek}>&lt;</button>
                <span className="semaine-name">Semaine {currentWeek}</span>
                <button onClick={handleNextWeek}>&gt;</button>
            </div>
            {players.map((player, index) => (
                <div className="player" key={index}>
                    <Link to={`/membre/${player.pseudo}`}>
                        <span className="player-name">
                            {index + 1}. <span style={{ color: '#fff' }}>{player.pseudo}</span> {/* - {player.totalPoints} pts */}
                        </span>
                        <div className="player-points">
                            {player.pointsByDay.map((points, i) => (
                                <div key={i} style={{ height: 36, width: 36 }}>
                                    {points > 0 ? (
                                        <img
                                            src={"./point_yes.svg"}
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
                    </Link>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default Leaderboard;
