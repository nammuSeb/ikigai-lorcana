-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 14 nov. 2024 à 14:15
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

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `classements`
--
ALTER TABLE `classements`
  ADD CONSTRAINT `classements_ibfk_1` FOREIGN KEY (`joueur_id`) REFERENCES `joueurs` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
