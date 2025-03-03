import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Menu.css';

const Menu: React.FC = () => {
    const location = useLocation(); // Hook pour obtenir le chemin actuel

    return (
        <footer className="menu">
            <div className={`menu-item ${location.pathname === '/' ? 'footer-item-focus' : ''}`}>
                <Link to="/">
                    <img src="/menu_icon_classement.svg" alt="bouton classement"/>
                </Link>
            </div>
            <div className={`menu-item ${location.pathname === '/defis' ? 'footer-item-focus' : ''}`}>
                <Link to="/defis">
                    <img src="/menu_icon_defis.svg" alt="bouton défis"/>
                </Link>
            </div>
            <div className={`menu-item ${location.pathname === '/catalogue' ? 'footer-item-focus' : ''}`}>
                <Link to="/catalogue">
                    <img src="/menu_icon_catalogue.svg" alt="bouton catalogue"/>
                </Link>
            </div>
            <div className={`menu-item ${location.pathname === '/tournois' ? 'footer-item-focus' : ''}`}>
                <Link to="/tournois">
                    <img src="/menu_icon_tournois.svg" alt="bouton tournois"/>
                </Link>
            </div>
            {/*
            <div className={`menu-item ${location.pathname === '/reglement' ? 'footer-item-focus' : ''}`}>
                <Link to="/reglement">
                    <img src="/menu_icon_reglement.svg" alt="bouton tournois"/>
                </Link>
            </div>
            */}
            <div className={`menu-item ${location.pathname === '/lore' ? 'footer-item-focus' : ''}`}>
                <Link to="/lore">
                    <img src="/menu_icon_compteur.svg" alt="bouton compteur" />
                </Link>
            </div>

        </footer>
    );
};

export default Menu;
