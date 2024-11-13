import React, {useEffect, useState} from 'react';
import './Defis.css';

interface Defi {
    id: number;
    nom: string;
    description: string;
    points: number;
    points_type: string; // Ajout de points_type pour sélectionner l'icône
}

const Defis: React.FC = () => {
    const [defis, setDefis] = useState<Defi[]>([]);
    const [activeTab, setActiveTab] = useState<string>('arene'); // Onglet actif

    useEffect(() => {
        fetch(`http://localhost:3000/api/defis/${activeTab}`)
            .then((response) => response.json())
            .then((data) => setDefis(data))
            .catch((error) => console.error('Erreur lors de la récupération des défis:', error));
    }, [activeTab]);


    return (
        <div className="defis-container">
            <div className="header-title">
                <h1>Défis</h1>
                <img src="./header_icon_tournois.svg" alt="Icone tournois" style={{width: 86}}/>
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
                        Ces défis sont à terminer une fois par semaine et ils changent chaque semaine !
                    </div>
                )}
                {defis.map((defi) => (
                    <div key={defi.id} className="defi-item">
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <h2>{defi.nom}</h2>
                            <p>{defi.description}</p>
                        </div>
                        <div className="points">
                            {defi.points_type === 'fixed' ?
                                <img
                                    src={'./defi_fixed.svg'}
                                    style={{height: 46}}
                                    alt="Icone des points"
                                    className="points-icon"
                                />
                                :
                                <img
                                    src={'./defi_flex.svg'}
                                    style={{height: 52}}
                                    alt="Icone des points"
                                    className="points-icon"
                                />
                            }
                            {defi.points_type === 'fixed' ?
                                <span className="points-value"
                                      style={{
                                          position: 'absolute',
                                          marginLeft: 13,
                                          fontSize: '1.6em'
                                      }}>{defi.points}</span>
                                :
                                <span className="points-value"
                                      style={{
                                          position: 'absolute',
                                          marginLeft: 23,
                                          fontSize: '1.6em'
                                      }}>{defi.points}</span>
                            }
                        </div>
                    </div>
                ))}
            </div>
            <p className="info-note">= Point(s) pour la semaine en cours uniquement</p>
        </div>
    );
};

export default Defis;