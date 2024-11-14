-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 13 nov. 2024 à 20:56
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
-- Structure de la table `classements`
--

DROP TABLE IF EXISTS `classements`;
CREATE TABLE IF NOT EXISTS `classements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `joueur_id` int(11) NOT NULL,
  `points` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `joueur_id` (`joueur_id`)
) ENGINE=MyISAM AUTO_INCREMENT=71 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `classements`
--

INSERT INTO `classements` (`id`, `joueur_id`, `points`) VALUES
(1, 1, 8),
(2, 1, 17),
(3, 1, 17),
(4, 1, 15),
(5, 1, 24),
(6, 1, 7),
(7, 1, 22),
(8, 2, 20),
(9, 2, 10),
(10, 2, 15),
(11, 2, 14),
(12, 2, 23),
(13, 2, 6),
(14, 2, 7),
(15, 3, 13),
(16, 3, 13),
(17, 3, 16),
(18, 3, 15),
(19, 3, 11),
(20, 3, 12),
(21, 3, 7),
(22, 4, 17),
(23, 4, 6),
(24, 4, 23),
(25, 4, 21),
(26, 4, 13),
(27, 4, 20),
(28, 4, 21),
(29, 5, 24),
(30, 5, 13),
(31, 5, 18),
(32, 5, 18),
(33, 5, 23),
(34, 5, 24),
(35, 5, 24),
(36, 6, 9),
(37, 6, 19),
(38, 6, 7),
(39, 6, 23),
(40, 6, 22),
(41, 6, 7),
(42, 6, 17),
(43, 7, 14),
(44, 7, 22),
(45, 7, 5),
(46, 7, 12),
(47, 7, 10),
(48, 7, 5),
(49, 7, 23),
(50, 8, 20),
(51, 8, 18),
(52, 8, 8),
(53, 8, 12),
(54, 8, 23),
(55, 8, 20),
(56, 8, 17),
(57, 9, 21),
(58, 9, 9),
(59, 9, 14),
(60, 9, 18),
(61, 9, 17),
(62, 9, 15),
(63, 9, 24),
(64, 10, 21),
(65, 10, 9),
(66, 10, 13),
(67, 10, 24),
(68, 10, 13),
(69, 10, 20),
(70, 10, 14);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
