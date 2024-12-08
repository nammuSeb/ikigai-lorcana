-- phpMyAdmin SQL Dump
-- version 5.2.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : sam. 16 nov. 2024 à 13:56
-- Version du serveur : 8.0.35
-- Version de PHP : 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `lorcana_league`
--

-- --------------------------------------------------------

--
-- Structure de la table `catalogue`
--

CREATE TABLE `catalogue` (
  `id` int NOT NULL,
  `nom` varchar(100) NOT NULL,
  `serie` varchar(50) DEFAULT NULL,
  `numero` varchar(50) DEFAULT NULL,
  `langue` enum('FR','EN') NOT NULL,
  `prix` int DEFAULT NULL,
  `foil` tinyint(1) DEFAULT '0',
  `image_url` varchar(255) DEFAULT NULL,
  `stock` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `catalogue`
--

INSERT INTO `catalogue` (`id`, `nom`, `serie`, `numero`, `langue`, `prix`, `foil`, `image_url`, `stock`) VALUES
(1, 'Bucky (Pre-Errata)', 'S2', '73/204', 'EN', 20000, 1, 'https://cdn.dreamborn.ink/images/en/cards/002-073', 1),
(16, 'Mirabel Madrigal', 'S5', '14/204', 'EN', 500, 0, 'https://cdn.dreamborn.ink/images/en/cards/005-014', 1),
(20, 'Stitch', 'S1', '23/204', 'FR', 750, 0, 'https://cdn.dreamborn.ink/images/en/cards/001-023', 1),
(19, 'Cinderella', 'S2', '177/204', 'EN', 500, 0, 'https://cdn.dreamborn.ink/images/en/cards/002-177', 1),
(18, 'Cogsworth', 'S2', '142/204', 'EN', 500, 0, 'https://cdn.dreamborn.ink/images/en/cards/002-142', 2),
(17, 'Porcinet', 'S4', '191/204', 'FR', 500, 0, 'https://cdn.dreamborn.ink/images/en/cards/004-191', 1),
(21, 'Grab Your Sword', 'S1', '198/204', 'EN', 750, 0, 'https://cdn.dreamborn.ink/images/en/cards/001-198', 1),
(22, 'Cinderella', 'S4', '4/204', 'EN', 750, 1, 'https://cdn.dreamborn.ink/images/en/cards/004-004', 1),
(23, 'Mickey Mouse', 'S3', '182/204', 'EN', 750, 0, 'https://cdn.dreamborn.ink/images/en/cards/003-182', 1),
(24, 'Daisy Duck', 'S5', '16/204', 'EN', 1250, 0, 'https://cdn.dreamborn.ink/images/en/cards/005-016', 1),
(25, 'Robin Hood', 'S5', '118/204', 'EN', 1250, 0, 'https://cdn.dreamborn.ink/images/en/cards/005-118', 1),
(26, 'Perdita', 'S3', '15/204', 'EN', 1250, 0, 'https://cdn.dreamborn.ink/images/en/cards/003-015', 1),
(27, 'Yen Sid', 'S4', '59/204', 'EN', 1250, 0, 'https://cdn.dreamborn.ink/images/en/cards/004-059', 1),
(28, 'Madam Mim', 'S2', '46/204', 'EN', 2500, 0, 'https://cdn.dreamborn.ink/images/en/cards/002-046', 1),
(29, 'Flynn Rider', 'S4', '106/204', 'EN', 2500, 1, 'https://cdn.dreamborn.ink/images/en/cards/004-106', 1),
(30, 'Merlin', 'S5', '159/204', 'EN', 2500, 0, 'https://cdn.dreamborn.ink/images/en/cards/005-159', 1),
(31, 'A Whole New World', 'S1', '195/204', 'EN', 2500, 0, 'https://cdn.dreamborn.ink/images/en/cards/001-195', 1),
(32, 'Mufasa', 'S2', '14/204', 'EN', 5000, 0, 'https://cdn.dreamborn.ink/images/en/cards/002-014', 1),
(33, 'Prince Naveen', 'S5', '3/204', 'EN', 5000, 0, 'https://cdn.dreamborn.ink/images/en/cards/005-003', 1),
(34, 'Merlin', 'S5', '159/204', 'FR', 5000, 1, 'https://cdn.dreamborn.ink/images/en/cards/005-159', 1),
(35, 'The Queen\'s Castle', 'S3', '67/204', 'EN', 5000, 1, 'https://cdn.dreamborn.ink/images/en/cards/003-067', 1),
(36, 'Jim Hawkins', 'S3', '109/204', 'EN', 7500, 0, 'https://cdn.dreamborn.ink/images/en/cards/003-109', 1),
(37, 'Ursula', 'S4', '58/204', 'EN', 7500, 0, 'https://cdn.dreamborn.ink/images/en/cards/004-058', 1),
(38, 'Diablo', 'S4', '70/204', 'EN', 7500, 0, 'https://cdn.dreamborn.ink/images/en/cards/004-070', 1),
(39, 'Clarabelle', 'S5', '84/204', 'EN', 7500, 0, 'https://cdn.dreamborn.ink/images/en/cards/005-084', 1),
(40, 'Treasure Mountain', 'S6', '222/204', 'EN', 20000, 1, 'https://cdn.dreamborn.ink/images/en/cards/006-222', 2),
(41, 'Porcinet', 'S4', '221/204', 'FR', 20000, 1, 'https://cdn.dreamborn.ink/images/en/cards/004-221', 1),
(42, 'Palais de Kuzco', 'S3', '213/204', 'FR', 20000, 1, 'https://cdn.dreamborn.ink/images/en/cards/003-213', 1);

-- --------------------------------------------------------

--
-- Structure de la table `classements`
--

CREATE TABLE `classements` (
  `id` int NOT NULL,
  `joueur_id` int NOT NULL,
  `points` int DEFAULT '0',
  `start_date` date NOT NULL,
  `end_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `classements`
--

INSERT INTO `classements` (`id`, `joueur_id`, `points`, `start_date`, `end_date`) VALUES
(1, 19, 3, '2024-11-16', '2024-11-22'),
(31, 20, 3, '2024-11-16', '2024-11-22'),
(32, 18, 3, '2024-11-16', '2024-11-22'),
(33, 12, 3, '2024-11-16', '2024-11-22'),
(34, 15, 3, '2024-11-16', '2024-11-22'),
(35, 16, 3, '2024-11-16', '2024-11-22'),
(36, 21, 3, '2024-11-16', '2024-11-22'),
(38, 23, 3, '2024-11-16', '2024-11-22'),
(39, 24, 3, '2024-11-16', '2024-11-22'),
(40, 17, 3, '2024-11-16', '2024-11-22'),
(42, 26, 3, '2024-11-16', '2024-11-22'),
(43, 25, 3, '2024-11-16', '2024-11-22');

-- --------------------------------------------------------

--
-- Structure de la table `defis`
--

CREATE TABLE `defis` (
  `id` int NOT NULL,
  `nom` varchar(100) NOT NULL,
  `description` text,
  `points` int DEFAULT '0',
  `type` enum('arene','quete','defi_semaine') NOT NULL,
  `max_points` int DEFAULT NULL,
  `points_type` varchar(16) NOT NULL DEFAULT '1',
  `date_debut` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `defis`
--

INSERT INTO `defis` (`id`, `nom`, `description`, `points`, `type`, `max_points`, `points_type`, `date_debut`, `date_fin`) VALUES
(1, 'Gagner une partie en 3 manches (BO3)', '1x par adversaire & par jour (hors tournoi)', 2, 'arene', 2, 'fixed', '2024-11-16', NULL),
(2, 'Perdre une partie en 3 manches (BO3)', '1x par adversaire & par jour (hors tournoi)', 1, 'arene', 1, 'fixed', '2024-11-16', NULL),
(3, 'Gagner une partie en 2 manches (BO2)', '1x par adversaire & par jour (hors tournoi)', 2, 'arene', 2, 'fixed', '2024-11-16', NULL),
(4, 'Ex-Aequo partie en 2 manches (BO2)', '1x par adversaire & par jour (hors tournoi)', 1, 'arene', 1, 'fixed', '2024-11-16', NULL),
(5, 'Gagner une partie en 1 manche (BO1)', '1x par adversaire & par jour (hors tournoi)', 2, 'arene', 2, 'fixed', '2024-11-16', NULL),
(6, 'Faire découvrir le shop à un nouveau client', 'illimité', 2, 'quete', 2, 'flex', '2024-11-16', NULL),
(7, 'Initier un nouveau joueur à Lorcana', 'illimité', 2, 'quete', 2, 'flex', '2024-11-16', NULL),
(8, 'Participer à un tournoi à Ikigai Manga Shop', '1x par tournoi', 3, 'quete', 3, 'flex', '2024-11-16', NULL),
(9, 'Sortir une carte enchantée d\'un booster', 'acheté à Ikigai Manga Shop', 2, 'quete', 2, 'flex', '2024-11-16', NULL),
(10, 'Porter un accessoire ou un vêtement Disney', '', 1, 'defi_semaine', 1, 'fixed', '2024-11-16', '2024-11-22'),
(11, 'Gagner avec un deck Monochrome', '', 2, 'defi_semaine', 2, 'fixed', '2024-11-16', '2024-11-22'),
(12, 'Gagner une manche avec moins de 3 personnages dans la défausse.', '', 1, 'defi_semaine', 1, 'fixed', '2024-11-16', '2024-11-22'),
(13, 'Gagner une manche avec moins de 4 encres sur le terrain', '', 1, 'defi_semaine', 1, 'fixed', '2024-11-16', '2024-11-22');

-- --------------------------------------------------------

--
-- Structure de la table `defis_valides`
--

CREATE TABLE `defis_valides` (
  `id` int NOT NULL,
  `defi_id` int NOT NULL,
  `joueur_id` int NOT NULL,
  `date_validation` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `defis_valides`
--

INSERT INTO `defis_valides` (`id`, `defi_id`, `joueur_id`, `date_validation`) VALUES
(1, 1, 1, '2024-11-01 14:00:00'),
(13, 5, 2, '2024-11-01 14:00:00'),
(14, 10, 1, '2024-11-01 14:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `joueurs`
--

CREATE TABLE `joueurs` (
  `id` int NOT NULL,
  `pseudo` varchar(50) NOT NULL,
  `argent` int DEFAULT '0',
  `avatar_url` varchar(255) DEFAULT NULL,
  `nickname` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `joueurs`
--

INSERT INTO `joueurs` (`id`, `pseudo`, `argent`, `avatar_url`, `nickname`) VALUES
(1, 'Dam', 0, 'https://example.com/avatar1.png', 'Damatoa le scintillant'),
(2, 'Greg', 0, 'https://example.com/avatar2.png', 'Malveillance max'),
(12, 'Fernandeck', 0, 'https://example.com/avatar2.png', 'Le schizo des decks'),
(13, 'Quentin', 0, 'https://example.com/avatar2.png', 'Malfuuuuuuuuuuu'),
(14, 'Merrick', 0, 'https://example.com/avatar2.png', ''),
(15, 'Julien', 0, 'https://example.com/avatar1.png', 'l\'enchanteur'),
(16, 'Krys', 0, 'https://example.com/avatar1.png', 'Va renverser la Meta...un jour'),
(17, 'Phil', 0, 'https://example.com/avatar1.png', ''),
(18, 'Dinis', 0, 'https://example.com/avatar1.png', 'le Lausannois'),
(19, 'Andrew', 0, 'https://example.com/avatar1.png', 'Le lasersitter'),
(20, 'Aurélien', 0, 'https://example.com/avatar1.png', ''),
(21, 'Lory', 0, 'https://example.com/avatar1.png', 'La reine du Choupiland'),
(22, 'Aurélie', 0, 'https://example.com/avatar1.png', 'Elle shift Diablo sur l\'air'),
(23, 'Morgane', 0, 'https://example.com/avatar1.png', ''),
(24, 'Nat & Vincent', 0, 'https://example.com/avatar1.png', ''),
(25, 'Nico', 0, 'https://example.com/avatar1.png', 'Sparrow'),
(26, 'Gilles', 0, 'https://example.com/avatar1.png', 'Le jongleur d\'encres');

-- --------------------------------------------------------

--
-- Structure de la table `parametres`
--

CREATE TABLE `parametres` (
  `id` int NOT NULL,
  `message` text,
  `fond_ecran_url` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `quetes`
--

CREATE TABLE `quetes` (
  `id` int NOT NULL,
  `nom` varchar(100) NOT NULL,
  `description` text,
  `limite` int DEFAULT NULL,
  `points` int DEFAULT '0',
  `joueur_id` int DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `tournois`
--

CREATE TABLE `tournois` (
  `id` int NOT NULL,
  `nom` varchar(100) NOT NULL,
  `type` enum('fun','construit') NOT NULL,
  `date` date NOT NULL,
  `heure` time DEFAULT NULL,
  `prix` int DEFAULT NULL,
  `participants_max` int DEFAULT NULL,
  `description` text,
  `location` varchar(100) DEFAULT NULL,
  `lien` varchar(255) DEFAULT NULL,
  `statut` enum('a_venir','passe','annule') DEFAULT 'a_venir',
  `gagnant_id` int DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `tournois`
--

INSERT INTO `tournois` (`id`, `nom`, `type`, `date`, `heure`, `prix`, `participants_max`, `description`, `location`, `lien`, `statut`, `gagnant_id`) VALUES
(7, 'Into the Inklands Championship - Ikigai Manga Shop', 'construit', '2024-04-21', '13:00:00', 15, 24, 'Championship Lorcana pour tenter de gagner la carte de Stitch Rockstar enchantée !', 'Ikigai Manga Shop', 'https://melee.gg/Tournament/View/79890', 'passe', 14),
(6, 'Win a Giftbox', 'construit', '2024-02-17', '13:00:00', 7, 24, 'Tournoi construit pour fêter la fin du Set 2. Un coffret cadeau à gagner !', 'Ikigai Manga Shop', 'https://melee.gg/Tournament/View/60918', 'passe', 13),
(8, 'Draft de fin de Set 3', 'fun', '2024-05-11', '14:00:00', 24, 24, 'Draft pour fêter la fin du Set 3, construis ton deck avec 4 boosters !', 'Ikigai Manga Shop', 'https://melee.gg/Tournament/View/92233', 'passe', 1),
(9, 'Avant-Première Lorcana Saison 5', 'fun', '2024-05-11', '14:00:00', 40, 12, 'Tournoi scellé d\'avant-première pour la saison 5 de Lorcana \"Ciel Scintillant\" !', 'Ikigai Manga Shop', 'https://melee.gg/Tournament/View/135129', 'passe', 12),
(10, 'Tournoi de Ligue - box D23 à gagner !', 'fun', '2024-05-11', '14:00:00', 20, 16, 'Tournoi pour tenter de gagner une prestigieuse boîte D23 !', 'Ikigai Manga Shop', 'https://melee.gg/Tournament/View/142821', 'passe', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `catalogue`
--
ALTER TABLE `catalogue`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `classements`
--
ALTER TABLE `classements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `joueur_id` (`joueur_id`);

--
-- Index pour la table `defis`
--
ALTER TABLE `defis`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `defis_valides`
--
ALTER TABLE `defis_valides`
  ADD PRIMARY KEY (`id`),
  ADD KEY `defi_id` (`defi_id`),
  ADD KEY `joueur_id` (`joueur_id`);

--
-- Index pour la table `joueurs`
--
ALTER TABLE `joueurs`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `parametres`
--
ALTER TABLE `parametres`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `quetes`
--
ALTER TABLE `quetes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `joueur_id` (`joueur_id`);

--
-- Index pour la table `tournois`
--
ALTER TABLE `tournois`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gagnant_id` (`gagnant_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `catalogue`
--
ALTER TABLE `catalogue`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT pour la table `classements`
--
ALTER TABLE `classements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT pour la table `defis`
--
ALTER TABLE `defis`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `defis_valides`
--
ALTER TABLE `defis_valides`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `joueurs`
--
ALTER TABLE `joueurs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `parametres`
--
ALTER TABLE `parametres`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `quetes`
--
ALTER TABLE `quetes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `tournois`
--
ALTER TABLE `tournois`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `classements`
--
ALTER TABLE `classements`
  ADD CONSTRAINT `classements_ibfk_1` FOREIGN KEY (`joueur_id`) REFERENCES `joueurs` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `defis_valides`
--
ALTER TABLE `defis_valides`
  ADD CONSTRAINT `defis_valides_ibfk_1` FOREIGN KEY (`defi_id`) REFERENCES `defis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `defis_valides_ibfk_2` FOREIGN KEY (`joueur_id`) REFERENCES `joueurs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
