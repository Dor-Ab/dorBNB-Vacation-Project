-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2023 at 07:53 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dorbnb`
--
CREATE DATABASE IF NOT EXISTS `dorbnb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `dorbnb`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `followerID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `vacationID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`followerID`, `userID`, `vacationID`) VALUES
(49, 8, 3),
(51, 9, 3),
(53, 8, 2),
(55, 8, 104);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `userFirstName` varchar(30) NOT NULL,
  `userLastName` varchar(30) NOT NULL,
  `userEmail` varchar(50) NOT NULL,
  `userPassword` varchar(1000) NOT NULL,
  `userRole` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `userFirstName`, `userLastName`, `userEmail`, `userPassword`, `userRole`) VALUES
(1, 'Dor', 'Abutbul', 'doronabutbul@gmail.com', '7e05b022abdbdb95503feb49d57751563f0396d8415b1960ebe16ba620b7f055e56ca89dccf040d3a1d224ebbb662d803749ff56cff480958098af1ec00cd702', 'Admin'),
(8, 'Elon', 'Musk', 'Elonmusk@gmail.com', '404705a56d95b70a93867fbbf6f2f2215aead199763e8e362eb24d80d99c04e95a9a80cf94cd44849d2b866740a1138f88ff705ef35206bd70cf89aff15a30f9', 'User'),
(9, 'Jeff', 'Bezos', 'jeffbez@gmail.com', '404705a56d95b70a93867fbbf6f2f2215aead199763e8e362eb24d80d99c04e95a9a80cf94cd44849d2b866740a1138f88ff705ef35206bd70cf89aff15a30f9', 'User'),
(10, 'Mark', 'Zuckerberg', 'marki@gmail.com', '404705a56d95b70a93867fbbf6f2f2215aead199763e8e362eb24d80d99c04e95a9a80cf94cd44849d2b866740a1138f88ff705ef35206bd70cf89aff15a30f9', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationID` int(11) NOT NULL,
  `vacationDestination` varchar(500) NOT NULL,
  `vacationDescription` varchar(10000) NOT NULL,
  `vacationStartDate` date NOT NULL,
  `vacationEndDate` date NOT NULL,
  `vacationPrice` int(11) NOT NULL,
  `vacationPhotoName` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationID`, `vacationDestination`, `vacationDescription`, `vacationStartDate`, `vacationEndDate`, `vacationPrice`, `vacationPhotoName`) VALUES
(1, 'Jerusalem', 'Have fun in the holy city while feeling like home !\r\n\r\nBlah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah ', '2023-04-17', '2023-04-30', 4000, '8b9d40fd-4803-4bff-a472-d4ec0701bee0.jpg'),
(2, 'Tel Avivo', 'Want to enjoy in the craziest city in the world? welcome to Tel Aviv, we have everything that you want - parties, beaches, bars and clubs!', '2023-05-18', '2023-05-28', 10000, 'e40748a1-6264-49d9-a9b6-7fd985f81e69.jpg'),
(3, 'Amsterdam', 'We have weed man', '2023-04-10', '2023-04-20', 5000, '545a5ff5-bc28-4eb7-a833-c38eab727142.jpg'),
(9, 'Rome', 'Colosseum and pizza in the most beautiful city of all.\r\nCome and visit us grazy', '2023-06-23', '2023-06-30', 1500, '031d5f4b-c8c1-4788-b387-a8b44c552a82.jpg'),
(11, 'Los Angeles', 'Californiaaaaaa\r\nin the cityyyy\r\nsome more words of tupac ', '2023-05-17', '2023-05-20', 3499, 'd54eb113-66c7-4456-b495-8328a8a2cd15.jpg'),
(12, 'Paris', 'Have the best vacation on the city of love. \r\nEat macaroons and frogs legs and some other more bullshit come on', '2023-10-24', '2023-10-28', 3048, 'c615c0cf-ff6e-4d56-a4eb-40ef4a2a051d.jpg'),
(13, 'Berlin', 'auctungggggg shnaitsss vruhterbuher shloomer kchroocher loom', '2023-09-10', '2023-09-25', 2347, '03665d87-a46f-4b99-a21c-7c52c55c03de.jpg'),
(14, 'Venice', 'spaghetti bologna risotto cannelloni tomato Versace    ', '2023-08-24', '2023-09-02', 4545, '1bea719c-f392-4dbd-8b9c-1f7814d5c15e.jpg'),
(15, 'Phuket', 'ming ma mong min i dont know what to say about Thailand lady boy or shit ', '2024-03-01', '2024-04-01', 3213, '5b266b4a-e87a-41c1-b53a-d499f76f6223.jpg'),
(102, 'Barcelona', 'Barcaaaa messi soccer vamos vamos', '2023-07-01', '2023-07-02', 1323, '0604366f-e597-4aec-9129-c7fbf216a80b.jpg'),
(103, 'New York', 'Concrete jungle where dreams are made offfff thers nothing you cant dooooo now you in new yorkkkk', '2023-10-09', '2023-10-20', 5000, '4f678417-692e-4bb3-b481-e3a7dee8bb49.jpeg'),
(104, 'Morocco!', 'Shesh besh and arak ayalim', '2023-06-28', '2023-07-01', 321, 'fcce8096-3db8-41a4-999d-9fbdef1e4a29.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`followerID`),
  ADD KEY `vacationID` (`vacationID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `followerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_5` FOREIGN KEY (`vacationID`) REFERENCES `vacations` (`vacationID`) ON DELETE CASCADE,
  ADD CONSTRAINT `followers_ibfk_6` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
