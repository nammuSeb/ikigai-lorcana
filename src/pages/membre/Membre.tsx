import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Membre.css';

interface MembreData {
    pseudo: string;
    rang: string;
    argent: number;
    points: number;
    set_ligue: number;
    avatar_url: string;
    progress_set?: number;
    defis?: { nom: string; complete: boolean }[];
}

const Membre: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [membre, setMembre] = useState<MembreData | null>(null);

    useEffect(() => {
        console.log(slug);
        fetch(`http://localhost:3000/api/joueurs/slug/${slug}`)
            .then((response) => response.json())
            .then((data) => setMembre({
                ...data,
                progress_semaine: data.progress_semaine ?? 0, // Valeur par défaut
                progress_set: data.progress_set ?? 0,         // Valeur par défaut
                defis: data.defis ?? []                        // Tableau vide par défaut
            }))
            .catch((error) => console.error("Erreur lors du chargement des données de l'utilisateur :", error));
    }, [slug]);

    if (!membre) {
        return <p>Chargement des données du membre...</p>;
    }

    return (
        <div className="membre-container">
            <header className="membre-header">
                <h2>{membre.pseudo}</h2>
                <p className="membre-rang">{membre.rang}</p>
                <div className="membre-argent">{membre.argent} ƒ</div>
            </header>
            <section className="progress-section">
                <h3>Semaine {membre.semaine}</h3>
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${membre.progress_semaine}%` }}></div>
                    <span className="progress-text">{membre.progress_semaine}%</span>
                </div>
                <p className="periode-text">Période 1 sur 3 (40 pts)</p>
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${membre.progress_set}%` }}></div>
                    <span className="progress-text">{membre.progress_set}%</span>
                </div>
                <p className="total-ligue-text">Total Ligue Set {membre.set_ligue}</p>
            </section>
            <section className="defis-section">
                <h3>Défis de la semaine</h3>
                {membre.defis.map((defi, index) => (
                    <div key={index} className={`defi-item ${defi.complete ? 'completed' : ''}`}>
                        <span>{defi.nom}</span>
                        {defi.complete && <div className="defi-completed-icon">✓</div>}
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Membre;
