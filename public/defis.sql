-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 16 nov. 2024 à 11:21
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
(1, 'Lorem', '1x par adversaire & par jour', 2, 'arene', 2, 'fixed', '2024-11-01', '2024-11-07'),
(2, 'Perdre une partie en 3 manches (BO3)', '1x par adversaire & par jour', 1, 'arene', 1, 'fixed', '2024-11-08', '2024-11-14'),
(3, 'Gagner une partie en 2 manches (BO2)', '1x par adversaire & par jour', 2, 'defi_semaine', 2, 'fixed', '2024-11-15', '2024-11-21'),
(4, 'Ex-Aequo partie en 2 manches (BO2)', '1x par adversaire & par jour', 1, 'quete', 1, 'fixed', NULL, NULL),
(5, 'Gagner une partie en 1 manche (BO1)', '1x par adversaire & par jour', 2, 'defi_semaine', 2, 'fixed', NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
