import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoreCounter.css';

interface PlayerScore {
    score: number;
    name: string;
}

const LoreCounter: React.FC = () => {
    const navigate = useNavigate();
    const [player1, setPlayer1] = useState<PlayerScore>({
        score: 0,
        name: "Joueur 1"
    });
    const [player2, setPlayer2] = useState<PlayerScore>({
        score: 0,
        name: "Joueur 2"
    });

    // Cacher le footer au montage du composant
    useEffect(() => {
        const footer = document.querySelector('footer');
        const menu = document.querySelector('.menu');

        // Cacher les éléments au montage du composant
        if (footer) footer.style.display = 'none';
        if (menu) menu.style.display = 'none';

        // Réafficher les éléments au démontage du composant
        return () => {
            if (footer) footer.style.display = '';
            if (menu) menu.style.display = '';
        };
    }, []);

    const updateScore = (playerNumber: number, increment: boolean) => {
        const player = playerNumber === 1 ? player1 : player2;
        const setPlayer = playerNumber === 1 ? setPlayer1 : setPlayer2;

        let newScore = player.score;

        if (increment && newScore < 20) {
            newScore += 1;
        } else if (!increment && newScore > 0) {
            newScore -= 1;
        }

        setPlayer({
            ...player,
            score: newScore
        });
    };

    const resetGame = () => {
        setPlayer1({ ...player1, score: 0 });
        setPlayer2({ ...player2, score: 0 });
    };

    const quitGame = () => {
        navigate('/');
    };

    const rollDice = () => {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        alert(`Dé: ${randomNumber}`);
    };

    return (
        <div className="lore-game">
            <div className="player-section top">
                <div className="player-info">
                    <button
                        className="button-minus"
                        onClick={() => updateScore(2, false)}
                        disabled={player2.score <= 0}
                    >
                        -
                    </button>
                    <div className="score-diamond">
                        {player2.score}
                    </div>
                    <button
                        className="button-plus"
                        onClick={() => updateScore(2, true)}
                        disabled={player2.score >= 20}
                    >
                        +
                    </button>
                </div>
                <span className="player-name">{player2.name}</span>
            </div>

            <div className="center-section">
                <div className="decorative-line">
                    <div className="dice-icon" onClick={rollDice}></div>
                    <div className="center-circle"></div>
                    <div className="reload-icon" onClick={resetGame}></div>
                    <div className="reload-icon" onClick={quitGame}></div>
                </div>
            </div>

            <div className="player-section bottom">
                <div className="player-info">
                    <button
                        className="button-minus"
                        onClick={() => updateScore(1, false)}
                        disabled={player1.score <= 0}
                    >
                        -
                    </button>
                    <div className="score-diamond crown">
                        {player1.score}
                    </div>
                    <button
                        className="button-plus"
                        onClick={() => updateScore(1, true)}
                        disabled={player1.score >= 20}
                    >
                        +
                    </button>
                </div>
                <span className="player-name">{player1.name}</span>
            </div>
        </div>
    );
};

export default LoreCounter;
