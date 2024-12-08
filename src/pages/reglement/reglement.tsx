import React, {useEffect, useState} from 'react';
import Header from "../../components/header/Header";
import './reglement.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ReglementSection {
    id: number;
    section: string;
    content: string;
    order_number: number;
}

const Reglement: React.FC = () => {
    const [sections, setSections] = useState<ReglementSection[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/reglement`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                return response.json();
            })
            .then((data) => setSections(data))
            .catch((err) => setError(err.message));
    }, []);

    if (error) return <div>Erreur : {error}</div>;

    return (
        <div className="reglement-container">
            <div className="header-title">
                <h1>Règlement</h1>
                <img src="./rules_icon.svg" alt="Icone tournois" style={{width: 72, marginRight: 4, marginTop: 6, marginBottom: 6}}/>
            </div>
            <div className="decorative-line">
                <div className="center-decor"></div>
            </div>
            <div className="content">
                {sections.map((section) => (
                    <section key={section.id}>
                    <h2>{section.section}</h2>
                        <p>{section.content}</p>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default Reglement;
