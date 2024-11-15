import React, { useEffect, useState } from 'react';
import './Catalogue.css';

interface Card {
    id: number;
    nom: string;
    image_url: string;
    prix: number;
    foil: number;
    stock: number;
    serie: string;
    numero: string;
    langue: string;
}

const Catalogue: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null); // State for the selected card
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to control modal visibility

    useEffect(() => {
        fetch('https://server.inkigai.ch/api/catalogue')
            .then((response) => response.json())
            .then((data) => setCards(data))
            .catch((error) => console.error('Erreur lors de la récupération du catalogue:', error));
    }, []);

    const openModal = (card: Card) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCard(null);
        setIsModalOpen(false);
    };

    return (
        <div className="catalogue-container">
            <div className="header-title">
                <h1>Catalogue</h1>
                <img src="./header_icon_catalogue.svg" alt="Icone tournois" style={{ height: 86 }} />
            </div>
            <div className="decorative-line">
                <div className="center-decor"></div>
            </div>
            <p className="catalogue-description">
                Voici le catalogue des prix que vous pouvez échanger contre vos Flouzeborn.
            </p>
            <div className="catalogue-grid">
                {cards.map((card) => (
                    <div key={card.id} className={`catalogue-card ${card.stock < 1 ? 'sold-out' : ''}`} onClick={() => openModal(card)}>
                        <div className="card-info">
                            <div className="card-header">
                                <h5 style={{ fontSize: '1.0em !important', marginBottom: '.2rem' }}>{card.nom}</h5>
                                <span className="card-series">{card.serie} - {card.numero}</span>
                            </div>
                        </div>
                        <div className="stock">{card.stock}</div>
                        <img
                            src={
                                card.image_url.startsWith("http")
                                    ? card.image_url // Use the absolute URL as-is if it starts with "http"
                                    : `https://server.inkigai.ch/uploads/${card.image_url}` // Otherwise, construct the relative path
                            }
                            alt={card.nom}
                            className="card-image"
                        />

                        <div className="card-info">
                            <div className="card-details">
                                <span className="card-language">
                                    {card.langue === 'FR' ? (
                                        <img src="./language_FR.png" alt="Icone FR" style={{ width: 42 }} />
                                    ) : (
                                        <img src="./language_EN.png" alt="Icone EN" style={{ width: 42 }} />
                                    )}
                                </span>
                                {card.foil > 0 && <span><img src="./foil.svg" alt="foil" style={{ width: 24 }} /></span>}
                                <span className="card-price">{card.prix}&nbsp;<img src="./header_icon_flouze.svg" alt="Icone flouze" style={{ height: 32 }} /></span>
                            </div>
                        </div>
                        {card.stock < 1 && (
                            <div className="sold-overlay">Vendue !</div>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal Component */}
            {isModalOpen && selectedCard && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={closeModal}>X</button>
                        <img
                            src={
                                selectedCard.image_url.startsWith("http")
                                    ? selectedCard.image_url // Use the absolute URL if it starts with "http"
                                    : `https://server.inkigai.ch/uploads/${selectedCard.image_url}` // Otherwise, use the relative path
                            }
                            alt={selectedCard.nom}
                            className="modal-image"
                        />

                        {/*
                        <div className="modal-info">
                            <h2>{selectedCard.nom}</h2>
                            <p>Série: {selectedCard.serie} - {selectedCard.numero}</p>
                            <p>Prix: {selectedCard.prix} <img src="./header_icon_flouze.svg" alt="Icone flouze" style={{ height: 20 }} /></p>
                            <p>Langue: {selectedCard.langue === 'FR' ? 'Français' : 'Anglais'}</p>
                            {selectedCard.foil > 0 && <p>Foil: Oui</p>}
                            <p>Disponibilité: {selectedCard.stock < 1 ? 'Vendue' : selectedCard.stock}</p>
                        </div>
                        */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Catalogue;
