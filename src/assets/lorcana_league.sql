-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 13 nov. 2024 à 10:43
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
  `joueur_id` int(11) DEFAULT NULL,
  `semaine` int(11) DEFAULT NULL,
  `points` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `joueur_id` (`joueur_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
  `semaine` int(11) DEFAULT '1',
  `set_ligue` int(11) DEFAULT '1',
  `progress_semaine` int(11) DEFAULT '0',
  `progress_set` int(11) DEFAULT '0',
  `avatar_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `joueurs`
--

INSERT INTO `joueurs` (`id`, `pseudo`, `rang`, `argent`, `points`, `semaine`, `set_ligue`, `progress_semaine`, `progress_set`, `avatar_url`) VALUES
(1, 'PlayerOne', 'Bronze', 150, 1000, 1, 1, 0, 0, 'https://example.com/avatar1.png'),
(2, 'PlayerTwo', 'Silver', 300, 1500, 2, 1, 0, 0, 'https://example.com/avatar2.png'),
(3, 'PlayerThree', 'Gold', 500, 2000, 3, 2, 0, 0, 'https://example.com/avatar3.png'),
(4, 'PlayerFour', 'Platinum', 750, 2500, 4, 2, 0, 0, 'https://example.com/avatar4.png'),
(5, 'PlayerFive', 'Diamond', 1000, 3000, 5, 3, 0, 0, 'https://example.com/avatar5.png'),
(6, 'PlayerSix', 'Master', 1200, 3500, 6, 3, 0, 0, 'https://example.com/avatar6.png'),
(7, 'PlayerSeven', 'Grandmaster', 1500, 4000, 7, 4, 0, 0, 'https://example.com/avatar7.png'),
(8, 'PlayerEight', 'Champion', 1800, 4500, 8, 4, 0, 0, 'https://example.com/avatar8.png'),
(9, 'PlayerNine', 'Legend', 2000, 5000, 9, 5, 0, 0, 'https://example.com/avatar9.png'),
(10, 'PlayerTen', 'Mythic', 2500, 5500, 10, 5, 0, 0, 'https://example.com/avatar10.png');

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
