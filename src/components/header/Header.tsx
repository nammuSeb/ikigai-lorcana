import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <>
            <header className="header">
                <a href="https://ikigai-manga.shop" title="Site Ikigai Manga Shop"><img src="/Inkigai_Main_logo.png"
                                                                                        alt="Ikigai Manga Shop"
                                                                                        className="logo"/></a>
            </header>
            <div style={{position: 'absolute', zIndex: 9999, right: 10, color: 'rgba(255,255,255,0.5)', fontSize: '0.8em'}}>
                <Link to="/reglement">
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <span><img src="/menu_icon_reglement.svg" alt="Icone défis" style={{height: 16, marginTop: 8, marginRight: 4}}/></span><span style={{color: '#f5e9cd'}}> Reglement</span>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default Header;
