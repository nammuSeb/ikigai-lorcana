import React, { useState, useEffect } from 'react';

const Description: React.FC = () => {
    const [description, setDescription] = useState('');

    useEffect(() => {
        // Récupérer la description depuis le backend
        fetch('http://localhost:3000/api/parametres/message')
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
