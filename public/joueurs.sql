-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 16 nov. 2024 à 09:30
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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
