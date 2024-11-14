-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 13 nov. 2024 à 20:28
-- Version du serveur : 5.7.40
-- Version de PHP : 8.0.26

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

DROP TABLE IF EXISTS `catalogue`;
CREATE TABLE IF NOT EXISTS `catalogue` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `serie` varchar(50) DEFAULT NULL,
  `numero` varchar(50) DEFAULT NULL,
  `langue` enum('FR','EN') NOT NULL,
  `prix` int(11) DEFAULT NULL,
  `foil` tinyint(1) DEFAULT '0',
  `image_url` varchar(255) DEFAULT NULL,
  `stock` int(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `catalogue`
--

INSERT INTO `catalogue` (`id`, `nom`, `serie`, `numero`, `langue`, `prix`, `foil`, `image_url`, `stock`) VALUES
(1, 'Prince Naveen', 'S5', '3/204', 'FR', 45, 1, 'https://cdn.dreamborn.ink/images/fr/cards/006-001', 10),
(2, 'Ursula', 'S5', '208/204', 'EN', 545, 0, '006-001.webp', 3),
(3, 'Robin des Bois', 'S5', '215/204', 'FR', 45, 0, '006-001.webp', 0),
(4, 'Mufasa', 'S5', '215/204', 'FR', 60, 0, '006-001.webp', 0),
(5, 'Ariel', 'S5', '110/204', 'EN', 100, 1, '006-001.webp', 0),
(6, 'Simba', 'S5', '101/204', 'FR', 80, 1, '006-001.webp', 0),
(7, 'Belle', 'S5', '105/204', 'FR', 50, 0, '006-001.webp', 0),
(8, 'Maleficent', 'S5', '200/204', 'EN', 200, 1, '006-001.webp', 0),
(9, 'Elsa', 'S5', '50/204', 'FR', 120, 0, '006-001.webp', 0),
(10, 'Aladdin', 'S5', '15/204', 'EN', 70, 0, '006-001.webp', 0),
(11, 'Hercules', 'S5', '220/204', 'FR', 90, 1, '006-001.webp', 0),
(12, 'Mulan', 'S5', '185/204', 'EN', 85, 0, '006-001.webp', 0),
(13, 'Tarzan', 'S5', '134/204', 'FR', 65, 0, '006-001.webp', 0),
(14, 'Rapunzel', 'S5', '95/204', 'EN', 75, 1, '006-001.webp', 0),
(15, 'Jasmine', 'S5', '76/204', 'FR', 55, 0, '006-001.webp', 0);

-- --------------------------------------------------------

--
-- Structure de la table `classements`
--

DROP TABLE IF EXISTS `classements`;
CREATE TABLE IF NOT EXISTS `classements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `joueur_id` int(11) NOT NULL,
  `semaine` int(11) NOT NULL,
  `date` date NOT NULL,
  `points` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `joueur_id` (`joueur_id`,`semaine`,`date`)
) ENGINE=MyISAM AUTO_INCREMENT=71 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `classements`
--

INSERT INTO `classements` (`id`, `joueur_id`, `semaine`, `date`, `points`) VALUES
(1, 1, 2, '2024-11-07', 8),
(2, 1, 2, '2024-11-08', 17),
(3, 1, 2, '2024-11-09', 17),
(4, 1, 2, '2024-11-10', 15),
(5, 1, 2, '2024-11-11', 24),
(6, 1, 2, '2024-11-12', 7),
(7, 1, 2, '2024-11-13', 22),
(8, 2, 2, '2024-11-07', 20),
(9, 2, 2, '2024-11-08', 10),
(10, 2, 2, '2024-11-09', 15),
(11, 2, 2, '2024-11-10', 14),
(12, 2, 2, '2024-11-11', 23),
(13, 2, 2, '2024-11-12', 6),
(14, 2, 2, '2024-11-13', 7),
(15, 3, 2, '2024-11-07', 13),
(16, 3, 2, '2024-11-08', 13),
(17, 3, 2, '2024-11-09', 16),
(18, 3, 2, '2024-11-10', 15),
(19, 3, 2, '2024-11-11', 11),
(20, 3, 2, '2024-11-12', 12),
(21, 3, 2, '2024-11-13', 7),
(22, 4, 2, '2024-11-07', 17),
(23, 4, 2, '2024-11-08', 6),
(24, 4, 2, '2024-11-09', 23),
(25, 4, 2, '2024-11-10', 21),
(26, 4, 1, '2024-11-11', 13),
(27, 4, 1, '2024-11-12', 20),
(28, 4, 1, '2024-11-13', 21),
(29, 5, 1, '2024-11-07', 24),
(30, 5, 1, '2024-11-08', 13),
(31, 5, 1, '2024-11-09', 18),
(32, 5, 1, '2024-11-10', 18),
(33, 5, 1, '2024-11-11', 23),
(34, 5, 1, '2024-11-12', 24),
(35, 5, 1, '2024-11-13', 24),
(36, 6, 1, '2024-11-07', 9),
(37, 6, 1, '2024-11-08', 19),
(38, 6, 1, '2024-11-09', 7),
(39, 6, 1, '2024-11-10', 23),
(40, 6, 1, '2024-11-11', 22),
(41, 6, 1, '2024-11-12', 7),
(42, 6, 1, '2024-11-13', 17),
(43, 7, 1, '2024-11-07', 14),
(44, 7, 1, '2024-11-08', 22),
(45, 7, 1, '2024-11-09', 5),
(46, 7, 1, '2024-11-10', 12),
(47, 7, 1, '2024-11-11', 10),
(48, 7, 1, '2024-11-12', 5),
(49, 7, 1, '2024-11-13', 23),
(50, 8, 1, '2024-11-07', 20),
(51, 8, 1, '2024-11-08', 18),
(52, 8, 1, '2024-11-09', 8),
(53, 8, 1, '2024-11-10', 12),
(54, 8, 1, '2024-11-11', 23),
(55, 8, 1, '2024-11-12', 20),
(56, 8, 1, '2024-11-13', 17),
(57, 9, 1, '2024-11-07', 21),
(58, 9, 1, '2024-11-08', 9),
(59, 9, 1, '2024-11-09', 14),
(60, 9, 1, '2024-11-10', 18),
(61, 9, 1, '2024-11-11', 17),
(62, 9, 1, '2024-11-12', 15),
(63, 9, 1, '2024-11-13', 24),
(64, 10, 1, '2024-11-07', 21),
(65, 10, 1, '2024-11-08', 9),
(66, 10, 1, '2024-11-09', 13),
(67, 10, 1, '2024-11-10', 24),
(68, 10, 1, '2024-11-11', 13),
(69, 10, 1, '2024-11-12', 20),
(70, 10, 1, '2024-11-13', 14);

-- --------------------------------------------------------

--
-- Structure de la table `defis`
--

DROP TABLE IF EXISTS `defis`;
CREATE TABLE IF NOT EXISTS `defis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `description` text,
  `points` int(11) DEFAULT '0',
  `type` enum('arene','quete','defi_semaine') NOT NULL,
  `max_points` int(11) DEFAULT NULL,
  `points_type` varchar(16) NOT NULL DEFAULT '1',
  `date_debut` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `defis`
--

INSERT INTO `defis` (`id`, `nom`, `description`, `points`, `type`, `max_points`, `points_type`, `date_debut`, `date_fin`) VALUES
(1, 'Gagner une partie en 3 manches (BO3)', '1x par adversaire & par jour', 2, 'defi_semaine', 2, 'fixed', '2024-11-01', '2024-11-07'),
(2, 'Perdre une partie en 3 manches (BO3)', '1x par adversaire & par jour', 1, 'arene', 1, 'flex', '2024-11-08', '2024-11-14'),
(3, 'Gagner une partie en 2 manches (BO2)', '1x par adversaire & par jour', 2, 'defi_semaine', 2, 'fixed', '2024-11-15', '2024-11-21'),
(4, 'Ex-Aequo partie en 2 manches (BO2)', '1x par adversaire & par jour', 1, 'quete', 1, 'fixed', NULL, NULL),
(5, 'Gagner une partie en 1 manche (BO1)', '1x par adversaire & par jour', 2, 'defi_semaine', 2, 'fixed', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `joueurs`
--

DROP TABLE IF EXISTS `joueurs`;
CREATE TABLE IF NOT EXISTS `joueurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(50) NOT NULL,
  `rang` varchar(100) DEFAULT NULL,
  `argent` int(11) DEFAULT '0',
  `set_ligue` int(11) DEFAULT '1',
  `progress_set` int(11) DEFAULT '0',
  `avatar_url` varchar(255) DEFAULT NULL,
  `nickname` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `joueurs`
--

INSERT INTO `joueurs` (`id`, `pseudo`, `rang`, `argent`, `set_ligue`, `progress_set`, `avatar_url`, `nickname`) VALUES
(1, 'PlayerOne', 'Bronze', 150, 1, 0, 'https://example.com/avatar1.png', 'Lorem Ipsum'),
(2, 'PlayerTwo', 'Silver', 300, 1, 0, 'https://example.com/avatar2.png', ''),
(3, 'PlayerThree', 'Gold', 500, 2, 0, 'https://example.com/avatar3.png', ''),
(4, 'PlayerFour', 'Platinum', 750, 2, 6, 'https://example.com/avatar4.png', 'Lorem Ipsum'),
(5, 'PlayerFive', 'Diamond', 1000, 3, 0, 'https://example.com/avatar5.png', 'Lorem Ipsum'),
(6, 'PlayerSix', 'Master', 1200, 3, 0, 'https://example.com/avatar6.png', ''),
(7, 'PlayerSeven', 'Grandmaster', 1500, 4, 0, 'https://example.com/avatar7.png', ''),
(8, 'PlayerEight', 'Champion', 1800, 4, 0, 'https://example.com/avatar8.png', ''),
(9, 'PlayerNine', 'Legend', 2000, 5, 0, 'https://example.com/avatar9.png', ''),
(10, 'PlayerTen', 'Mythic', 2500, 5, 0, 'https://example.com/avatar10.png', '');

-- --------------------------------------------------------

--
-- Structure de la table `parametres`
--

DROP TABLE IF EXISTS `parametres`;
CREATE TABLE IF NOT EXISTS `parametres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` text,
  `fond_ecran_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `quetes`
--

DROP TABLE IF EXISTS `quetes`;
CREATE TABLE IF NOT EXISTS `quetes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `description` text,
  `limite` int(11) DEFAULT NULL,
  `points` int(11) DEFAULT '0',
  `joueur_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `joueur_id` (`joueur_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `tournois`
--

DROP TABLE IF EXISTS `tournois`;
CREATE TABLE IF NOT EXISTS `tournois` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `type` enum('fun','construit') NOT NULL,
  `date` date NOT NULL,
  `heure` time DEFAULT NULL,
  `prix` int(11) DEFAULT NULL,
  `participants_max` int(11) DEFAULT NULL,
  `description` text,
  `location` varchar(100) DEFAULT NULL,
  `lien` varchar(255) DEFAULT NULL,
  `statut` enum('a_venir','passe','annule') DEFAULT 'a_venir',
  `gagnant_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `gagnant_id` (`gagnant_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `tournois`
--

INSERT INTO `tournois` (`id`, `nom`, `type`, `date`, `heure`, `prix`, `participants_max`, `description`, `location`, `lien`, `statut`, `gagnant_id`) VALUES
(1, 'Tournoi Madrigal', 'fun', '2024-11-16', '13:00:00', 20, 32, 'Tournoi super fun Madrigal à Palexpo, la PAF inclut 3 boosters du Set 5 en anglais', 'Palexpo', 'http://example.com/inscription1', 'a_venir', 1),
(2, 'Tournoi Madrigal', 'construit', '2024-11-23', '13:00:00', 10, 32, 'Tournoi super fun Madrigal à Palexpo, la PAF inclut 1 booster du Set 5 en français', 'Palexpo', 'http://example.com/inscription2', 'annule', NULL),
(3, 'Tournoi Rencontres Épiques', 'fun', '2024-10-20', '14:00:00', 15, 24, 'Venez participer à des rencontres épiques entre amis !', 'Centre des Congrès', 'http://example.com/inscription3', 'passe', NULL),
(4, 'Championnat de Palexpo', 'construit', '2024-12-05', '10:00:00', 50, 64, 'Le grand championnat annuel, préparez-vous à affronter les meilleurs !', 'Palexpo', 'http://example.com/inscription4', 'a_venir', NULL),
(5, 'Tournoi Relais', 'fun', '2024-11-01', '15:00:00', 5, 16, 'Tournoi de relais pour s’amuser en équipe', 'Club Local', 'http://example.com/inscription5', 'passe', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
