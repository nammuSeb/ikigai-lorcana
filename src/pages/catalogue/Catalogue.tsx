import React, {useEffect, useState} from 'react';
import './Catalogue.css';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
        stockFirst: boolean;
    };
    setFilters: (filters: any) => void;
    series: string[];
    className?: string;
}

const FilterControls: React.FC<FilterProps> = ({filters, setFilters, series, className = ''}) => (
    <div className={`filter-controls ${className}`}>
        <div className="filter-group">
            <label htmlFor="numero">Nom ou numéro</label>
            <input
                id="numero"
                type="text"
                placeholder="Rechercher une carte..."
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
            <label htmlFor="foil">Foil</label>
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
                <option value="price-asc">Prix ↑</option>
                <option value="price-desc">Prix ↓</option>
            </select>
        </div>

        <div className="filter-group checkbox-group">
            <label>
                <input
                    type="checkbox"
                    checked={filters.stockFirst}
                    onChange={(e) => setFilters({...filters, stockFirst: e.target.checked})}
                />
                <span>Disponibles en premier</span>
            </label>
        </div>
    </div>
);

const Catalogue: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [filteredCards, setFilteredCards] = useState<Card[]>([]);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [filters, setFilters] = useState({
        numero: '',
        serie: '',
        langue: '',
        foil: '',
        sortOrder: 'asc',
        stockFirst: true
    });

    useEffect(() => {
        setIsLoading(true);
        fetch(`${API_BASE_URL}/api/catalogue`)
            .then((response) => response.json())
            .then((data) => {
                setCards(data);
                setFilteredCards(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération du catalogue:', error);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        applyFilters();
    }, [cards, filters]);

    const applyFilters = () => {
        let result = cards.filter(card =>
            (filters.numero === '' ||
                card.numero.toLowerCase().includes(filters.numero.toLowerCase()) ||
                card.nom.toLowerCase().includes(filters.numero.toLowerCase())) &&
            (filters.serie === '' || card.serie === filters.serie) &&
            (filters.langue === '' || card.langue === filters.langue) &&
            (filters.foil === '' || (filters.foil === 'true' ? card.foil > 0 : card.foil === 0))
        );

        // Tri des cartes
        result.sort((a, b) => {
            // Si l'option "stock d'abord" est activée, trier les cartes vendues en dernier
            if (filters.stockFirst) {
                if (a.stock === 0 && b.stock > 0) return 1;
                if (a.stock > 0 && b.stock === 0) return -1;
            }

            // Tri basé sur le critère sélectionné
            switch (filters.sortOrder) {
                case 'desc':
                    return b.nom.localeCompare(a.nom);
                case 'price-asc':
                    return a.prix - b.prix;
                case 'price-desc':
                    return b.prix - a.prix;
                case 'asc':
                default:
                    return a.nom.localeCompare(b.nom);
            }
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
                <img src="/header_icon_catalogue.svg" alt="Icone catalogue" style={{height: 42}}/>
            </div>

            <div className="decorative-line">
                <div className="center-decor"></div>
            </div>

            <div className="catalogue-controls">
                <p className="catalogue-description">
                    Voici le catalogue des prix que vous pouvez échanger contre vos Flouzeborn.
                </p>

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

            {isLoading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Chargement du catalogue...</p>
                </div>
            ) : (
                <>
                    <div className="catalogue-stats">
                        <span>{filteredCards.length} cartes</span>
                        <span>
                            {filteredCards.filter(card => card.stock > 0).length} disponibles
                        </span>
                    </div>

                    <div className="catalogue-grid">
                        {filteredCards.map((card) => (
                            <div
                                key={card.id}
                                className={`catalogue-card ${card.stock < 1 ? 'sold-out' : ''}`}
                                onClick={() => setSelectedCard(card)}
                            >
                                {card.stock > 0 && <div className="stock">{card.stock}</div>}

                                <img
                                    src={formatCardImageUrl(card)}
                                    alt={card.nom}
                                    className="card-image"
                                    loading="lazy"
                                />

                                <div className="card-info">
                                    <div className="card-header">
                                        <h5 className="card-name">{card.nom}</h5>
                                        {card.sous_titre && (
                                            <span className="card-subtitle">{card.sous_titre}</span>
                                        )}
                                    </div>

                                    <div className="card-series">
                                        {card.serie} - {card.numero}
                                    </div>

                                    <div className="card-details">
                                        <div className="card-details-left">
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
                                        </div>
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
                </>
            )}

            {filteredCards.length === 0 && !isLoading && (
                <div className="no-results">
                    <p>Aucune carte ne correspond à vos critères de recherche.</p>
                    <button
                        onClick={() => setFilters({
                            numero: '',
                            serie: '',
                            langue: '',
                            foil: '',
                            sortOrder: 'asc',
                            stockFirst: true
                        })}
                        className="toggle-filters-btn"
                    >
                        Réinitialiser les filtres
                    </button>
                </div>
            )}

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
