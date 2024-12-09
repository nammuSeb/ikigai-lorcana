import React from 'react';
import './DefisJoueur.css';

interface Defi {
    id: number;
    nom: string;
    description: string;
    points: number;
    points_type: string;
    completed: boolean;
}

interface DefisJoueurProps {
    defis: Defi[];
    currentWeek: number;
}

const DefisJoueur: React.FC<DefisJoueurProps> = ({ defis, currentWeek }) => {
    return (
        <section className="defis-section">
            <h3 className="section-title">Défis de la semaine {currentWeek}</h3>
            {defis.length > 0 ? (
                defis.map((defi) => (
                    <div
                        key={defi.id}
                        className={`defi-card ${defi.completed ? 'completed' : ''}`}
                    >
                        <div className="defi-content">
                            <h4 className="defi-title">{defi.nom}</h4>
                            <p className="defi-description">{defi.description}</p>
                            <div className="defi-points">

                                <div className="points-container">
                                    {Array.from({ length: defi.points }).map((_, i) => (
                                        <div key={i} className="point-slot">
                                            {defi.completed ? (
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
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="no-defis-message">Aucun défi disponible pour cette semaine.</p>
            )}
        </section>
    );
};

export default DefisJoueur;
