import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={footerStyle}>
            <span>
                Inkigai - Ligue Lorcana de{' '}
                <a href="https://ikigai-manga.shop/" style={linkStyle}>
                    Ikigai Manga Shop
                </a>
                , développé par{' '}
                <a href="https://3emelieu.ch" style={linkStyle}>
                    3èmelieu SA
                </a>
            </span>
        </footer>
    );
};

const footerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '12px',
    textAlign: 'center',
};

const linkStyle: React.CSSProperties = {
    color: 'rgba(255, 255, 255, 0.9)', // Couleur des liens
    textDecoration: 'underline', // Soulignement
};

export default Footer;
