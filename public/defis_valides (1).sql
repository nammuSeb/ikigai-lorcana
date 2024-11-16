-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 16 nov. 2024 à 13:34
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

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
(12, 5, 2, '2024-11-08 10:30:00'),
(13, 5, 5, '2024-11-15 20:52:55'),
(14, 5, 8, '2024-11-01 20:53:22');

--
-- Contraintes pour les tables déchargées
--

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
