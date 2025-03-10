import React, {useEffect, useState} from 'react';
import './Defis.css';
import {useSearchParams} from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Defi {
    id: number;
    nom: string;
    description: string;
    points: number;
    points_type: string;
    type: string;
    max_points?: number | null;
    completed?: boolean;
}

interface WeekRange {
    startDate: string;
    endDate: string;
}

interface LeagueInfo {
    startDate: string;
    endDate: string;
    currentWeek: number;
}

const Defis: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [defis, setDefis] = useState<Defi[]>([]);
    const [activeTab, setActiveTab] = useState<string>('defi_semaine');
    const [currentWeek, setCurrentWeek] = useState(1);
    const [weekDates, setWeekDates] = useState<WeekRange>({startDate: '', endDate: ''});
    const [leagueInfo, setLeagueInfo] = useState<LeagueInfo | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Récupérer les informations de la ligue et la semaine actuelle
    useEffect(() => {
        const fetchLeagueInfo = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/defis/league-info`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des informations de la ligue');
                }
                const data = await response.json();
                setLeagueInfo(data);

                // Initialiser la semaine actuelle à partir des données du serveur
                if (!searchParams.get('week')) {
                    setCurrentWeek(data.currentWeek || 1);
                    setSearchParams({ week: (data.currentWeek || 1).toString() });
                }
            } catch (error) {
                console.error('Erreur:', error);
            }
        };

        fetchLeagueInfo();
    }, []);

    // Initialiser la semaine depuis les paramètres d'URL
    useEffect(() => {
        const weekParam = searchParams.get('week');

        if (weekParam) {
            const weekNumber = parseInt(weekParam, 10);
            if (weekNumber >= 1 && weekNumber <= 4) {
                setCurrentWeek(weekNumber);
            } else if (leagueInfo && leagueInfo.currentWeek) {
                // Si semaine invalide, utiliser la semaine actuelle du serveur
                setSearchParams({week: leagueInfo.currentWeek.toString()});
                setCurrentWeek(leagueInfo.currentWeek);
            } else {
                // Fallback à la semaine 1 si pas d'info de ligue
                setSearchParams({week: '1'});
                setCurrentWeek(1);
            }
        }
    }, [searchParams, leagueInfo]);

    // Récupérer les défis selon le type sélectionné
    useEffect(() => {
        const fetchDefis = async () => {
            setIsLoading(true);
            try {
                const url = new URL(`${API_BASE_URL}/api/defis`);
                url.pathname += `/${activeTab}`;

                const response = await fetch(url.toString(), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Origin': window.location.origin,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(`${activeTab} data:`, data);

                if (Array.isArray(data)) {
                    // Handle legacy response format (ancienne structure)
                    setDefis(data);
                } else if (data.defis && Array.isArray(data.defis)) {
                    // Handle new response format (nouvelle structure)
                    setDefis(data.defis);
                } else {
                    // Aucun défi trouvé
                    setDefis([]);
                }
            } catch (error) {
                console.error(`Erreur lors de la récupération des ${activeTab}:`, error);
                setDefis([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDefis();
    }, [activeTab]);

    const handlePreviousWeek = () => {
        const newWeek = Math.max(1, currentWeek - 1);
        setSearchParams({ week: newWeek.toString() });
        setCurrentWeek(newWeek);
    };

    const handleNextWeek = () => {
        const newWeek = Math.min(4, currentWeek + 1);
        setSearchParams({ week: newWeek.toString() });
        setCurrentWeek(newWeek);
    };

    // Formater l'affichage des points
    const formatPoints = (defi: Defi) => {
        if (defi.max_points && defi.max_points > defi.points) {
            return `${defi.points}/${defi.max_points}`;
        }
        return defi.points;
    };

    // Obtenir le texte explicatif pour chaque type de défi
    const getInfoBoxText = () => {
        switch (activeTab) {
            case 'defi_semaine':
                return 'Relevez ces défis hebdomadaires uniques qui changent à chaque semaine !';
            case 'arene':
                return 'Affrontez d\'autres joueurs dans l\'arène pour gagner des points !';
            case 'quete':
                return 'Accomplissez ces quêtes pour gagner des points bonus à utiliser quand vous voulez !';
            default:
                return '';
        }
    };

    // Obtenir l'icône de points appropriée
    const getPointsIcon = (defi: Defi) => {
        if (activeTab === 'defi_semaine' || activeTab === 'arene' || defi.points_type === 'fixed') {
            return './defi_fixed.svg';
        } else {
            return './defi_flex.svg';
        }
    };

    return (
        <div className="defis-container">
            <div className="header-title">
                <h1>Défis</h1>
                <img src="/header_icon_defis.svg" alt="Icone défis" style={{height: 42}}/>
            </div>

            <div className="week-navigation-column">
                {/*
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
                */}
            </div>

            <div className="decorative-line">
                <div className="center-decor"></div>
            </div>

            <div className="panel-tabs">
                <span
                    className={`tab ${activeTab === 'defi_semaine' ? 'active' : ''}`}
                    onClick={() => setActiveTab('defi_semaine')}
                >
                    Défis
                </span>
                <span
                    className={`tab ${activeTab === 'arene' ? 'active' : ''}`}
                    onClick={() => setActiveTab('arene')}
                >
                    Arène
                </span>
                <span
                    className={`tab ${activeTab === 'quete' ? 'active' : ''}`}
                    onClick={() => setActiveTab('quete')}
                >
                    Quêtes
                </span>
            </div>

            <div className="defis-content">
                <div className="info-box">
                    {getInfoBoxText()}
                </div>

                {isLoading ? (
                    <div className="no-defis">Chargement des défis...</div>
                ) : defis.length === 0 ? (
                    <div className="no-defis">Aucun défi disponible pour le moment</div>
                ) : (
                    defis.map((defi) => (
                        <div key={defi.id} className={`defi-item ${defi.completed ? 'completed' : ''}`}>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <h3>{defi.nom}</h3>
                                <p>{defi.description}</p>
                            </div>
                            <div className="points" style={{margin: 14}}>
                                <img
                                    src={getPointsIcon(defi)}
                                    style={{height: defi.points_type === 'fixed' ? 46 : 52}}
                                    alt="Icone des points"
                                    className="points-icon"
                                />
                                <span
                                    className="points-value"
                                    style={{
                                        position: 'absolute',
                                        marginLeft: defi.points_type === 'fixed' ? 14 : 23,
                                        fontSize: '1.6em'
                                    }}
                                >
                                    {formatPoints(defi)}
                                </span>
                            </div>
                            {defi.completed && (
                                <div className="completed-badge" style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    width: '24px',
                                    height: '24px',
                                    background: 'rgba(46, 204, 113, 0.8)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <span style={{color: 'white', fontSize: '14px'}}>✓</span>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            <p className="info-note">
                {activeTab === 'quete' ? (
                    <><img src="defi_flex.svg" alt="icon" style={{height: 24}}/> = Point(s) à mettre sur la semaine de votre choix !</>
                ) : (
                    <><img src="defi_fixed.svg" alt="icon" style={{height: 24}}/> = Point(s) pour la semaine en cours uniquement</>
                )}
            </p>
        </div>
    );
};

export default Defis;
