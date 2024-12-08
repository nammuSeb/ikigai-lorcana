import React, { useEffect, useState } from 'react';

const Background: React.FC = () => {
    const [settings, setSettings] = useState({
        backgroundImageUrl: '',
        backgroundOpacity: 0.6,
        blendColor: '#242b43', // Couleur de blend par défaut
    });

    useEffect(() => {
        // Récupérer les paramètres du backend
        fetch('http://localhost:3000/api/parametres/background-settings')
            .then((res) => res.json())
            .then((data) => setSettings({
                backgroundImageUrl: data.background_image_url || '',
                backgroundOpacity: data.background_opacity || 0.6,
                blendColor: data.blend_color || '#242b43',
            }))
            .catch((error) => console.error('Erreur lors de la récupération des paramètres :', error));
    }, []);

    const backgroundContainerStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundColor: settings.blendColor, // Couleur unie en arrière-plan
    };

    const backgroundStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${settings.backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: settings.backgroundOpacity,
        mixBlendMode: 'multiply', // Ajout du blend mode
        filter: 'grayscale(50%)', // Désaturation (facultatif)
    };

    return (
        <div style={backgroundContainerStyle}>
            <div style={backgroundStyle}></div>
        </div>
    );
};

export default Background;
