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
}

interface WeekRange {
    startDate: string;
    endDate: string;
}

interface LeagueConfig {
    startDate: Date;
    endDate: Date;
}

// Configuration des ligues
const LEAGUES: { [key: string]: LeagueConfig } = {
    '2024': {
        startDate: new Date('2024-11-16'),
        endDate: new Date('2024-12-13')
    },
    '2025': {
        startDate: new Date('2025-01-10'),
        endDate: new Date('2025-02-09')
    }
};

const Defis: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [defis, setDefis] = useState<Defi[]>([]);
    const [activeTab, setActiveTab] = useState<string>('arene');
    const [currentWeek, setCurrentWeek] = useState(1);
    const [weekDates, setWeekDates] = useState<WeekRange>({startDate: '', endDate: ''});
    const [currentYear, setCurrentYear] = useState('2025');

    // Calculer la semaine actuelle en fonction de la date
    const calculateCurrentWeek = (): number => {
        const leagueStart = new Date('2024-11-16');
        const now = new Date();
        const diffTime = now.getTime() - leagueStart.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const weekNumber = Math.floor(diffDays / 7) + 1;
        return Math.min(Math.max(1, weekNumber), 4);
    };


    // Calculer les dates pour une semaine donnée
    const getWeeklyPeriod = (weekNumber: number, year: string): WeekRange => {
        const leagueConfig = LEAGUES[year];
        const startOfWeek = new Date(leagueConfig.startDate);
        startOfWeek.setDate(leagueConfig.startDate.getDate() + (7 * (weekNumber - 1)));

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        return {
            startDate: startOfWeek.toISOString().split('T')[0],
            endDate: endOfWeek.toISOString().split('T')[0],
        };
    };

    // Initialiser l'année et la semaine
    useEffect(() => {
        const yearParam = searchParams.get('year') || '2025';
        const weekParam = searchParams.get('week');

        setCurrentYear(yearParam);

        if (weekParam) {
            const weekNumber = parseInt(weekParam, 10);
            if (weekNumber >= 1 && weekNumber <= 4) {
                setCurrentWeek(weekNumber);
            } else {
                const actualWeek = calculateCurrentWeek(yearParam);
                setSearchParams({ week: actualWeek.toString(), year: yearParam });
                setCurrentWeek(actualWeek);
            }
        } else {
            const actualWeek = calculateCurrentWeek(yearParam);
            setSearchParams({ week: actualWeek.toString(), year: yearParam });
            setCurrentWeek(actualWeek);
        }
    }, [searchParams, setSearchParams]);

    useEffect(() => {
        setWeekDates(getWeeklyPeriod(currentWeek, currentYear));
    }, [currentWeek, currentYear]);

    useEffect(() => {
        const fetchDefis = async () => {
            try {
                const url = new URL(`${API_BASE_URL}/api/defis`);
                url.pathname += `/${activeTab}`;
                url.searchParams.append('week', currentWeek.toString());
                url.searchParams.append('year', currentYear);

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
                setDefis(Array.isArray(data) ? data : data.defis || []);
            } catch (error) {
                console.error('Erreur lors de la récupération des défis:', error);
                setDefis([]);
            }
        };

        fetchDefis();
    }, [activeTab, currentWeek, currentYear]);

    const handlePreviousWeek = () => {
        const newWeek = Math.max(1, currentWeek - 1);
        setSearchParams({ week: newWeek.toString(), year: currentYear });
        setCurrentWeek(newWeek);
    };

    const handleNextWeek = () => {
        const newWeek = Math.min(4, currentWeek + 1);
        setSearchParams({ week: newWeek.toString(), year: currentYear });
        setCurrentWeek(newWeek);
    };

    return (
        <div className="defis-container">
            <div className="header-title">
                <h1>Défis</h1>
                <img src="/header_icon_defis.svg" alt="Icone défis" style={{height: 86}}/>
            </div>

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

            <div className="decorative-line">
                <div className="center-decor"></div>
            </div>

            <div className="panel-tabs">
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
                <span
                    className={`tab ${activeTab === 'defi_semaine' ? 'active' : ''}`}
                    onClick={() => setActiveTab('defi_semaine')}
                >
                    Défis de la semaine
                </span>
            </div>

            <div className="defis-content">
                {activeTab === 'defi_semaine' && (
                    <div className="info-box">
                        Relevez ces défis hebdomadaires uniques qui changent à chaque semaine !
                    </div>
                )}
                {defis.length === 0 ? (
                    <div className="no-defis">Aucun défi disponible pour le moment</div>
                ) : (
                    defis.map((defi) => (
                        <div key={defi.id} className="defi-item">
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <h2>{defi.nom}</h2>
                                <p>{defi.description}</p>
                            </div>
                            <div className="points">
                                {defi.points_type === 'fixed' ? (
                                    <img
                                        src={'./defi_fixed.svg'}
                                        style={{height: 46}}
                                        alt="Icone des points"
                                        className="points-icon"
                                    />
                                ) : (
                                    <img
                                        src={'./defi_flex.svg'}
                                        style={{height: 52}}
                                        alt="Icone des points"
                                        className="points-icon"
                                    />
                                )}
                                <span
                                    className="points-value"
                                    style={{
                                        position: 'absolute',
                                        marginLeft: defi.points_type === 'fixed' ? 13 : 23,
                                        fontSize: '1.6em'
                                    }}
                                >
                                    {defi.points}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {activeTab === 'arene' && (
                <p className="info-note">
                    <img src="defi_fixed.svg" alt="icon" style={{height: 24}}/> = Point(s) pour la semaine en cours uniquement
                </p>
            )}
            {activeTab === 'quete' && (
                <p className="info-note">
                    <img src="defi_flex.svg" alt="icon" style={{height: 24}}/> = Point(s) à mettre sur la semaine de votre choix !
                </p>
            )}
            {activeTab === 'defi_semaine' && (
                <p className="info-note">
                    <img src="defi_fixed.svg" alt="icon" style={{height: 24}}/> = Point(s) pour la semaine en cours uniquement
                </p>
            )}
        </div>
    );
};

export default Defis;
