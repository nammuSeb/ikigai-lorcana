import React, { useState, useEffect } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Description: React.FC = () => {
    const [description, setDescription] = useState('');

    useEffect(() => {
        // Récupérer la description depuis le backend
        fetch(`${API_BASE_URL}/api/parametres/message`)
            .then((res) => res.json())
            .then((data) => setDescription(data.message))
            .catch((error) => console.error('Erreur lors de la récupération de la description :', error));
    }, []);

    return (
        <div className="description">
            <p style={{fontSize: '1.2em', padding: 14}}>{description}</p>
        </div>
    );
};

export default Description;
