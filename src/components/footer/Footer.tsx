import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
    const location = useLocation(); // Hook pour obtenir le chemin actuel

    return (
        <footer className="footer">
            <Link to="/">
                <div className={`footer-item ${location.pathname === '/' ? 'footer-item-focus' : ''}`}>
                    <img src="./menu_icon_classement.svg" alt="bouton classement"/>
                </div>
            </Link>
            <Link to="/defis">
                <div className={`footer-item ${location.pathname === '/defis' ? 'footer-item-focus' : ''}`}>
                    <img src="./menu_icon_defis.svg" alt="bouton défis"/>
                </div>
            </Link>
            <Link to="/catalogue">
                <div className={`footer-item ${location.pathname === '/catalogue' ? 'footer-item-focus' : ''}`}>
                    <img src="./menu_icon_catalogue.svg" alt="bouton catalogue"/>
                </div>
            </Link>
            <Link to="/tournois">
                <div className={`footer-item ${location.pathname === '/tournois' ? 'footer-item-focus' : ''}`}>
                    <img src="./menu_icon_tournois.svg" alt="bouton tournois"/>
                </div>
            </Link>
            {/*
            <div className={`footer-item ${location.pathname === '/compteur' ? 'footer-item-focus' : ''}`}>
                <Link to="/compteur">
                    <img src="./menu_icon_compteur.svg" alt="bouton compteur" />
                </Link>
            </div>
            */}
        </footer>
    );
};

export default Footer;
