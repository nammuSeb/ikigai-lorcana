import React, {useEffect, useState} from 'react';
import './Catalogue.css';

interface Card {
    id: number;
    nom: string;
    sous_titre?: string;
    image_url: string;
    prix: number;
    foil: number;
    stock: number;
    serie: string;
    numero: string;
    langue: string;
}

interface FilterProps {
    filters: {
        numero: string;
        serie: string;
        langue: string;
        foil: string;
        sortOrder: string;
    };
    setFilters: (filters: any) => void;
    series: string[];
    className?: string;
}

const FilterControls: React.FC<FilterProps> = ({filters, setFilters, series, className = ''}) => (
    <div className={`filter-controls ${className}`}>
        <div className="filter-group">
            <label htmlFor="numero">Numéro de carte</label>
            <input
                id="numero"
                type="text"
                placeholder="Rechercher un numéro..."
                value={filters.numero}
                onChange={(e) => setFilters({...filters, numero: e.target.value})}
            />
        </div>

        <div className="filter-group">
            <label htmlFor="serie">Série</label>
            <select
                id="serie"
                value={filters.serie}
                onChange={(e) => setFilters({...filters, serie: e.target.value})}
            >
                <option value="">Toutes les séries</option>
                {series.map(serie => (
                    <option key={serie} value={serie}>{serie}</option>
                ))}
            </select>
        </div>

        <div className="filter-group">
            <label htmlFor="langue">Langue</label>
            <select
                id="langue"
                value={filters.langue}
                onChange={(e) => setFilters({...filters, langue: e.target.value})}
            >
                <option value="">Toutes les langues</option>
                <option value="FR">Français</option>
                <option value="EN">Anglais</option>
            </select>
        </div>

        <div className="filter-group">
            <label htmlFor="foil">Type</label>
            <select
                id="foil"
                value={filters.foil}
                onChange={(e) => setFilters({...filters, foil: e.target.value})}
            >
                <option value="">Tous les types</option>
                <option value="true">Foil</option>
                <option value="false">Non-foil</option>
            </select>
        </div>

        <div className="filter-group">
            <label htmlFor="sortOrder">Tri</label>
            <select
                id="sortOrder"
                value={filters.sortOrder}
                onChange={(e) => setFilters({...filters, sortOrder: e.target.value})}
            >
                <option value="asc">A → Z</option>
                <option value="desc">Z → A</option>
            </select>
        </div>
    </div>
);

const Catalogue: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [filteredCards, setFilteredCards] = useState<Card[]>([]);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [filters, setFilters] = useState({
        numero: '',
        serie: '',
        langue: '',
        foil: '',
        sortOrder: 'asc'
    });

    useEffect(() => {
        fetch('http://localhost:3000/api/catalogue')
            .then((response) => response.json())
            .then((data) => {
                setCards(data);
                setFilteredCards(data);
            })
            .catch((error) => console.error('Erreur lors de la récupération du catalogue:', error));
    }, []);

    useEffect(() => {
        applyFilters();
    }, [cards, filters]);

    const applyFilters = () => {
        let result = cards.filter(card =>
            (filters.numero === '' || card.numero.includes(filters.numero)) &&
            (filters.serie === '' || card.serie === filters.serie) &&
            (filters.langue === '' || card.langue === filters.langue) &&
            (filters.foil === '' || (filters.foil === 'true' ? card.foil > 0 : card.foil === 0))
        );

        result.sort((a, b) => {
            return filters.sortOrder === 'asc'
                ? a.nom.localeCompare(b.nom)
                : b.nom.localeCompare(a.nom);
        });

        setFilteredCards(result);
    };

    const formatPrice = (price: number): string => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    };

    const formatCardImageUrl = (card: Card): string => {
        const language = card.langue.toLowerCase();
        const formattedSerie = card.serie.replace('S', '').padStart(3, '0');
        const [cardNumber] = card.numero.split('/').map(num => parseInt(num, 10));
        const formattedCardNumber = cardNumber.toString().padStart(3, '0');
        return `https://cdn.dreamborn.ink/images/${language}/cards/${formattedSerie}-${formattedCardNumber}`;
    };

    return (
        <div className="catalogue-container">
            <div className="header-title">
                <h1>Catalogue</h1>
                <img src="/header_icon_catalogue.svg" alt="Icone catalogue" style={{height: 86}}/>
            </div>

            <div className="decorative-line">
                <div className="center-decor"></div>
            </div>

            <p className="catalogue-description">
                Voici le catalogue des prix que vous pouvez échanger contre vos Flouzeborn.
            </p>

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="toggle-filters-btn"
                >
                    {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
                </button>
            </div>

            <FilterControls
                filters={filters}
                setFilters={setFilters}
                series={Array.from(new Set(cards.map(card => card.serie)))}
                className={showFilters ? 'show' : ''}
            />

            <div className="catalogue-grid">
                {filteredCards.map((card) => (
                    <div
                        key={card.id}
                        className={`catalogue-card ${card.stock < 1 ? 'sold-out' : ''}`}
                        onClick={() => setSelectedCard(card)}
                    >
                        <div className="card-info">
                            <div className="card-header">
                                <h5 className="card-name">{card.nom}</h5>
                                {card.sous_titre && (
                                    <span className="card-subtitle">{card.sous_titre}</span>
                                )}
                            </div>
                        </div>

                        {card.stock > 0 && <div className="stock">{card.stock}</div>}

                        <img
                            src={formatCardImageUrl(card)}
                            alt={card.nom}
                            className="card-image"
                            loading="lazy"
                        />

                        <div className="card-info">
                            <div className="card-series">
                                {card.serie} - {card.numero}
                            </div>
                            <div className="card-details">
                                <span className="card-language">
                                    <img
                                        src={`./language_${card.langue}.png`}
                                        alt={`Icone ${card.langue}`}
                                        style={{width: 26}}
                                    />
                                </span>
                                {card.foil > 0 && (
                                    <span>
                                        <img src="./foil.svg" alt="foil" style={{width: 24}}/>
                                    </span>
                                )}
                                <span className="card-price">
                                    <span>{formatPrice(card.prix)}</span>
                                    &nbsp;
                                    <img
                                        src="./header_icon_flouze.svg"
                                        alt="Icone flouze"
                                        style={{height: 32}}
                                    />
                                </span>
                            </div>
                        </div>
                        {card.stock < 1 && <div className="sold-overlay">Vendue !</div>}
                    </div>
                ))}
            </div>

            {selectedCard && (
                <div className="modal-overlay" onClick={() => setSelectedCard(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={() => setSelectedCard(null)}>
                            ×
                        </button>
                        <img
                            src={formatCardImageUrl(selectedCard)}
                            alt={selectedCard.nom}
                            className="modal-image"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Catalogue;
