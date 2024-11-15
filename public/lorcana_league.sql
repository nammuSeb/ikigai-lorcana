-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 14 nov. 2024 à 19:34
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
  `points` int(11) DEFAULT '0',
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `joueur_id` (`joueur_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `classements`
--

INSERT INTO `classements` (`id`, `joueur_id`, `points`, `start_date`, `end_date`) VALUES
(1, 1, 10, '2024-11-08', '2024-11-16'),
(2, 2, 8, '2024-11-08', '2024-11-16'),
(3, 3, 7, '2024-11-08', '2024-11-16'),
(4, 4, 5, '2024-11-08', '2024-11-16'),
(5, 5, 6, '2024-11-08', '2024-11-16'),
(6, 6, 9, '2024-11-08', '2024-11-16'),
(7, 1, 7, '2024-11-17', '2024-11-23'),
(8, 2, 10, '2024-11-17', '2024-11-23'),
(9, 3, 6, '2024-11-17', '2024-11-23'),
(10, 4, 8, '2024-11-17', '2024-11-23'),
(11, 5, 9, '2024-11-17', '2024-11-23'),
(12, 6, 5, '2024-11-17', '2024-11-23'),
(13, 1, 8, '2024-11-24', '2024-11-30'),
(14, 2, 6, '2024-11-24', '2024-11-30'),
(15, 3, 10, '2024-11-24', '2024-11-30'),
(16, 4, 4, '2024-11-24', '2024-11-30'),
(17, 5, 9, '2024-11-24', '2024-11-30'),
(18, 6, 7, '2024-11-24', '2024-11-30'),
(19, 1, 10, '2024-12-01', '2024-12-07'),
(20, 2, 7, '2024-12-01', '2024-12-07'),
(21, 3, 6, '2024-12-01', '2024-12-07'),
(22, 4, 8, '2024-12-01', '2024-12-07'),
(23, 5, 5, '2024-12-01', '2024-12-07'),
(24, 6, 10, '2024-12-01', '2024-12-07'),
(25, 1, 9, '2024-12-08', '2024-12-14'),
(26, 2, 5, '2024-12-08', '2024-12-14'),
(27, 3, 8, '2024-12-08', '2024-12-14'),
(28, 4, 10, '2024-12-08', '2024-12-14'),
(29, 5, 6, '2024-12-08', '2024-12-14'),
(30, 6, 7, '2024-12-08', '2024-12-14');

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

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
-- Structure de la table `defis_valides`
--

DROP TABLE IF EXISTS `defis_valides`;
CREATE TABLE IF NOT EXISTS `defis_valides` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `defi_id` int(11) NOT NULL,
  `joueur_id` int(11) NOT NULL,
  `date_validation` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `defi_id` (`defi_id`),
  KEY `joueur_id` (`joueur_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `defis_valides`
--

INSERT INTO `defis_valides` (`id`, `defi_id`, `joueur_id`, `date_validation`) VALUES
(1, 1, 1, '2024-11-01 14:00:00'),
(2, 1, 2, '2024-11-01 15:30:00'),
(3, 2, 1, '2024-11-02 12:45:00'),
(4, 3, 3, '2024-11-15 10:10:00'),
(5, 3, 4, '2024-11-15 11:25:00'),
(6, 1, 5, '2024-11-11 00:00:00'),
(7, 5, 1, '2024-11-04 13:50:00'),
(8, 5, 3, '2024-11-05 16:20:00'),
(9, 2, 4, '2024-11-06 18:00:00'),
(10, 3, 2, '2024-11-16 14:00:00'),
(11, 4, 1, '2024-11-07 19:30:00'),
(12, 5, 2, '2024-11-08 10:30:00');

-- --------------------------------------------------------

--
-- Structure de la table `joueurs`
--

DROP TABLE IF EXISTS `joueurs`;
CREATE TABLE IF NOT EXISTS `joueurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(50) NOT NULL,
  `argent` int(11) DEFAULT '0',
  `avatar_url` varchar(255) DEFAULT NULL,
  `nickname` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `joueurs`
--

INSERT INTO `joueurs` (`id`, `pseudo`, `argent`, `avatar_url`, `nickname`) VALUES
(1, 'PlayerOne', 150, 'https://example.com/avatar1.png', 'Lorem Ipsum'),
(2, 'PlayerTwo', 300, 'https://example.com/avatar2.png', ''),
(3, 'PlayerThree', 500, 'https://example.com/avatar3.png', ''),
(4, 'PlayerFour', 750, 'https://example.com/avatar4.png', 'Lorem Ipsum'),
(5, 'PlayerFive', 1000, 'https://example.com/avatar5.png', 'Lorem Ipsum'),
(6, 'PlayerSix', 1200, 'https://example.com/avatar6.png', ''),
(7, 'PlayerSeven', 1500, 'https://example.com/avatar7.png', ''),
(8, 'PlayerEight', 1800, 'https://example.com/avatar8.png', ''),
(9, 'PlayerNine', 2000, 'https://example.com/avatar9.png', ''),
(10, 'PlayerTen', 2500, 'https://example.com/avatar10.png', '');

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
