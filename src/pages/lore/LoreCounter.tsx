import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoreCounter.css';

interface PlayerScore {
    score: number;
    name: string;
    color: string;
    inkCurrent: number;
    timeRemaining?: number; // Pour le timer d'échecs
    turnTimeRemaining?: number; // Pour le timer de tour
}

interface DiceResult {
    value: number;
    visible: boolean;
}

interface BackgroundSettings {
    backgroundImageUrl: string;
    backgroundOpacity: number;
    blendColor: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DEFAULT_BACKGROUND = '/images/lorcana-background.jpg'; // Image par défaut

const LoreCounter: React.FC = () => {
    const navigate = useNavigate();
    const [player1, setPlayer1] = useState<PlayerScore>({
        score: 0,
        name: "Joueur 1",
        color: "#4682b4", // Bleu acier
        inkCurrent: 0,
        timeRemaining: 600, // 10 minutes en secondes (total)
        turnTimeRemaining: 30 // 30 secondes par tour
    });
    const [player2, setPlayer2] = useState<PlayerScore>({
        score: 0,
        name: "Joueur 2",
        color: "#cd5c5c", // Rouge indien
        inkCurrent: 3,
        timeRemaining: 600,
        turnTimeRemaining: 30
    });
    const [currentTurn, setCurrentTurn] = useState(1);
    const [activePlayer, setActivePlayer] = useState(1);
    const [showSettings, setShowSettings] = useState(false);
    const [diceResult, setDiceResult] = useState<DiceResult>({ value: 0, visible: false });
    const [initialDice, setInitialDice] = useState(false);
    const [chessTimerEnabled, setChessTimerEnabled] = useState(false);
    const [turnTimerEnabled, setTurnTimerEnabled] = useState(false);
    const [timerRunning, setTimerRunning] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [defaultTurnTime, setDefaultTurnTime] = useState(30); // 30 secondes par défaut
    const [backgroundSettings, setBackgroundSettings] = useState<BackgroundSettings>({
        backgroundImageUrl: DEFAULT_BACKGROUND,
        backgroundOpacity: 0.6,
        blendColor: '#242b43'
    });

    // Cacher le footer au montage du composant
    useEffect(() => {
        const footer = document.querySelector('footer');
        const menu = document.querySelector('.menu');
        const body = document.body;

        // Cacher les éléments au montage du composant
        if (footer) footer.style.display = 'none';
        if (menu) menu.style.display = 'none';

        // Empêcher le scroll sur le body
        if (body) {
            body.style.overflow = 'hidden';
            body.style.position = 'fixed';
            body.style.width = '100%';
            body.style.height = '100%';
        }

        // Réafficher les éléments au démontage du composant
        return () => {
            if (footer) footer.style.display = '';
            if (menu) menu.style.display = '';

            // Restaurer le scroll sur le body
            if (body) {
                body.style.overflow = '';
                body.style.position = '';
                body.style.width = '';
                body.style.height = '';
            }
        };
    }, []);

    // Récupérer les paramètres de fond d'écran du backend
    useEffect(() => {
        fetch(`${API_BASE_URL}/api/parametres/background-settings`)
            .then((res) => res.json())
            .then((data) => setBackgroundSettings({
                backgroundImageUrl: data.background_image_url || DEFAULT_BACKGROUND,
                backgroundOpacity: data.background_opacity || 0.6,
                blendColor: data.blend_color || '#242b43',
            }))
            .catch((error) => {
                console.error('Erreur lors de la récupération des paramètres :', error);
                // En cas d'erreur, utiliser les valeurs par défaut
                setBackgroundSettings({
                    backgroundImageUrl: DEFAULT_BACKGROUND,
                    backgroundOpacity: 0.6,
                    blendColor: '#242b43'
                });
            });
    }, []);

    // Vérifier si la partie est enregistrée en local storage
    useEffect(() => {
        const savedGame = localStorage.getItem('lorcanaGame');
        if (savedGame) {
            try {
                const gameData = JSON.parse(savedGame);
                setPlayer1(gameData.player1);
                setPlayer2(gameData.player2);
                setCurrentTurn(gameData.turn || 1);
                setActivePlayer(gameData.activePlayer || 1);
                setInitialDice(gameData.initialDice || false);
                setChessTimerEnabled(gameData.chessTimerEnabled || false);
                setTurnTimerEnabled(gameData.turnTimerEnabled || false);
                setDefaultTurnTime(gameData.defaultTurnTime || 30);
            } catch (e) {
                console.error("Erreur lors de la récupération de la partie sauvegardée", e);
            }
        }
        // Ne plus proposer de lancer le dé automatiquement en début de partie
    }, []);

    // Sauvegarder la partie en local storage à chaque changement
    useEffect(() => {
        const gameData = {
            player1,
            player2,
            turn: currentTurn,
            activePlayer,
            initialDice,
            chessTimerEnabled,
            turnTimerEnabled,
            defaultTurnTime
        };
        localStorage.setItem('lorcanaGame', JSON.stringify(gameData));
    }, [player1, player2, currentTurn, activePlayer, initialDice, chessTimerEnabled, turnTimerEnabled, defaultTurnTime]);

    // Gestion des timers (échecs et par tour)
    useEffect(() => {
        if ((chessTimerEnabled || turnTimerEnabled) && timerRunning) {
            timerRef.current = setInterval(() => {
                if (activePlayer === 1) {
                    setPlayer1(prev => {
                        // Mise à jour des timers
                        const newTimeRemaining = chessTimerEnabled ?
                            ((prev.timeRemaining || 0) > 0 ? (prev.timeRemaining || 0) - 1 : 0) :
                            prev.timeRemaining;

                        const newTurnTimeRemaining = turnTimerEnabled ?
                            ((prev.turnTimeRemaining || 0) > 0 ? (prev.turnTimeRemaining || 0) - 1 : 0) :
                            prev.turnTimeRemaining;

                        return {
                            ...prev,
                            timeRemaining: newTimeRemaining,
                            turnTimeRemaining: newTurnTimeRemaining
                        };
                    });

                    // Vérification des conditions de timeout
                    if (chessTimerEnabled && player1.timeRemaining === 1) {
                        alert(`${player2.name} a gagné par timeout (temps global)!`);
                        setTimerRunning(false);
                    }

                    if (turnTimerEnabled && player1.turnTimeRemaining === 1) {
                        alert(`Tour de ${player1.name} terminé (timeout de tour)!`);
                        // Passer automatiquement au joueur suivant
                        nextTurn();
                    }
                } else {
                    setPlayer2(prev => {
                        // Mise à jour des timers
                        const newTimeRemaining = chessTimerEnabled ?
                            ((prev.timeRemaining || 0) > 0 ? (prev.timeRemaining || 0) - 1 : 0) :
                            prev.timeRemaining;

                        const newTurnTimeRemaining = turnTimerEnabled ?
                            ((prev.turnTimeRemaining || 0) > 0 ? (prev.turnTimeRemaining || 0) - 1 : 0) :
                            prev.turnTimeRemaining;

                        return {
                            ...prev,
                            timeRemaining: newTimeRemaining,
                            turnTimeRemaining: newTurnTimeRemaining
                        };
                    });

                    // Vérification des conditions de timeout
                    if (chessTimerEnabled && player2.timeRemaining === 1) {
                        alert(`${player1.name} a gagné par timeout (temps global)!`);
                        setTimerRunning(false);
                    }

                    if (turnTimerEnabled && player2.turnTimeRemaining === 1) {
                        alert(`Tour de ${player2.name} terminé (timeout de tour)!`);
                        // Passer automatiquement au joueur suivant
                        nextTurn();
                    }
                }
            }, 1000);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [chessTimerEnabled, turnTimerEnabled, timerRunning, activePlayer, player1.timeRemaining, player1.turnTimeRemaining, player2.timeRemaining, player2.turnTimeRemaining]);

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

        // Vérifier si un joueur a gagné
        if (newScore >= 20) {
            setTimerRunning(false);
            setTimeout(() => {
                alert(`${player.name} a gagné la partie!`);
            }, 100);
        }
    };

    const updateInk = (playerNumber: number, increment: boolean) => {
        const player = playerNumber === 1 ? player1 : player2;
        const setPlayer = playerNumber === 1 ? setPlayer1 : setPlayer2;

        let newInk = player.inkCurrent;

        if (increment) {
            newInk += 1;
        } else if (!increment && newInk > 0) {
            newInk -= 1;
        }

        setPlayer({
            ...player,
            inkCurrent: newInk
        });
    };

    const nextTurn = () => {
        // Réinitialiser l'encre pour le joueur actif et changer de joueur
        const nextPlayer = activePlayer === 1 ? 2 : 1;
        const player = nextPlayer === 1 ? player1 : player2;
        const setPlayer = nextPlayer === 1 ? setPlayer1 : setPlayer2;

        // Restaurer l'encre de base plus une encre supplémentaire par tour
        const newInkAmount = 3 + Math.min(Math.floor(currentTurn / 2), 3); // Max +3 d'encre supplémentaire

        // Réinitialiser le timer de tour pour le prochain joueur
        setPlayer({
            ...player,
            inkCurrent: newInkAmount,
            turnTimeRemaining: defaultTurnTime // Réinitialiser le timer de tour
        });

        // Incrémenter le tour uniquement si les deux joueurs ont joué
        const newTurn = nextPlayer === 1 ? currentTurn + 1 : currentTurn;

        setActivePlayer(nextPlayer);
        setCurrentTurn(newTurn);

        // Si un des timers est activé, s'assurer que le timer est en marche
        if ((chessTimerEnabled || turnTimerEnabled) && !timerRunning) {
            setTimerRunning(true);
        }
    };

    const resetGame = () => {
        if (window.confirm("Êtes-vous sûr de vouloir réinitialiser la partie?")) {
            setTimerRunning(false);
            setPlayer1({
                ...player1,
                score: 0,
                inkCurrent: 3,
                timeRemaining: 600,
                turnTimeRemaining: defaultTurnTime
            });
            setPlayer2({
                ...player2,
                score: 0,
                inkCurrent: 3,
                timeRemaining: 600,
                turnTimeRemaining: defaultTurnTime
            });
            setCurrentTurn(1);
            setActivePlayer(1);
            setInitialDice(false);

            // Plus de proposition automatique pour le dé
        }
    };

    const quitGame = () => {
        if (window.confirm("Quitter la partie? Votre progression sera sauvegardée.")) {
            setTimerRunning(false);
            navigate('/');
        }
    };

    const rollDice = () => {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        setDiceResult({
            value: randomNumber,
            visible: true
        });

        // Masquer le résultat après 3 secondes
        setTimeout(() => {
            setDiceResult(prev => ({ ...prev, visible: false }));
        }, 3000);
    };

    const rollInitialDice = () => {
        // Lancer deux dés, un pour chaque joueur
        const roll1 = Math.floor(Math.random() * 6) + 1;
        const roll2 = Math.floor(Math.random() * 6) + 1;

        // Déterminer le premier joueur en fonction du résultat le plus élevé
        let firstPlayer = 1;
        let message = '';

        if (roll1 > roll2) {
            firstPlayer = 1;
            message = `${player1.name} commence! (${roll1} vs ${roll2})`;
        } else if (roll2 > roll1) {
            firstPlayer = 2;
            message = `${player2.name} commence! (${roll2} vs ${roll1})`;
        } else {
            message = `Égalité (${roll1}), on relance!`;
            alert(message);
            // Relancer en cas d'égalité
            rollInitialDice();
            return;
        }

        setActivePlayer(firstPlayer);
        setInitialDice(true);
        alert(message);
    };

    const editPlayerName = (playerNumber: number) => {
        const player = playerNumber === 1 ? player1 : player2;
        const setPlayer = playerNumber === 1 ? setPlayer1 : setPlayer2;

        const newName = prompt("Entrez le nom du joueur:", player.name);
        if (newName !== null && newName.trim() !== "") {
            setPlayer({
                ...player,
                name: newName.trim()
            });
        }
    };

    const changePlayerColor = (playerNumber: number, color: string) => {
        const player = playerNumber === 1 ? player1 : player2;
        const setPlayer = playerNumber === 1 ? setPlayer1 : setPlayer2;

        setPlayer({
            ...player,
            color: color
        });
    };

    const formatTime = (seconds: number | undefined, onlySeconds: boolean = false): string => {
        if (seconds === undefined) return onlySeconds ? "00" : "00:00";

        if (onlySeconds && seconds < 60) {
            // Format pour les timers de tour (uniquement en secondes si < 60s)
            return seconds.toString().padStart(2, '0');
        } else {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
    };

    const toggleTimer = () => {
        setTimerRunning(!timerRunning);
    };

    const setPlayerTime = (playerNumber: number, timeInMinutes: number) => {
        const setPlayer = playerNumber === 1 ? setPlayer1 : setPlayer2;
        setPlayer(prev => ({
            ...prev,
            timeRemaining: timeInMinutes * 60
        }));
    };

    const setTurnTime = (seconds: number) => {
        setDefaultTurnTime(seconds);
        // Mettre également à jour le temps de tour restant pour le joueur actif
        if (activePlayer === 1) {
            setPlayer1(prev => ({
                ...prev,
                turnTimeRemaining: seconds
            }));
        } else {
            setPlayer2(prev => ({
                ...prev,
                turnTimeRemaining: seconds
            }));
        }
    };

    // Calculer le style de fond en fonction des paramètres
    const backgroundStyle = {
        backgroundImage: backgroundSettings.backgroundImageUrl ?
            `url(${backgroundSettings.backgroundImageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: backgroundSettings.blendColor,
        position: 'relative' as 'relative',
        overflowY: 'hidden' // Ajout de cette ligne pour empêcher le scroll
    };

    // Couche d'opacité pour le mélange
    const overlayStyle = {
        position: 'absolute' as 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: backgroundSettings.blendColor,
        opacity: backgroundSettings.backgroundOpacity,
        zIndex: -1
    };

    return (
        <div className="lore-game" style={backgroundStyle}>
            {backgroundSettings.backgroundImageUrl && <div style={overlayStyle}></div>}

            <div className="player-section top" style={{backgroundColor: `${player2.color}22`}}>
                <div className="player-content">
                    <div className="player-info-lore">
                        <button
                            className="button-plus button-round"
                            onClick={() => updateScore(2, true)}
                            disabled={player2.score >= 20}
                        >
                            +
                        </button>
                        <div
                            className={`score-diamond ${activePlayer === 2 ? 'active' : ''}`}
                            style={{borderColor: player2.color}}
                        >
                            {player2.score}
                        </div>
                        <button
                            className="button-minus button-round"
                            onClick={() => updateScore(2, false)}
                            disabled={player2.score <= 0}
                        >
                            -
                        </button>
                    </div>
                    <div className="player-details">
            <span className="player-name" onClick={() => editPlayerName(2)}>
                {player2.name}
            </span>
                        <div className="ink-counter">
                            <span>Encre: {player2.inkCurrent}</span>
                            <div className="ink-buttons">
                                <button className="button-round-small" onClick={() => updateInk(2, false)}>-</button>
                                <button className="button-round-small" onClick={() => updateInk(2, true)}>+</button>
                            </div>
                        </div>
                        {chessTimerEnabled && (
                            <div className="timer-display">
                                <span>{formatTime(player2.timeRemaining)}</span>
                            </div>
                        )}
                        {turnTimerEnabled && (
                            <div className="turn-timer-display">
                                <span>Tour: {formatTime(player2.turnTimeRemaining, true)}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="center-section">
                <div className="game-info">
                    <span className="turn-info">Tour {currentTurn}</span>
                    <span className="active-player">
                        {activePlayer === 1 ? player1.name : player2.name}
                    </span>
                </div>

                <div className="action-buttons">
                    <button className="action-button dice-btn button-round-med" onClick={rollDice} title="Lancer le dé">
                        <span>Dé</span>
                    </button>
                    <button className="action-button next-btn button-round-med" onClick={nextTurn} title="Tour suivant">
                        <span>Suivant</span>
                    </button>
                    <button className="action-button settings-btn button-round-med"
                            onClick={() => setShowSettings(!showSettings)} title="Paramètres">
                        <span>⚙️</span>
                    </button>
                </div>

                {(chessTimerEnabled || turnTimerEnabled) && (
                    <div className="timer-controls">
                        <button
                            className={`timer-button ${timerRunning ? 'timer-pause' : 'timer-play'} button-round-med`}
                            onClick={toggleTimer}
                        >
                            <span className="timer-icon">{timerRunning ? 'II' : '▶️'}</span>
                        </button>
                    </div>
                )}

                <div className="secondary-buttons">
                    <button className="action-button button-round-med" onClick={resetGame} title="Réinitialiser">
                        <span>♻️</span>
                    </button>
                    <button className="action-button button-round-med" onClick={quitGame} title="Quitter">
                        <span>❌</span>
                    </button>
                </div>
            </div>

            <div className="player-section bottom" style={{ backgroundColor: `${player1.color}22` }}>
                <div className="player-info-lore">
                    <button
                        className="button-minus button-round"
                        onClick={() => updateScore(1, false)}
                        disabled={player1.score <= 0}
                    >
                        -
                    </button>
                    <div
                        className={`score-diamond ${activePlayer === 1 ? 'active' : ''}`}
                        style={{ borderColor: player1.color }}
                    >
                        {player1.score}
                    </div>
                    <button
                        className="button-plus button-round"
                        onClick={() => updateScore(1, true)}
                        disabled={player1.score >= 20}
                    >
                        +
                    </button>
                </div>
                <div className="player-details">
                    <span className="player-name" onClick={() => editPlayerName(1)}>
                        {player1.name}
                    </span>
                    <div className="ink-counter">
                        <span>Encre: {player1.inkCurrent}</span>
                        <div className="ink-buttons">
                            <button className="button-round-small" onClick={() => updateInk(1, false)}>-</button>
                            <button className="button-round-small" onClick={() => updateInk(1, true)}>+</button>
                        </div>
                    </div>
                    {chessTimerEnabled && (
                        <div className="timer-display">
                            <span>{formatTime(player1.timeRemaining)}</span>
                        </div>
                    )}
                    {turnTimerEnabled && (
                        <div className="turn-timer-display">
                            <span>Tour: {formatTime(player1.turnTimeRemaining, true)}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Affichage du résultat du dé */}
            {diceResult.visible && (
                <div className="dice-result">
                    <div className="dice-value">{diceResult.value}</div>
                </div>
            )}

            {/* Paramètres */}
            {showSettings && (
                <div className="settings-panel">
                    <div className="settings-header">
                        <h3>Paramètres</h3>
                        <button onClick={() => setShowSettings(false)}>✕</button>
                    </div>
                    <div className="settings-content">
                        <div className="player-settings">
                            <h4>{player1.name}</h4>
                            <div className="color-selector">
                                <span>Couleur:</span>
                                <div className="color-options">
                                    <div className="color-option blue" onClick={() => changePlayerColor(1, "#4682b4")}></div>
                                    <div className="color-option green" onClick={() => changePlayerColor(1, "#2e8b57")}></div>
                                    <div className="color-option purple" onClick={() => changePlayerColor(1, "#9370db")}></div>
                                    <div className="color-option orange" onClick={() => changePlayerColor(1, "#ff7f50")}></div>
                                </div>
                            </div>
                        </div>

                        <div className="player-settings">
                            <h4>{player2.name}</h4>
                            <div className="color-selector">
                                <span>Couleur:</span>
                                <div className="color-options">
                                    <div className="color-option red" onClick={() => changePlayerColor(2, "#cd5c5c")}></div>
                                    <div className="color-option yellow" onClick={() => changePlayerColor(2, "#daa520")}></div>
                                    <div className="color-option teal" onClick={() => changePlayerColor(2, "#20b2aa")}></div>
                                    <div className="color-option pink" onClick={() => changePlayerColor(2, "#db7093")}></div>
                                </div>
                            </div>
                        </div>

                        <div className="timer-settings">
                            <h4>Timers</h4>
                            <div className="timer-options">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={chessTimerEnabled}
                                        onChange={() => setChessTimerEnabled(!chessTimerEnabled)}
                                    />
                                    Timer global (échecs)
                                </label>

                                {chessTimerEnabled && (
                                    <div className="time-selector">
                                        <div className="time-preset">
                                            <span>Temps total par joueur:</span>
                                            <div className="time-buttons">
                                                <button onClick={() => {
                                                    setPlayerTime(1, 5);
                                                    setPlayerTime(2, 5);
                                                }}>5 min</button>
                                                <button onClick={() => {
                                                    setPlayerTime(1, 10);
                                                    setPlayerTime(2, 10);
                                                }}>10 min</button>
                                                <button onClick={() => {
                                                    setPlayerTime(1, 15);
                                                    setPlayerTime(2, 15);
                                                }}>15 min</button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <label className="mt-3">
                                    <input
                                        type="checkbox"
                                        checked={turnTimerEnabled}
                                        onChange={() => setTurnTimerEnabled(!turnTimerEnabled)}
                                    />
                                    Timer par tour
                                </label>

                                {turnTimerEnabled && (
                                    <div className="time-selector">
                                        <div className="time-preset">
                                            <span>Secondes par tour:</span>
                                            <div className="time-buttons">
                                                <button onClick={() => setTurnTime(15)}>15s</button>
                                                <button onClick={() => setTurnTime(30)}>30s</button>
                                                <button onClick={() => setTurnTime(60)}>60s</button>
                                                <button onClick={() => setTurnTime(120)}>2min</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="dice-settings">
                            <h4>Dé</h4>
                            <div className="settings-actions">
                                <button onClick={rollInitialDice} className="button-round-med">
                                    Lancer le dé pour déterminer le premier joueur
                                </button>
                            </div>
                        </div>

                        <div className="background-settings">
                            <h4>Apparence</h4>
                            <div className="theme-selector">
                                <button onClick={() => setBackgroundSettings({
                                    ...backgroundSettings,
                                    backgroundImageUrl: '/images/lorcana-background.jpg',
                                    blendColor: '#242b43'
                                })}>
                                    Thème Lorcana
                                </button>
                                <button onClick={() => setBackgroundSettings({
                                    ...backgroundSettings,
                                    backgroundImageUrl: '/images/castle-background.jpg',
                                    blendColor: '#1e2f3d'
                                })}>
                                    Thème Château
                                </button>
                                <button onClick={() => setBackgroundSettings({
                                    ...backgroundSettings,
                                    backgroundImageUrl: '',
                                    blendColor: '#242b43'
                                })}>
                                    Thème Uni
                                </button>
                            </div>

                            <div className="opacity-slider">
                                <span>Opacité du fond:</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={backgroundSettings.backgroundOpacity}
                                    onChange={(e) => setBackgroundSettings({
                                        ...backgroundSettings,
                                        backgroundOpacity: parseFloat(e.target.value)
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoreCounter;
