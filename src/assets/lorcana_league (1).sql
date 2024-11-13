-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 13 nov. 2024 à 11:13
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
  `disponibilite` enum('disponible','vendue') DEFAULT 'disponible',
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
(1, 1, 1, '2024-11-07', 8),
(2, 1, 1, '2024-11-08', 17),
(3, 1, 1, '2024-11-09', 17),
(4, 1, 1, '2024-11-10', 15),
(5, 1, 1, '2024-11-11', 24),
(6, 1, 1, '2024-11-12', 7),
(7, 1, 1, '2024-11-13', 22),
(8, 2, 1, '2024-11-07', 20),
(9, 2, 1, '2024-11-08', 10),
(10, 2, 1, '2024-11-09', 15),
(11, 2, 1, '2024-11-10', 14),
(12, 2, 1, '2024-11-11', 23),
(13, 2, 1, '2024-11-12', 6),
(14, 2, 1, '2024-11-13', 7),
(15, 3, 1, '2024-11-07', 13),
(16, 3, 1, '2024-11-08', 13),
(17, 3, 1, '2024-11-09', 16),
(18, 3, 1, '2024-11-10', 15),
(19, 3, 1, '2024-11-11', 11),
(20, 3, 1, '2024-11-12', 12),
(21, 3, 1, '2024-11-13', 7),
(22, 4, 1, '2024-11-07', 17),
(23, 4, 1, '2024-11-08', 6),
(24, 4, 1, '2024-11-09', 23),
(25, 4, 1, '2024-11-10', 21),
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
  `condition` varchar(100) DEFAULT NULL,
  `points` int(11) DEFAULT '0',
  `type` enum('arene','quete','defi_semaine') NOT NULL,
  `max_points` int(11) DEFAULT NULL,
  `joueur_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `joueur_id` (`joueur_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
  `points` int(11) DEFAULT '0',
  `set_ligue` int(11) DEFAULT '1',
  `progress_set` int(11) DEFAULT '0',
  `avatar_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `joueurs`
--

INSERT INTO `joueurs` (`id`, `pseudo`, `rang`, `argent`, `points`, `set_ligue`, `progress_set`, `avatar_url`) VALUES
(1, 'PlayerOne', 'Bronze', 150, 1000, 1, 0, 'https://example.com/avatar1.png'),
(2, 'PlayerTwo', 'Silver', 300, 1500, 1, 0, 'https://example.com/avatar2.png'),
(3, 'PlayerThree', 'Gold', 500, 2000, 2, 0, 'https://example.com/avatar3.png'),
(4, 'PlayerFour', 'Platinum', 750, 2500, 2, 0, 'https://example.com/avatar4.png'),
(5, 'PlayerFive', 'Diamond', 1000, 3000, 3, 0, 'https://example.com/avatar5.png'),
(6, 'PlayerSix', 'Master', 1200, 3500, 3, 0, 'https://example.com/avatar6.png'),
(7, 'PlayerSeven', 'Grandmaster', 1500, 4000, 4, 0, 'https://example.com/avatar7.png'),
(8, 'PlayerEight', 'Champion', 1800, 4500, 4, 0, 'https://example.com/avatar8.png'),
(9, 'PlayerNine', 'Legend', 2000, 5000, 5, 0, 'https://example.com/avatar9.png'),
(10, 'PlayerTen', 'Mythic', 2500, 5500, 5, 0, 'https://example.com/avatar10.png');

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
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
