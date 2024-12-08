import React from 'react';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <a href="https://ikigai-manga.shop" title="Site Ikigai Manga Shop"><img src="/Inkigai_Main_logo.png" alt="Ikigai Manga Shop" className="logo" /></a>
        </header>
    );
};

export default Header;
