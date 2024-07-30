-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.29 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for com-system
CREATE DATABASE IF NOT EXISTS `com-system` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `com-system`;

-- Dumping structure for table com-system.admin
CREATE TABLE IF NOT EXISTS `admin` (
  `email` varchar(100) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `mobile` varchar(10) DEFAULT NULL,
  `verification_code` varchar(20) DEFAULT NULL,
  `image` text,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table com-system.admin: ~0 rows (approximately)

-- Dumping structure for table com-system.customer
CREATE TABLE IF NOT EXISTS `customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mobile` varchar(10) DEFAULT NULL,
  `balance` double DEFAULT NULL,
  `user_email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_customer_user1_idx` (`user_email`),
  CONSTRAINT `fk_customer_user1` FOREIGN KEY (`user_email`) REFERENCES `user` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=212 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table com-system.customer: ~207 rows (approximately)
INSERT INTO `customer` (`id`, `name`, `email`, `mobile`, `balance`, `user_email`) VALUES
	(5, 'Ayesh Chathuranga', 'sdachathuranga@outlook.com', '0775633584', 27050, 'ecoteccomputersolutions@gmail.com'),
	(6, 'Sujith', 'ecoteccomputersolutions@gmail.com', '0716533366', 299300, 'ecoteccomputersolutions@gmail.com'),
	(7, 'Kapila Dahanayaka', '', '0711767638', 727650, 'ecoteccomputersolutions@gmail.com'),
	(8, 'Danidu Dias', '', '0717608260', 9250, 'ecoteccomputersolutions@gmail.com'),
	(9, 'E.D. Chaminda', '', '0764248405', 250, 'ecoteccomputersolutions@gmail.com'),
	(10, 'Sri Lanka Bureau of Foreign Employment', 'info@slbfe.lk', '0112880500', 0, 'ecoteccomputersolutions@gmail.com'),
	(11, 'W.K. Dilhara', '', '0740649575', 0, 'ecoteccomputersolutions@gmail.com'),
	(12, 'Rupasinghe LED', '', '0711247918', 0, 'ecoteccomputersolutions@gmail.com'),
	(13, 'D.D. Kumara', '', '0761287599', 0, 'ecoteccomputersolutions@gmail.com'),
	(14, 'M.A. Chamara', '', '0704853291', 0, 'ecoteccomputersolutions@gmail.com'),
	(15, 'Pathum Liyanage', '', '0763759357', 0, 'ecoteccomputersolutions@gmail.com'),
	(16, 'K.A.C.M. Harsha', '', '0743359140', 0, 'ecoteccomputersolutions@gmail.com'),
	(17, 'Thisaru Thenuka', '', '0772612486', 0, 'ecoteccomputersolutions@gmail.com'),
	(18, 'M.A. Namal', '', '0714030262', 0, 'ecoteccomputersolutions@gmail.com'),
	(19, 'Priyantha Samarawickrama', '', '0771424056', 0, 'ecoteccomputersolutions@gmail.com'),
	(20, 'W. Manoj', '', '0762699440', 0, 'ecoteccomputersolutions@gmail.com'),
	(21, 'Gamini Sarath', '', '0768695250', 0, 'ecoteccomputersolutions@gmail.com'),
	(22, 'Gehan GD', '', '0702644568', 0, 'ecoteccomputersolutions@gmail.com'),
	(23, 'Dulakshana Matheeshan', '', '0704853301', 0, 'ecoteccomputersolutions@gmail.com'),
	(24, 'N. Nisara', '', '0703315099', 0, 'ecoteccomputersolutions@gmail.com'),
	(25, 'H.G.U. Samson', '', '0715624899', 0, 'ecoteccomputersolutions@gmail.com'),
	(26, 'M. Chamara Prasad', '', '0776555405', 0, 'ecoteccomputersolutions@gmail.com'),
	(27, 'Dhammasiri Thero', '', '0711029595', 0, 'ecoteccomputersolutions@gmail.com'),
	(28, 'Pavithra Botheju', '', '0779392748', 0, 'ecoteccomputersolutions@gmail.com'),
	(29, 'R.G. Tharushi', '', '0772626632', 0, 'ecoteccomputersolutions@gmail.com'),
	(30, 'Asoka Malkanthi', '', '0777492834', 0, 'ecoteccomputersolutions@gmail.com'),
	(31, 'Hasinda Abhishek', '', '0703885893', 0, 'ecoteccomputersolutions@gmail.com'),
	(32, 'Champion Fertiliser', '', '0777409172', 0, 'ecoteccomputersolutions@gmail.com'),
	(33, 'H. Gihan', '', '0779646825', 0, 'ecoteccomputersolutions@gmail.com'),
	(34, 'Aminda Pathirana', '', '0719747094', 0, 'ecoteccomputersolutions@gmail.com'),
	(35, 'S. Udaya Kumara', '', '0705154544', 0, 'ecoteccomputersolutions@gmail.com'),
	(36, 'T.G. Manjula', '', '0713233191', 0, 'ecoteccomputersolutions@gmail.com'),
	(37, 'M.M. Premalatha', '', '0718149649', 0, 'ecoteccomputersolutions@gmail.com'),
	(38, 'E.D. Priyadarshana', '', '0779781133', 0, 'ecoteccomputersolutions@gmail.com'),
	(39, 'W. Mallika', '', '0701044037', 0, 'ecoteccomputersolutions@gmail.com'),
	(40, 'Dineth Sewmin', '', '0771297396', 0, 'ecoteccomputersolutions@gmail.com'),
	(41, 'R.G. Supun', '', '0761214194', 0, 'ecoteccomputersolutions@gmail.com'),
	(42, 'G. Susantha', '', '0768065060', 0, 'ecoteccomputersolutions@gmail.com'),
	(43, 'Ajith Lanka', '', '0713000530', 0, 'ecoteccomputersolutions@gmail.com'),
	(44, 'H.G. Dilusha', '', '0761946903', 0, 'ecoteccomputersolutions@gmail.com'),
	(45, 'Pasan Nirmal', '', '0778040442', 0, 'ecoteccomputersolutions@gmail.com'),
	(46, 'Micro Cars Limited', 'upali@microholdings.lk', '0771516082', 0, 'ecoteccomputersolutions@gmail.com'),
	(47, 'Thilini Liyanage', '', '0740495688', 0, 'ecoteccomputersolutions@gmail.com'),
	(48, 'L. Mangala', '', '0769144016', 0, 'ecoteccomputersolutions@gmail.com'),
	(49, 'Nuwan Darshana', '', '0713678848', 0, 'ecoteccomputersolutions@gmail.com'),
	(50, 'S. Telan', '', '0716247890', 0, 'ecoteccomputersolutions@gmail.com'),
	(51, 'E.D. Thenura', '', '0718058943', 0, 'ecoteccomputersolutions@gmail.com'),
	(52, 'Samanthi Geethika', '', '0705633843', 0, 'ecoteccomputersolutions@gmail.com'),
	(53, 'Thilina Lakshan', '', '0772182179', 0, 'ecoteccomputersolutions@gmail.com'),
	(54, 'L.G. Jayathissa', '', '0703998040', 0, 'ecoteccomputersolutions@gmail.com'),
	(55, 'Upul Shantha', '', '0766165985', 0, 'ecoteccomputersolutions@gmail.com'),
	(56, 'Nadun Nimsara', '', '0761752003', 0, 'ecoteccomputersolutions@gmail.com'),
	(57, 'M.D. Priyadarshana', '', '0714813577', 25000, 'ecoteccomputersolutions@gmail.com'),
	(58, 'Janith Dilshan', 'jdilshan656@gmail.com', '0771663378', 0, 'ecoteccomputersolutions@gmail.com'),
	(59, 'Samurdhi Great Union - Mulatiyana', 'mulatiyanasamurdhi@yahoo.com', '0412268239', 0, 'ecoteccomputersolutions@gmail.com'),
	(60, 'Nebula Infinite', 'info@nebulainfinite.com', '0783233760', 0, 'ecoteccomputersolutions@gmail.com'),
	(61, 'Charith Dulshan Elladeniya', 'charithdulshan98@gmail.com', '0789986211', 0, 'ecoteccomputersolutions@gmail.com'),
	(62, 'Nadeera Thushan', '', '0769146792', 0, 'ecoteccomputersolutions@gmail.com'),
	(63, 'Mulatiyana Tea Factory - Mulatiyana', '', '0412268305', 0, 'ecoteccomputersolutions@gmail.com'),
	(64, 'S.K. Hettiarachchi', '', '0743053771', 0, 'ecoteccomputersolutions@gmail.com'),
	(65, 'Sachith Priyamantha', '', '0774650013', 0, 'ecoteccomputersolutions@gmail.com'),
	(66, 'Reliance - Makandura', 'ravindrakumarash@gmail.com', '0711350123', 0, 'ecoteccomputersolutions@gmail.com'),
	(67, 'Susinidu Trade Center - Mulatiyana', '', '0714626910', 0, 'ecoteccomputersolutions@gmail.com'),
	(68, 'Pasindu Wickramage', '', '0725401044', 0, 'ecoteccomputersolutions@gmail.com'),
	(69, 'B. Chathuranga', '', '0771841471', 0, 'ecoteccomputersolutions@gmail.com'),
	(70, 'D.G. Karunasena', '', '0774154705', 0, 'ecoteccomputersolutions@gmail.com'),
	(71, 'Janith Oshadha', '', '0778793857', 6000, 'ecoteccomputersolutions@gmail.com'),
	(72, 'Jayanitha Deneth', '', '0768188340', 0, 'ecoteccomputersolutions@gmail.com'),
	(73, 'Chathushka Imalshan', '', '0766165333', 0, 'ecoteccomputersolutions@gmail.com'),
	(74, 'Dimuthu Lakmal', 'www.dinudimuthu@gmail.com', '0760376722', 66400, 'ecoteccomputersolutions@gmail.com'),
	(75, 'Chandima Abeygunawardana', '', '0706329574', 0, 'ecoteccomputersolutions@gmail.com'),
	(76, 'B. Dilshan Rasith', '', '0779491590', 0, 'ecoteccomputersolutions@gmail.com'),
	(77, 'G. Vidura', '', '0768471160', 0, 'ecoteccomputersolutions@gmail.com'),
	(78, 'Kaveen Nethsara', 'kaveennethsara347@gmail.com', '0783463283', 0, 'ecoteccomputersolutions@gmail.com'),
	(79, 'K. Somalatha', '', '0777528014', 0, 'ecoteccomputersolutions@gmail.com'),
	(80, 'Gihan Thathsara', '', '0764990241', 0, 'ecoteccomputersolutions@gmail.com'),
	(81, 'Pasindu Rathnayaka', '', '0766071510', 0, 'ecoteccomputersolutions@gmail.com'),
	(82, 'Praveen Bhashitha', 'praveenbhashitha26@gmail.com', '0743604209', 40000, 'ecoteccomputersolutions@gmail.com'),
	(83, 'G. Chanod Tharaka', '', '0785102490', 0, 'ecoteccomputersolutions@gmail.com'),
	(84, 'K. Sujith', '', '0706096300', 0, 'ecoteccomputersolutions@gmail.com'),
	(85, 'K.G. Priyantha', '', '0770457873', 0, 'ecoteccomputersolutions@gmail.com'),
	(86, 'Shehan Sachinthana', '', '0711548180', 0, 'ecoteccomputersolutions@gmail.com'),
	(87, 'Rural Development Office - Makandura', '', '0776247237', 0, 'ecoteccomputersolutions@gmail.com'),
	(88, 'S.A. Thissa', '', '0766519015', 0, 'ecoteccomputersolutions@gmail.com'),
	(89, 'Chiran Malhara', '', '0703119327', 0, 'ecoteccomputersolutions@gmail.com'),
	(90, 'Mahesh Darshana', '', '0779815106', 0, 'ecoteccomputersolutions@gmail.com'),
	(91, 'Sahan Sadaruwan', '', '0779455028', 0, 'ecoteccomputersolutions@gmail.com'),
	(92, 'Anjana Dahanayaka', 'sanjudilka5@gmail.com', '0765823106', 0, 'ecoteccomputersolutions@gmail.com'),
	(93, 'Chandika Rajapaksha', '', '0779358181', 0, 'ecoteccomputersolutions@gmail.com'),
	(94, 'Nilame Gedara - Mulatiyana', '', '0703997004', 0, 'ecoteccomputersolutions@gmail.com'),
	(95, 'M. Nanayakkara', '', '0718676059', 0, 'ecoteccomputersolutions@gmail.com'),
	(96, 'Chinthaka Lakshan', '', '0785828546', 0, 'ecoteccomputersolutions@gmail.com'),
	(97, 'Sandya Shiromi', 'sandyashiromi8@gmail.com', '0702576540', 0, 'ecoteccomputersolutions@gmail.com'),
	(98, 'DREAM ART (Hashan Sanka Madu)', 'mydreamartme@gmail.com', '0788935373', 0, 'ecoteccomputersolutions@gmail.com'),
	(99, 'Narada Perera', '', '0740527240', 0, 'ecoteccomputersolutions@gmail.com'),
	(100, 'Samurdhi Bank - Mulatiyana', 'divinegumamulatiyana@gmail.com', '0412268034', 0, 'ecoteccomputersolutions@gmail.com'),
	(101, 'E.D. Madushan Vishwajith', 'mvishwajith8@gmail.com', '0715410308', 0, 'ecoteccomputersolutions@gmail.com'),
	(102, 'Gayan Chinthaka', 'chinthakagaya0@gmail.com', '0740958900', 0, 'ecoteccomputersolutions@gmail.com'),
	(103, 'Chanaka Hasantha', '', '0717340610', 15000, 'ecoteccomputersolutions@gmail.com'),
	(104, 'J.L. Kumudu', '', '0766150366', 0, 'ecoteccomputersolutions@gmail.com'),
	(105, 'Lahiru Sampath', '', '0769098351', 0, 'ecoteccomputersolutions@gmail.com'),
	(106, 'Thushara Sanjeewa', '', '0712520252', 0, 'ecoteccomputersolutions@gmail.com'),
	(107, 'Harshani Ayodya', 'harshaniayodya045@gmail.com', '0711930213', 0, 'ecoteccomputersolutions@gmail.com'),
	(108, 'Amal Ruwan', '', '0703742310', 0, 'ecoteccomputersolutions@gmail.com'),
	(109, 'B. Sumathipala', '', '0725952447', 0, 'ecoteccomputersolutions@gmail.com'),
	(110, 'Sanasa Bank - Mawarala', '', '0413406925', 0, 'ecoteccomputersolutions@gmail.com'),
	(111, 'Lahiru Niluksha', '', '0722286587', 0, 'ecoteccomputersolutions@gmail.com'),
	(112, 'Kavindu Shehan', 'kavindushehanmadusanka@gmail.com', '0762875275', 0, 'ecoteccomputersolutions@gmail.com'),
	(113, 'Imalka Dhanapala', '', '0713664311', 0, 'ecoteccomputersolutions@gmail.com'),
	(114, 'Sachinthaka Sadaruwan', '', '0775581910', 0, 'ecoteccomputersolutions@gmail.com'),
	(115, 'Samiru Bangamuwa', 'samirubangamuwa7396@gmail.com', '0783375910', 0, 'ecoteccomputersolutions@gmail.com'),
	(116, 'A.G.H.D. Kumarasinghe', 'hasindud09@gmail.com', '0872089221', 0, 'ecoteccomputersolutions@gmail.com'),
	(117, 'Deshan', '', '0719090064', 0, 'ecoteccomputersolutions@gmail.com'),
	(118, 'D.V. Sadun Prabath', 'sadunprabath889@gmail.com', '0770127569', 0, 'ecoteccomputersolutions@gmail.com'),
	(119, 'W.A.Danushka', 'danushkad1999@icloud.com', '0740684432', 0, 'ecoteccomputersolutions@gmail.com'),
	(120, 'Nethma Bimsara', '', '0779867015', 0, 'ecoteccomputersolutions@gmail.com'),
	(121, 'M.G. Mithila', '', '0771334121', 0, 'ecoteccomputersolutions@gmail.com'),
	(122, 'Lahiru Nimsara', 'lahirunimsara@icloud.com', '0782394092', 0, 'ecoteccomputersolutions@gmail.com'),
	(123, 'Samurdhi Bank - Ransegoda', 'samurdhibankransegoda@gmail.com', '0412268188', 0, 'ecoteccomputersolutions@gmail.com'),
	(124, 'Chanaka Sanjaya', 'chanakasanjayasb@gmail.com', '0768228544', 0, 'ecoteccomputersolutions@gmail.com'),
	(125, 'Tharaka madushan', '', '0773649259', 0, 'ecoteccomputersolutions@gmail.com'),
	(126, 'Harshana Abeywickrama', 'vinodharshana2001@gmail.com', '0775726002', 0, 'ecoteccomputersolutions@gmail.com'),
	(127, 'Pradeshiya Sabha - Mulatiyana', 'psmulatiyana@yahoo.com', '0713403313', 0, 'ecoteccomputersolutions@gmail.com'),
	(128, 'Darshana jayasanka', '', '0769005182', 0, 'ecoteccomputersolutions@gmail.com'),
	(129, 'Piyantha Wannige', '', '0718022090', 0, 'ecoteccomputersolutions@gmail.com'),
	(130, 'Malaka', '', '0769005182', 0, 'ecoteccomputersolutions@gmail.com'),
	(131, 'E.G.J. Chandrasiri', '', '0775563587', 0, 'ecoteccomputersolutions@gmail.com'),
	(132, 'Ushan Randima', 'ushanrandima@gmail.com', '0702698782', 0, 'ecoteccomputersolutions@gmail.com'),
	(133, 'V.G. Anusha', '', '0767976355', 0, 'ecoteccomputersolutions@gmail.com'),
	(134, 'S.D.A. Chathuranga', 'sdachathuranga@gmail.com', '0717522706', 0, 'ecoteccomputersolutions@gmail.com'),
	(135, 'Chandi Weerasinghe', '', '0710354289', 0, 'ecoteccomputersolutions@gmail.com'),
	(136, 'Chandi Weerasinghe', '', '0710354289', 0, 'ecoteccomputersolutions@gmail.com'),
	(137, 'Nanda Thero', '', '0761779346', 0, 'ecoteccomputersolutions@gmail.com'),
	(138, 'Union Pharmacy & Grocery - Mulatiyana', '', '0711748536', 0, 'ecoteccomputersolutions@gmail.com'),
	(139, 'Ramakrishnan', '', '0740002574', 0, 'ecoteccomputersolutions@gmail.com'),
	(140, 'Sampath Tailors and Nilame Madura - Mulatiyana', '', '0717386097', 0, 'ecoteccomputersolutions@gmail.com'),
	(141, 'Samarawickrama Brothers & Hardware (PVT) LTD - Mul', 'ssamarawickrama123@gmail.com', '0412268432', 0, 'ecoteccomputersolutions@gmail.com'),
	(142, 'Madusanka Mobile & Repair - Mulatiyana', 'jayanath.madusanka000@gmail.com', '0788371981', 0, 'ecoteccomputersolutions@gmail.com'),
	(143, 'Sanasa City Bank - Makandura', 'chinthakanilantha@gmail.com', '0726227931', 0, 'ecoteccomputersolutions@gmail.com'),
	(144, 'S.R. Kumuduni', '', '0778793857', 0, 'ecoteccomputersolutions@gmail.com'),
	(145, 'Diddenipotha Estate - Mulatiyana', 'diddenipothae@brownsplantations.com', '0412268227', 0, 'ecoteccomputersolutions@gmail.com'),
	(146, 'Nishantha Hardware', '', '0776144392', 10000, 'ecoteccomputersolutions@gmail.com'),
	(147, 'Ashen Tharuka', 'Ashentharuka11@gmail.com', '0778657099', 0, 'ecoteccomputersolutions@gmail.com'),
	(148, 'Samantha Wanniarachchi', '', '0766329209', 0, 'ecoteccomputersolutions@gmail.com'),
	(149, 'Microvision Computers', 'chinthakanilantha@gmail.com', '0774636561', 0, 'ecoteccomputersolutions@gmail.com'),
	(150, 'Shavinda Nanayakkara', 'SNgroupempire@gmail.com', '0779008201', 0, 'ecoteccomputersolutions@gmail.com'),
	(151, 'Vipul Gunasekara', 'vipulvideovisionmk@gmail.com', '0779737456', 0, 'ecoteccomputersolutions@gmail.com'),
	(152, 'K.O.G. Bihandu Methum', 'sadaneth333@gmail.com', '0779341724', 0, 'ecoteccomputersolutions@gmail.com'),
	(153, 'G. Sanjana Methsari', '', '0769005182', 0, 'ecoteccomputersolutions@gmail.com'),
	(154, 'Lahiru Sampath', '', '0769098351', 0, 'ecoteccomputersolutions@gmail.com'),
	(155, 'Thushara Sanjeewa', '', '0712520252', 0, 'ecoteccomputersolutions@gmail.com'),
	(156, 'Harshani Ayodya', 'harshaniayodya045@gmail.com', '0711930213', 0, 'ecoteccomputersolutions@gmail.com'),
	(157, 'Amal Ruwan', '', '0703742310', 0, 'ecoteccomputersolutions@gmail.com'),
	(158, 'B. Sumathipala', '', '0725952447', 0, 'ecoteccomputersolutions@gmail.com'),
	(159, 'Sanasa Bank - Mawarala', '', '0413406925', 0, 'ecoteccomputersolutions@gmail.com'),
	(160, 'Lahiru Niluksha', '', '0722286587', 0, 'ecoteccomputersolutions@gmail.com'),
	(161, 'Kavindu Shehan', 'kavindushehanmadusanka@gmail.com', '0762875275', 0, 'ecoteccomputersolutions@gmail.com'),
	(162, 'Imalka Dhanapala', '', '0713664311', 0, 'ecoteccomputersolutions@gmail.com'),
	(163, 'Sachinthaka Sadaruwan', '', '0775581910', 0, 'ecoteccomputersolutions@gmail.com'),
	(164, 'Samiru Bangamuwa', 'samirubangamuwa7396@gmail.com', '0783375910', 0, 'ecoteccomputersolutions@gmail.com'),
	(165, 'A.G.H.D. Kumarasinghe', 'hasindud09@gmail.com', '0872089221', 0, 'ecoteccomputersolutions@gmail.com'),
	(166, 'Deshan', '', '0719090064', 0, 'ecoteccomputersolutions@gmail.com'),
	(167, 'D.V. Sadun Prabath', 'sadunprabath889@gmail.com', '0770127569', 0, 'ecoteccomputersolutions@gmail.com'),
	(168, 'W.A.Danushka', 'danushkad1999@icloud.com', '0740684432', 0, 'ecoteccomputersolutions@gmail.com'),
	(169, 'Nethma Bimsara', '', '0779867015', 0, 'ecoteccomputersolutions@gmail.com'),
	(170, 'M.G. Mithila', '', '0771334121', 0, 'ecoteccomputersolutions@gmail.com'),
	(171, 'Lahiru Nimsara', 'lahirunimsara@icloud.com', '0782394092', 0, 'ecoteccomputersolutions@gmail.com'),
	(172, 'Samurdhi Bank - Ransegoda', 'samurdhibankransegoda@gmail.com', '0412268188', 0, 'ecoteccomputersolutions@gmail.com'),
	(173, 'Chanaka Sanjaya', 'chanakasanjayasb@gmail.com', '0768228544', 0, 'ecoteccomputersolutions@gmail.com'),
	(174, 'Tharaka madushan', '', '0773649259', 0, 'ecoteccomputersolutions@gmail.com'),
	(175, 'Harshana Abeywickrama', 'vinodharshana2001@gmail.com', '0775726002', 0, 'ecoteccomputersolutions@gmail.com'),
	(176, 'Pradeshiya Sabha - Mulatiyana', 'psmulatiyana@yahoo.com', '0713403313', 0, 'ecoteccomputersolutions@gmail.com'),
	(177, 'Darshana jayasanka', '', '0769005182', 0, 'ecoteccomputersolutions@gmail.com'),
	(178, 'Piyantha Wannige', '', '0718022090', 0, 'ecoteccomputersolutions@gmail.com'),
	(179, 'Malaka', '', '0769005182', 0, 'ecoteccomputersolutions@gmail.com'),
	(180, 'E.G.J. Chandrasiri', '', '0775563587', 0, 'ecoteccomputersolutions@gmail.com'),
	(181, 'Ushan Randima', 'ushanrandima@gmail.com', '0702698782', 0, 'ecoteccomputersolutions@gmail.com'),
	(182, 'V.G. Anusha', '', '0767976355', 0, 'ecoteccomputersolutions@gmail.com'),
	(183, 'S.D.A. Chathuranga', 'sdachathuranga@gmail.com', '0717522706', 0, 'ecoteccomputersolutions@gmail.com'),
	(184, 'Chandi Weerasinghe', '', '0710354289', 0, 'ecoteccomputersolutions@gmail.com'),
	(185, 'Chandi Weerasinghe', '', '0710354289', 0, 'ecoteccomputersolutions@gmail.com'),
	(186, 'Nanda Thero', '', '0761779346', 0, 'ecoteccomputersolutions@gmail.com'),
	(187, 'Union Pharmacy & Grocery - Mulatiyana', '', '0711748536', 0, 'ecoteccomputersolutions@gmail.com'),
	(188, 'Ramakrishnan', '', '0740002574', 0, 'ecoteccomputersolutions@gmail.com'),
	(189, 'Sampath Tailors and Nilame Madura - Mulatiyana', '', '0717386097', 0, 'ecoteccomputersolutions@gmail.com'),
	(190, 'Samarawickrama Brothers & Hardware (PVT) LTD - Mul', 'ssamarawickrama123@gmail.com', '0412268432', 0, 'ecoteccomputersolutions@gmail.com'),
	(191, 'Madusanka Mobile & Repair - Mulatiyana', 'jayanath.madusanka000@gmail.com', '0788371981', 0, 'ecoteccomputersolutions@gmail.com'),
	(192, 'Sanasa City Bank - Makandura', 'chinthakanilantha@gmail.com', '0726227931', 0, 'ecoteccomputersolutions@gmail.com'),
	(193, 'S.R. Kumuduni', '', '0778793857', 0, 'ecoteccomputersolutions@gmail.com'),
	(194, 'Diddenipotha Estate - Mulatiyana', 'diddenipothae@brownsplantations.com', '0412268227', 0, 'ecoteccomputersolutions@gmail.com'),
	(195, 'Nishantha Hardware', '', '0776144392', 10000, 'ecoteccomputersolutions@gmail.com'),
	(196, 'Ashen Tharuka', 'Ashentharuka11@gmail.com', '0778657099', 0, 'ecoteccomputersolutions@gmail.com'),
	(197, 'Samantha Wanniarachchi', '', '0766329209', 0, 'ecoteccomputersolutions@gmail.com'),
	(198, 'Microvision Computers', 'chinthakanilantha@gmail.com', '0774636561', 0, 'ecoteccomputersolutions@gmail.com'),
	(199, 'Shavinda Nanayakkara', 'SNgroupempire@gmail.com', '0779008201', 0, 'ecoteccomputersolutions@gmail.com'),
	(200, 'Vipul Gunasekara', 'vipulvideovisionmk@gmail.com', '0779737456', 0, 'ecoteccomputersolutions@gmail.com'),
	(201, 'K.O.G. Bihandu Methum', 'sadaneth333@gmail.com', '0779341724', 0, 'ecoteccomputersolutions@gmail.com'),
	(202, 'G. Sanjana Methsari', '', '0769005182', 0, 'ecoteccomputersolutions@gmail.com'),
	(203, 'Ushan Praveesha', '', '0764070980', 0, 'ecoteccomputersolutions@gmail.com'),
	(204, 'G.M. Senuka', '', '0712089110', 0, 'ecoteccomputersolutions@gmail.com'),
	(205, 'J.A.L. Bodana', '', '0705802772', 0, 'ecoteccomputersolutions@gmail.com'),
	(206, 'Ushan Praveesha', '', '0764070980', 0, 'ecoteccomputersolutions@gmail.com'),
	(207, 'G.M. Senuka', '', '0712089110', 0, 'ecoteccomputersolutions@gmail.com'),
	(208, 'J.A.L. Bodana', '', '0705802772', 0, 'ecoteccomputersolutions@gmail.com'),
	(209, 'K.K. Lakshitha', '', '0771079342', 0, 'ecoteccomputersolutions@gmail.com'),
	(210, 'Post Office - Mulatiyana', '', '0412268250', 0, 'ecoteccomputersolutions@gmail.com'),
	(211, 'Yasidu Tharumal', '', '0718840794', 23900, 'ecoteccomputersolutions@gmail.com');

-- Dumping structure for table com-system.customer_details
CREATE TABLE IF NOT EXISTS `customer_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address1` varchar(45) DEFAULT NULL,
  `address2` varchar(45) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `instruction` text,
  `account_no` varchar(20) DEFAULT NULL,
  `fax` varchar(15) DEFAULT NULL,
  `telephone` varchar(10) DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `note` text,
  `province_id` int NOT NULL,
  `customer_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_customer_province1_idx` (`province_id`),
  KEY `fk_customer_details_customer1_idx` (`customer_id`),
  CONSTRAINT `fk_customer_details_customer1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
  CONSTRAINT `fk_customer_province10` FOREIGN KEY (`province_id`) REFERENCES `province` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table com-system.customer_details: ~1 rows (approximately)
INSERT INTO `customer_details` (`id`, `address1`, `address2`, `city`, `postal_code`, `instruction`, `account_no`, `fax`, `telephone`, `website`, `note`, `province_id`, `customer_id`) VALUES
	(2, 'Rukmalgahahena, Diddenipotha, Makandura.', '', 'Matara', '81070', '', '', '', '', '', '', 1, 5);

-- Dumping structure for table com-system.estimate
CREATE TABLE IF NOT EXISTS `estimate` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estimate_id` varchar(50) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `subhead` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `notes` text,
  `paid_amount` double DEFAULT NULL,
  `customer_id` int NOT NULL,
  `instruction` text,
  `footer` text,
  `user_email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_invoice_customer1_idx` (`customer_id`),
  KEY `fk_estimate_user1_idx` (`user_email`),
  CONSTRAINT `fk_estimate_user1` FOREIGN KEY (`user_email`) REFERENCES `user` (`email`),
  CONSTRAINT `fk_invoice_customer10` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table com-system.estimate: ~3 rows (approximately)
INSERT INTO `estimate` (`id`, `estimate_id`, `name`, `subhead`, `date`, `due_date`, `notes`, `paid_amount`, `customer_id`, `instruction`, `footer`, `user_email`) VALUES
	(21, '1', 'Estimate', 'Sub', '2024-07-01', '2024-07-23', 'PLEASE PRODUSE THE INVOICE FOR WARRANTY. NO WARRANTY FOR CHIP BURNS, PHYSICAL DAMAGE OR CORROSION. Warranty covers only manufacturer s defects. Damage or defect due to other causes such as negligence, misuses, improper operation, power fluctuation, lightening, or other natural disasters, sabotage, or accident etc. (01M) = 30 Days, (03M) = 90 Days, (06M) = 180 Days, (01Y) = 350 Days, (02Y) = 700 Days, (03Y) = 1050 Days, (05Y) = 1750 Days, (10Y) = 3500 Days, (L/W) = Lifetime Warranty. (N/W) = No Warranty).', 205000, 5, 'We know the world is full of choices. Thank you for selecting us.', 'We know the world is full of choices. Thank you for selecting us.', 'ecoteccomputersolutions@gmail.com'),
	(22, '2', 'Estimate', 'Sub', '2024-07-01', '2024-07-17', 'PLEASE PRODUSE THE INVOICE FOR WARRANTY. NO WARRANTY FOR CHIP BURNS, PHYSICAL DAMAGE OR CORROSION. Warranty covers only manufacturer s defects. Damage or defect due to other causes such as negligence, misuses, improper operation, power fluctuation, lightening, or other natural disasters, sabotage, or accident etc. (01M) = 30 Days, (03M) = 90 Days, (06M) = 180 Days, (01Y) = 350 Days, (02Y) = 700 Days, (03Y) = 1050 Days, (05Y) = 1750 Days, (10Y) = 3500 Days, (L/W) = Lifetime Warranty. (N/W) = No Warranty).', 20000, 6, 'We know the world is full of choices. Thank you for selecting us.', 'We know the world is full of choices. Thank you for selecting us.', 'ecoteccomputersolutions@gmail.com'),
	(35, '3', 'Estimate', 'Sub', '2024-07-09', '2024-07-24', 'This estimate is an approximation and is not uaranteed. The estimate is based on information provided from the client regarding project requirements. Actual cost may change once all project elements are finalized or negotiated. Prior to any changes of cost, the client will be notified. Estimate valid for 30 days.', 10000, 5, 'We know the world is full of choices. Thank you for selecting us.', 'We know the world is full of choices. Thank you for selecting us.', 'ecoteccomputersolutions@gmail.com');

-- Dumping structure for table com-system.estimate_item
CREATE TABLE IF NOT EXISTS `estimate_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` text,
  `qty` double DEFAULT NULL,
  `buying_price` double DEFAULT NULL,
  `selling_price` double DEFAULT NULL,
  `tax` double DEFAULT NULL,
  `estimate_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_estimate_item_estimate1_idx` (`estimate_id`),
  CONSTRAINT `fk_estimate_item_estimate1` FOREIGN KEY (`estimate_id`) REFERENCES `estimate` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=196 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table com-system.estimate_item: ~6 rows (approximately)
INSERT INTO `estimate_item` (`id`, `name`, `description`, `qty`, `buying_price`, `selling_price`, `tax`, `estimate_id`) VALUES
	(190, 'ACER EXTENSA 15 I3-12TH GEN LAPTOP (01Y) ', 'ACER EXTENSA 15 I3-12TH GEN LAPTOP (EX215-55-32VT) STEEL GRAY (S/N:NXEGYEM00S3460E0843400) (01Y)', 1, 0, 135000, 0, 21),
	(191, 'HP PROBOOK 450 G3 LAPTOP (USED) (03M)', 'HP PROBOOK 450 G3 I5-6TH GEN LAPTOP (S/N:JPH819BX1R) (USED) (03M)', 1, 0, 70000, 0, 21),
	(192, 'INTEL PENTIUM G4400 3.30GHz CPU (USED) (03M)', 'INTEL PENTIUM G4400 3.30GHz CPU (USED) (S/N:L535C174) (03M)', 1, 0, 4750, 0, 22),
	(193, 'PRINTER FULL SERVICE (PASSBOOK DOT MATRIX) (N/W)', 'EPSON PLQ-35 Printer unit disassembly, Exterior & interior deep cleaning. (N/W)', 2, 0, 2500, 0, 22),
	(194, 'TRANSCEND 8GB 2666MHz DDR4 NOTEBOOK MEMORY (05Y) ', 'TRANSCEND 8GB 2666MHz DDR4 NOTEBOOK MEMORY (S/N:I128661318) (05Y)', 1, 0, 9500, 0, 35),
	(195, 'POWER CABLE WITH FUSED 1.2M (DESKTOP) (N/W)', 'POWER CABLE WITH FUSED 1.2M (DESKTOP) (N/W) ', 1, 0, 650, 0, 35);

-- Dumping structure for table com-system.invoice
CREATE TABLE IF NOT EXISTS `invoice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoice_id` varchar(50) DEFAULT NULL,
  `summary` text,
  `date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `notes` text,
  `instruction` text,
  `footer` text,
  `paid_amount` double DEFAULT NULL,
  `customer_id` int NOT NULL,
  `user_email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_invoice_customer1_idx` (`customer_id`),
  KEY `fk_invoice_user1_idx` (`user_email`),
  CONSTRAINT `fk_invoice_customer1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
  CONSTRAINT `fk_invoice_user1` FOREIGN KEY (`user_email`) REFERENCES `user` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table com-system.invoice: ~13 rows (approximately)
INSERT INTO `invoice` (`id`, `invoice_id`, `summary`, `date`, `due_date`, `notes`, `instruction`, `footer`, `paid_amount`, `customer_id`, `user_email`) VALUES
	(11, '249', 'Notes summary', '2024-07-03', '2024-07-08', 'Notes note', 'Notes Payment', 'Notes footer', 15000, 25, 'ecoteccomputersolutions@gmail.com'),
	(12, '320', '', '2024-07-01', '2024-07-31', 'Default Notes 2', 'Default Payment 2', 'Default Footer 2', 20000, 5, 'ecoteccomputersolutions@gmail.com'),
	(13, '231', '', '2024-07-09', '2024-07-17', 'PLEASE PRODUSE THE INVOICE FOR WARRANTY. NO WARRANTY FOR CHIP BURNS, PHYSICAL DAMAGE OR CORROSION. Warranty covers only manufacturer\'s defects. Damage or defect due to other causes such as negligence, misuses, improper operation, power fluctuation, lightening, or other natural disasters, sabotage, or accident etc. (01M) = 30 Days, (03M) = 90 Days, (06M) = 180 Days, (01Y) = 350 Days, (02Y) = 700 Days, (03Y) = 1050 Days, (05Y) = 1750 Days, (10Y) = 3500 Days, (L/W) = Lifetime Warranty. (N/W) = No Warranty).', 'PLEASE PRODUSE THE INVOICE FOR WARRANTY. NO WARRANTY FOR CHIP BURNS, PHYSICAL DAMAGE OR CORROSION. Warranty covers only manufacturer\'s defects. Damage or defect due to other causes such as negligence, misuses, improper operation, power fluctuation, lightening, or other natural disasters, sabotage, or accident etc. (01M) = 30 Days, (03M) = 90 Days, (06M) = 180 Days, (01Y) = 350 Days, (02Y) = 700 Days, (03Y) = 1050 Days, (05Y) = 1750 Days, (10Y) = 3500 Days, (L/W) = Lifetime Warranty. (N/W) = No Warranty).', 'We know the world is full of choices. Thank you for selecting us.', 20000, 5, 'ecoteccomputersolutions@gmail.com'),
	(14, '251', '', '2024-07-08', '2024-07-17', 'PLEASE PRODUSE THE INVOICE FOR WARRANTY. NO WARRANTY FOR CHIP BURNS, PHYSICAL DAMAGE OR CORROSION. Warranty covers only manufacturer\'s defects. Damage or defect due to other causes such as negligence, misuses, improper operation, power fluctuation, lightening, or other natural disasters, sabotage, or accident etc. (01M) = 30 Days, (03M) = 90 Days, (06M) = 180 Days, (01Y) = 350 Days, (02Y) = 700 Days, (03Y) = 1050 Days, (05Y) = 1750 Days, (10Y) = 3500 Days, (L/W) = Lifetime Warranty. (N/W) = No Warranty).', 'PLEASE PRODUSE THE INVOICE FOR WARRANTY. NO WARRANTY FOR CHIP BURNS, PHYSICAL DAMAGE OR CORROSION. Warranty covers only manufacturer\'s defects. Damage or defect due to other causes such as negligence, misuses, improper operation, power fluctuation, lightening, or other natural disasters, sabotage, or accident etc. (01M) = 30 Days, (03M) = 90 Days, (06M) = 180 Days, (01Y) = 350 Days, (02Y) = 700 Days, (03Y) = 1050 Days, (05Y) = 1750 Days, (10Y) = 3500 Days, (L/W) = Lifetime Warranty. (N/W) = No Warranty).', 'We know the world is full of choices. Thank you for selecting us.', 20000, 5, 'ecoteccomputersolutions@gmail.com'),
	(15, '245', '', '2024-07-08', '2024-07-31', 'PLEASE PRODUSE THE INVOICE FOR WARRANTY. NO WARRANTY FOR CHIP BURNS, PHYSICAL DAMAGE OR CORROSION. Warranty covers only manufacturer\'s defects. Damage or defect due to other causes such as negligence, misuses, improper operation, power fluctuation, lightening, or other natural disasters, sabotage, or accident etc. (01M) = 30 Days, (03M) = 90 Days, (06M) = 180 Days, (01Y) = 350 Days, (02Y) = 700 Days, (03Y) = 1050 Days, (05Y) = 1750 Days, (10Y) = 3500 Days, (L/W) = Lifetime Warranty. (N/W) = No Warranty).', 'PLEASE PRODUSE THE INVOICE FOR WARRANTY. NO WARRANTY FOR CHIP BURNS, PHYSICAL DAMAGE OR CORROSION. Warranty covers only manufacturer\'s defects. Damage or defect due to other causes such as negligence, misuses, improper operation, power fluctuation, lightening, or other natural disasters, sabotage, or accident etc. (01M) = 30 Days, (03M) = 90 Days, (06M) = 180 Days, (01Y) = 350 Days, (02Y) = 700 Days, (03Y) = 1050 Days, (05Y) = 1750 Days, (10Y) = 3500 Days, (L/W) = Lifetime Warranty. (N/W) = No Warranty).', 'We know the world is full of choices. Thank you for selecting us.', 0, 5, 'ecoteccomputersolutions@gmail.com'),
	(16, '278', '', '2024-07-15', '2024-07-17', 'PLEASE PRODUSE THE INVOICE FOR WARRANTY. NO WARRANTY FOR CHIP BURNS, PHYSICAL DAMAGE OR CORROSION. Warranty covers only manufacturer\'s defects. Damage or defect due to other causes such as negligence, misuses, improper operation, power fluctuation, lightening, or other natural disasters, sabotage, or accident etc. (01M) = 30 Days, (03M) = 90 Days, (06M) = 180 Days, (01Y) = 350 Days, (02Y) = 700 Days, (03Y) = 1050 Days, (05Y) = 1750 Days, (10Y) = 3500 Days, (L/W) = Lifetime Warranty. (N/W) = No Warranty).', 'PLEASE PRODUSE THE INVOICE FOR WARRANTY. NO WARRANTY FOR CHIP BURNS, PHYSICAL DAMAGE OR CORROSION. Warranty covers only manufacturer\'s defects. Damage or defect due to other causes such as negligence, misuses, improper operation, power fluctuation, lightening, or other natural disasters, sabotage, or accident etc. (01M) = 30 Days, (03M) = 90 Days, (06M) = 180 Days, (01Y) = 350 Days, (02Y) = 700 Days, (03Y) = 1050 Days, (05Y) = 1750 Days, (10Y) = 3500 Days, (L/W) = Lifetime Warranty. (N/W) = No Warranty).', 'We know the world is full of choices. Thank you for selecting us.', 30000, 5, 'ecoteccomputersolutions@gmail.com'),
	(17, '279', '', '2024-07-09', '2024-07-31', 'PLEASE PRODUSE THE INVOICE FOR WARRANTY. NO WARRANTY FOR CHIP BURNS, PHYSICAL DAMAGE OR CORROSION. Warranty covers only manufacturer\'s defects. Damage or defect due to other causes such as negligence, misuses, improper operation, power fluctuation, lightening, or other natural disasters, sabotage, or accident etc. (01M) = 30 Days, (03M) = 90 Days, (06M) = 180 Days, (01Y) = 350 Days, (02Y) = 700 Days, (03Y) = 1050 Days, (05Y) = 1750 Days, (10Y) = 3500 Days, (L/W) = Lifetime Warranty. (N/W) = No Warranty).', 'PLEASE PRODUSE THE INVOICE FOR WARRANTY. NO WARRANTY FOR CHIP BURNS, PHYSICAL DAMAGE OR CORROSION. Warranty covers only manufacturer\'s defects. Damage or defect due to other causes such as negligence, misuses, improper operation, power fluctuation, lightening, or other natural disasters, sabotage, or accident etc. (01M) = 30 Days, (03M) = 90 Days, (06M) = 180 Days, (01Y) = 350 Days, (02Y) = 700 Days, (03Y) = 1050 Days, (05Y) = 1750 Days, (10Y) = 3500 Days, (L/W) = Lifetime Warranty. (N/W) = No Warranty).', 'We know the world is full of choices. Thank you for selecting us.', 0, 6, 'ecoteccomputersolutions@gmail.com'),
	(21, '321', 'Summery', '2024-07-08', '2024-07-23', 'PLEASE PRODUSE THE INVOICE FOR WARRANTY. NO WARRANTY FOR CHIP BURNS, PHYSICAL DAMAGE OR CORROSION. Warranty covers only manufacturer s defects. Damage or defect due to other causes such as negligence, misuses, improper operation, power fluctuation, lightening, or other natural disasters, sabotage, or accident etc. (01M) = 30 Days, (03M) = 90 Days, (06M) = 180 Days, (01Y) = 350 Days, (02Y) = 700 Days, (03Y) = 1050 Days, (05Y) = 1750 Days, (10Y) = 3500 Days, (L/W) = Lifetime Warranty. (N/W) = No Warranty).', 'We know the world is full of choices. Thank you for selecting us.', 'We know the world is full of choices. Thank you for selecting us.', 10000, 5, 'ecoteccomputersolutions@gmail.com'),
	(22, '322', 'Summary', '2024-07-08', '2024-07-30', 'PLEASE PRODUSE THE INVOICE FOR WARRANTY. NO WARRANTY FOR CHIP BURNS, PHYSICAL DAMAGE OR CORROSION. Warranty covers only manufacturer s defects. Damage or defect due to other causes such as negligence, misuses, improper operation, power fluctuation, lightening, or other natural disasters, sabotage, or accident etc. (01M) = 30 Days, (03M) = 90 Days, (06M) = 180 Days, (01Y) = 350 Days, (02Y) = 700 Days, (03Y) = 1050 Days, (05Y) = 1750 Days, (10Y) = 3500 Days, (L/W) = Lifetime Warranty. (N/W) = No Warranty).', 'We know the world is full of choices. Thank you for selecting us.', 'We know the world is full of choices. Thank you for selecting us.', 0, 5, 'ecoteccomputersolutions@gmail.com'),
	(23, '323', 'Summ', '2024-07-16', '2024-07-24', 'PLEASE PRODUSE THE INVOICE FOR WARRANTY. NO WARRANTY FOR CHIP BURNS, PHYSICAL DAMAGE OR CORROSION. Warranty covers only manufacturer s defects. Damage or defect due to other causes such as negligence, misuses, improper operation, power fluctuation, lightening, or other natural disasters, sabotage, or accident etc. (01M) = 30 Days, (03M) = 90 Days, (06M) = 180 Days, (01Y) = 350 Days, (02Y) = 700 Days, (03Y) = 1050 Days, (05Y) = 1750 Days, (10Y) = 3500 Days, (L/W) = Lifetime Warranty. (N/W) = No Warranty).', 'We know the world is full of choices. Thank you for selecting us.', 'We know the world is full of choices. Thank you for selecting us.', 20020, 5, 'ecoteccomputersolutions@gmail.com'),
	(24, '324', 'Summary', '2024-07-15', '2024-07-30', 'PLEASE PRODUSE THE INVOICE FOR WARRANTY. NO WARRANTY FOR CHIP BURNS, PHYSICAL DAMAGE OR CORROSION. Warranty covers only manufacturer s defects. Damage or defect due to other causes such as negligence, misuses, improper operation, power fluctuation, lightening, or other natural disasters, sabotage, or accident etc. (01M) = 30 Days, (03M) = 90 Days, (06M) = 180 Days, (01Y) = 350 Days, (02Y) = 700 Days, (03Y) = 1050 Days, (05Y) = 1750 Days, (10Y) = 3500 Days, (L/W) = Lifetime Warranty. (N/W) = No Warranty).', 'We know the world is full of choices. Thank you for selecting us.', 'We know the world is full of choices. Thank you for selecting us.', 0, 5, 'ecoteccomputersolutions@gmail.com'),
	(25, '325', 'Summ', '2024-07-15', '2024-07-23', 'note', 'note', 'add', 3000, 5, 'ecoteccomputersolutions@gmail.com'),
	(26, '326', 'Summ', '2024-07-22', '2024-07-25', 'PLEASE PRODUSE THE INVOICE FOR WARRANTY. NO WARRANTY FOR CHIP BURNS, PHYSICAL DAMAGE OR CORROSION. Warranty covers only manufacturer s defects. Damage or defect due to other causes such as negligence, misuses, improper operation, power fluctuation, lightening, or other natural disasters, sabotage, or accident etc. (01M) = 30 Days, (03M) = 90 Days, (06M) = 180 Days, (01Y) = 350 Days, (02Y) = 700 Days, (03Y) = 1050 Days, (05Y) = 1750 Days, (10Y) = 3500 Days, (L/W) = Lifetime Warranty. (N/W) = No Warranty).', 'We know the world is full of choices. Thank you for selecting us.', 'We know the world is full of choices. Thank you for selecting us.', 12000, 5, 'ecoteccomputersolutions@gmail.com');

-- Dumping structure for table com-system.invoice_item
CREATE TABLE IF NOT EXISTS `invoice_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` text,
  `qty` double DEFAULT NULL,
  `buying_price` double DEFAULT NULL,
  `selling_price` double DEFAULT NULL,
  `tax` double DEFAULT NULL,
  `invoice_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_invoice_item_invoice1_idx` (`invoice_id`),
  CONSTRAINT `fk_invoice_item_invoice1` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table com-system.invoice_item: ~15 rows (approximately)
INSERT INTO `invoice_item` (`id`, `name`, `description`, `qty`, `buying_price`, `selling_price`, `tax`, `invoice_id`) VALUES
	(69, 'ACER EXTENSA 15 I3-12TH GEN LAPTOP (01Y) ', 'ACER EXTENSA 15 I3-12TH GEN LAPTOP (EX215-55-32VT) STEEL GRAY (S/N:NXEGYEM00S3460E0843400) (01Y)', 1, 0, 135000, 0, 12),
	(76, 'GIGABYTE H110 M/B (USED) ', '(03M) GIGABYTE H110 M/B (USED) (S/N:073068) (03M)', 1, 0, 10750, 0, 13),
	(77, 'INTEL PENTIUM G4400 3.30GHz CPU (USED) (03M)', 'INTEL PENTIUM G4400 3.30GHz CPU (USED) (S/N:L535C174) (03M)', 1, 0, 4750, 0, 15),
	(78, 'ACER EXTENSA 15 I3-12TH GEN LAPTOP (01Y) ', 'ACER EXTENSA 15 I3-12TH GEN LAPTOP (EX215-55-32VT) STEEL GRAY (S/N:NXEGYEM00S3460E0843400) (01Y)', 1, 0, 135000, 0, 14),
	(79, 'GIGABYTE H110 M/B (USED) ', '(03M) GIGABYTE H110 M/B (USED) (S/N:073068) (03M)', 1, 0, 10750, 0, 16),
	(80, 'INTEL PENTIUM G4400 3.30GHz CPU (USED) (03M)', 'INTEL PENTIUM G4400 3.30GHz CPU (USED) (S/N:L535C174) (03M)', 1, 0, 4750, 0, 17),
	(86, 'INTEL PENTIUM G4400 3.30GHz CPU (USED) (03M)', 'INTEL PENTIUM G4400 3.30GHz CPU (USED) (S/N:L535C174) (03M)', 1, 0, 4750, 0, 21),
	(87, 'LG A236 H61 REV.3.1 M/B (USED) (03M)', 'LG A236 H61 REV.3.1 M/B (USED) (S/N:073186) (03M)', 1, 0, 6900, 0, 21),
	(89, 'BOE (NT156WHM-N42) 15.6 30 PIN SLIM LAPTOP DISPLAY (06M)', 'BOE (NT156WHM-N42) 15.6 30 PIN SLIM LAPTOP DISPLAY (S/N:047411) (06M)', 1, 0, 17500, 0, 23),
	(90, 'ACER EXTENSA 15 I3-12TH GEN LAPTOP (01Y) ', 'ACER EXTENSA 15 I3-12TH GEN LAPTOP (EX215-55-32VT) STEEL GRAY (S/N:NXEGYEM00S3460E0843400) (01Y)', 1, 0, 135000, 0, 24),
	(91, 'PRINTER FULL SERVICE (PASSBOOK DOT MATRIX) (N/W)', 'EPSON PLQ-35 Printer unit disassembly, Exterior & interior deep cleaning. (N/W)', 1, 0, 2500, 0, 25),
	(92, 'TRANSCEND 8GB 2666MHz DDR4 NOTEBOOK MEMORY (05Y) ', 'TRANSCEND 8GB 2666MHz DDR4 NOTEBOOK MEMORY (S/N:I128661318) (05Y)', 1, 0, 9500, 0, 26),
	(93, 'POWER CABLE WITH FUSED 1.2M (DESKTOP) (N/W)', 'POWER CABLE WITH FUSED 1.2M (DESKTOP) (N/W) ', 3, 0, 650, 0, 26),
	(99, 'POWER CABLE WITH FUSED 1.2M (LAPTOP) (N/W)', 'POWER CABLE WITH FUSED 1.2M (LAPTOP) (N/W)', 1, 0, 650, 0, 22),
	(109, 'ASUS ROG-STRIX-750G 750W GAMING POWER SUPPLY (05Y)', 'ASUS ROG-STRIX-750G 750W GAMING POWER SUPPLY (S/N:N8YEKG00207826C) (05Y) The ROG Strix 750W Gold PSU brings premium cooling performance to the mainstream.ROG heatsinks cover critical components. Lower temps result in a longer lifespan and reduced noise.Axial-tech fan design features a smaller fan hub that facilitates longer blades and a barrier ring that increases downward air pressure.Dual ball fan bearings can last up to twice as long as sleeve bearing designs.0dB Technology lets you enjoy light gaming in relative silence.An 80 Plus Gold Certification is the result of Japanese capacitors and other premium components.Cosmetic customization is enabled by a magnetic logo and stickers that help you reskin the visible side to your liking.Fully modular cables keep your rig neat and tidy.', 1, 0, 38000, 0, 11);

-- Dumping structure for table com-system.job_note
CREATE TABLE IF NOT EXISTS `job_note` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_note_id` varchar(50) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `subhead` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `notes` text,
  `paid_amount` double DEFAULT NULL,
  `customer_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_invoice_customer1_idx` (`customer_id`),
  CONSTRAINT `fk_invoice_customer100` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table com-system.job_note: ~0 rows (approximately)

-- Dumping structure for table com-system.job_note_item
CREATE TABLE IF NOT EXISTS `job_note_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` text,
  `qty` double DEFAULT NULL,
  `buying_price` double DEFAULT NULL,
  `selling_price` double DEFAULT NULL,
  `tax` double DEFAULT NULL,
  `job_note_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_job_note_item_job_note1_idx` (`job_note_id`),
  CONSTRAINT `fk_job_note_item_job_note1` FOREIGN KEY (`job_note_id`) REFERENCES `job_note` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table com-system.job_note_item: ~0 rows (approximately)

-- Dumping structure for table com-system.job_order
CREATE TABLE IF NOT EXISTS `job_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_order_id` varchar(50) DEFAULT NULL,
  `summary` text,
  `date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `notes` text,
  `instruction` text,
  `footer` text,
  `paid_amount` double DEFAULT NULL,
  `customer_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_invoice_customer1_idx` (`customer_id`),
  CONSTRAINT `fk_invoice_customer11` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table com-system.job_order: ~0 rows (approximately)

-- Dumping structure for table com-system.job_order_item
CREATE TABLE IF NOT EXISTS `job_order_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` text,
  `qty` double DEFAULT NULL,
  `buying_price` double DEFAULT NULL,
  `selling_price` double DEFAULT NULL,
  `tax` double DEFAULT NULL,
  `job_order_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_job_order_item_job_order1_idx` (`job_order_id`),
  CONSTRAINT `fk_job_order_item_job_order1` FOREIGN KEY (`job_order_id`) REFERENCES `job_order` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table com-system.job_order_item: ~0 rows (approximately)

-- Dumping structure for table com-system.notification
CREATE TABLE IF NOT EXISTS `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject` varchar(100) DEFAULT NULL,
  `message` text,
  `user_email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_notification_user1_idx` (`user_email`),
  CONSTRAINT `fk_notification_user1` FOREIGN KEY (`user_email`) REFERENCES `user` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table com-system.notification: ~0 rows (approximately)

-- Dumping structure for table com-system.product
CREATE TABLE IF NOT EXISTS `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` text,
  `selling_price` double DEFAULT NULL,
  `buying_price` double DEFAULT NULL,
  `user_email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_user_idx` (`user_email`),
  CONSTRAINT `fk_product_user` FOREIGN KEY (`user_email`) REFERENCES `user` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=196 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table com-system.product: ~195 rows (approximately)
INSERT INTO `product` (`id`, `name`, `description`, `selling_price`, `buying_price`, `user_email`) VALUES
	(1, 'INTEL PENTIUM G4400 3.30GHz CPU (USED) (03M)', 'INTEL PENTIUM G4400 3.30GHz CPU (USED) (S/N:L535C174) (03M)', 4750, 0, 'ecoteccomputersolutions@gmail.com'),
	(2, 'GIGABYTE H110 M/B (USED) ', '(03M) GIGABYTE H110 M/B (USED) (S/N:073068) (03M)', 10750, 0, 'ecoteccomputersolutions@gmail.com'),
	(3, 'ACER EXTENSA 15 I3-12TH GEN LAPTOP (01Y) ', 'ACER EXTENSA 15 I3-12TH GEN LAPTOP (EX215-55-32VT) STEEL GRAY (S/N:NXEGYEM00S3460E0843400) (01Y)', 135000, 0, 'ecoteccomputersolutions@gmail.com'),
	(4, 'LG A236 H61 REV.3.1 M/B (USED) (03M)', 'LG A236 H61 REV.3.1 M/B (USED) (S/N:073186) (03M)', 6900, 0, 'ecoteccomputersolutions@gmail.com'),
	(5, 'HAVIT HV-H204D HEADPHONE (03M)', 'HAVIT HV-H204D HEADPHONE (S/N:) (03M)', 850, 0, 'ecoteccomputersolutions@gmail.com'),
	(6, 'TRANSCEND 8GB 2666MHz DDR4 NOTEBOOK MEMORY (05Y) ', 'TRANSCEND 8GB 2666MHz DDR4 NOTEBOOK MEMORY (S/N:I128661318) (05Y)', 9500, 0, 'ecoteccomputersolutions@gmail.com'),
	(7, 'ENCLOSURE 9.5MM HDD CADDY (SLIM) (N/W) ', 'Aluminum Opti bay 2nd HDD Caddy 9.5mm SATA 3.0 Enclosure For 2.5â€ SSD DVD CD-ROW To HDD Case Hard Disk Driver Adapter (N/W)', 1000, 0, 'ecoteccomputersolutions@gmail.com'),
	(8, 'NETAC SA500 120GB SATA III SSD (03Y)', 'NETAC SA500 120GB 2.5" SATA III SSD (S/N.W8YF016391T) (03Y)', 5750, 0, 'ecoteccomputersolutions@gmail.com'),
	(9, 'PRINTER FULL SERVICE (PASSBOOK DOT MATRIX) (N/W)', 'EPSON PLQ-35 Printer unit disassembly, Exterior & interior deep cleaning. (N/W)', 2500, 0, 'ecoteccomputersolutions@gmail.com'),
	(10, 'PRINTER FULL SERVICE (DOT MATRIX) (N/W)', 'EPSON LQ 310 Printer unit disassembly, Exterior & interior deep cleaning. (N/W)', 2500, 0, 'ecoteccomputersolutions@gmail.com'),
	(11, 'HP PROBOOK 450 G3 LAPTOP (USED) (03M)', 'HP PROBOOK 450 G3 I5-6TH GEN LAPTOP (S/N:JPH819BX1R) (USED) (03M)', 70000, 0, 'ecoteccomputersolutions@gmail.com'),
	(12, 'POWER CABLE WITH FUSED 1.2M (DESKTOP) (N/W)', 'POWER CABLE WITH FUSED 1.2M (DESKTOP) (N/W) ', 650, 0, 'ecoteccomputersolutions@gmail.com'),
	(13, 'POWER CABLE WITH FUSED 1.2M (LAPTOP) (N/W)', 'POWER CABLE WITH FUSED 1.2M (LAPTOP) (N/W)', 650, 0, 'ecoteccomputersolutions@gmail.com'),
	(14, 'LB-LINK (BL-WN151) WIFI ADAPTER (03M) ', 'LB-LINK (BL-WN151) 150Mbps Nano Wireless N USB Adapter (S/N:020192) (03M)', 1250, 0, 'ecoteccomputersolutions@gmail.com'),
	(15, 'BOE (NT156WHM-N42) 15.6 30 PIN SLIM LAPTOP DISPLAY (06M)', 'BOE (NT156WHM-N42) 15.6 30 PIN SLIM LAPTOP DISPLAY (S/N:047411) (06M)', 17500, 0, 'ecoteccomputersolutions@gmail.com'),
	(16, 'VIEWTECH 450W POWER SUPPLY (BRAND NEW) (01Y)', 'VIEWTECH 450W POWER SUPPLY (BRAND NEW) (S/N:044601) (01Y)', 6500, 0, 'ecoteccomputersolutions@gmail.com'),
	(17, 'DELL 3542 LAPTOP KEYBOARD (ORIGINAL) (06M)', 'DELL 3542 LAPTOP KEYBOARD (ORIGINAL) (S/N:014772) (06M)', 3500, 0, 'ecoteccomputersolutions@gmail.com'),
	(18, 'BOE (NT156WHM-N10) 15.6 40 PIN SLIM LAPTOP DISPLAY (06M)', 'BOE (NT156WHM-N10) 15.6 40 PIN SLIM LAPTOP DISPLAY (S/N:047379) (06M)', 17500, 0, 'ecoteccomputersolutions@gmail.com'),
	(19, 'H81 PEGATRON M/B (03M)', 'H81 PEGATRON M/B (S/N:163187) (03M)', 8000, 0, 'ecoteccomputersolutions@gmail.com'),
	(20, 'LEOCH (WHITE) 7A 12V UPS BATTERY (01Y)', 'LEOCH (WHITE) 7A 12V UPS BATTERY (S/N:164036/164037) (01Y)', 4750, 0, 'ecoteccomputersolutions@gmail.com'),
	(21, 'Air Conditioner Motor Run Capacitor Oil Condenser-45UF (N/W)', 'Air Conditioner Motor Run Capacitor Oil Condenser-45UF (S/N:TSK3322) (N/W)', 4028.86, 0, 'ecoteccomputersolutions@gmail.com'),
	(22, '405A BLACK 5B8C CASH DRAWER (01Y)', '405A BLACK 5B8C CASH DRAWER (S/N:20230818064) (01Y)', 16500, 0, 'ecoteccomputersolutions@gmail.com'),
	(23, 'XPRINTER XP-Q838L THERMAL RECEIPT PRINTER (01Y)', 'XPRINTER XP-Q838L THERMAL RECEIPT PRINTER (S/N:XPQ838L-BU2306060097) (01Y)', 21500, 0, 'ecoteccomputersolutions@gmail.com'),
	(24, 'ZONERICH ZQ-LS6000 II 1D HANDHELD BARCODE SCANNER (01Y)', 'ZONERICH ZQ-LS6000 II 1D HANDHELD BARCODE SCANNER (S/N:210500009) (01Y)', 17000, 0, 'ecoteccomputersolutions@gmail.com'),
	(25, 'DDR3 4GB (1600MHz) LAPTOP RAM (USED) (03M)', 'KINGSTON DDR3 4GB (1600MHz) LAPTOP RAM (USED) (S/N:ETBS151256FWY) (03M)', 2500, 0, 'ecoteccomputersolutions@gmail.com'),
	(26, 'HP K104 LAPTOP BATTERY (BRAND NEW) (06M)', 'HP K104 Replacement 14.8V 2600mAh Laptop Battery (S/N:12361882) (06M)', 8500, 0, 'ecoteccomputersolutions@gmail.com'),
	(27, 'LAPTOP POWER CABLE 1.5M FUSE BLACK (NORMAL) (N/W)', 'LAPTOP POWER CABLE 1.5M FUSE BLACK (NORMAL) (N/W)', 650, 0, 'ecoteccomputersolutions@gmail.com'),
	(28, '1WAY POLYCROME SUN BOX (N/W)', '1WAY POLYCROME MP015 (N/W)', 200, 0, 'ecoteccomputersolutions@gmail.com'),
	(29, 'DAHUA DH-PFM920i-6UN-C CAT6 NETWORK CABLE (PRICE PER METER) (N/W)', 'UTP CAT6, power over Ethernet, compatible with one cable High-purity Oxygen-Free Copper conductor material. Customized PVC outer sheath; meet CE CPR ECA flame retardant class certified. (N/W)', 250, 0, 'ecoteccomputersolutions@gmail.com'),
	(30, 'POLYCHROME PVC CABLE TRUNKING (2" CASING) (N/W)', 'POLYCHROME PVC CABLE TRUNKING FOR ELECTRICAL INSTALLATION (2" CASING) (N/W)', 1750, 0, 'ecoteccomputersolutions@gmail.com'),
	(31, 'POLYCHROME PVC CABLE TRUNKING (1" CASING) (N/W)', 'POLYCHROME PVC CABLE TRUNKING FOR ELECTRICAL INSTALLATION (1" CASING) (N/W)', 750, 0, 'ecoteccomputersolutions@gmail.com'),
	(32, 'INSTALLATION & SERVICE CHARGES (N/W)', 'INSTALLATION & SERVICE CHARGES (PER UNIT) (N/W)', 3000, 0, 'ecoteccomputersolutions@gmail.com'),
	(33, 'LANSAN CAT6 RUBBER BOOT (LH6-001) CONNECTOR (N/W)', 'Plug Protective Cover RJ45 Cap Boots RJ45 PVC Rubber Boots. (N/W)', 200, 0, 'ecoteccomputersolutions@gmail.com'),
	(34, 'MATERIALS CHARGES (N/W)', 'Cost of remaining materials required. (N/W)', 15000, 0, 'ecoteccomputersolutions@gmail.com'),
	(35, 'ORANGE UTP CAT6 23AWG BLUE (ONDC-U60004-BL) (N/W)', 'ORANGE UTP CAT6 23AWG BLUE (ONDC-U60004-BL) NETWORK CABLE (PRICE PER METER) (N/W)', 300, 0, 'ecoteccomputersolutions@gmail.com'),
	(36, 'DAHUA DH-PFM971-1 1 PORT FACE PLATE (N/W)', 'The good sealing performance of flexible dust cover, effectively prevents dust and other pollutants in, The combustion performance meets the GB/T 5169.7-1985 standard. (N/W)', 600, 0, 'ecoteccomputersolutions@gmail.com'),
	(37, 'DAHUA DH-PFM970-6U CAT6 KEYSTONE CONNECTOR (N/W)', 'Support 100MHz bandwidth and meet the TIA/EIA-568-C requirements, Support T568A and T568B wiring with color coded 110 blocks, Support 110 or Krone dual type termination, PCB made of FR-4 A1. (N/W)', 650, 0, 'ecoteccomputersolutions@gmail.com'),
	(38, 'TP-LINK TL-SF1016D 16 PORT 10/100M DESKTOP SWITCH (02Y)', '16 10/100Mbps Auto-Negotiation RJ45 ports, Supports Auto MDI / MDIX, Green Ethernet technology saves the power up to 80% IEEE 802.3x flow control provides reliable data transfer Plastic case, desktop or wall-mounting design, Plug and play, no configuration required. (02Y)', 16500, 0, 'ecoteccomputersolutions@gmail.com'),
	(39, 'TP-LINK TL-SF1016DS 16 PORT 10/100M RACK MOUNT SWITCH (02Y)', '16 10/100M RJ45 ports, Innovative energy-efficient technology saves power up to 75% Supports MAC address self-learning and auto MDI/MDIX, Standard 13-inch steel case. (02Y)', 18500, 0, 'ecoteccomputersolutions@gmail.com'),
	(40, 'TP-LINK TL-SF1016DS 16 PORT 10/100M RACK MOUNT SWITCH (02Y)', '16-Port 10/100Mbps Desktop/Rackmount Switch, 16 10/100M RJ45 ports, Innovative energy-efficient technology saves power up to 75%, Supports MAC address self-learning and auto MDI/MDIX, Standard 13-inch steel case. (02Y)', 17900, 0, 'ecoteccomputersolutions@gmail.com'),
	(41, 'ORANGE MCB ALPHA 1 POLE 6A CIRCUIT BREAKER (05Y) MCB ALPHA 1 POLE 6A ORANGE 213-2306 (470-1002) CIRC', 'MCB ALPHA 1 POLE 6A ORANGE 213-2306 (470-1002) CIRCUIT BREAKER (05Y)', 900, 0, 'ecoteccomputersolutions@gmail.com'),
	(42, 'KELANI 1.044 CABLE (PRICE PER METER) (N/W)', 'KELANI 1.044 CABLE (PRICE PER METER) (N/W)', 80, 0, 'ecoteccomputersolutions@gmail.com'),
	(43, 'ORANGE GREEN EARTH CABLE (PRICE PER METER) (N/W)', 'ORANGE 7/0.53 GREEN EARTH CABLE (PRICE PER METER) (N/W)', 250, 0, 'ecoteccomputersolutions@gmail.com'),
	(44, '3WAY POLYCROME SUN BOX (N/W)', '3WAY POLYCROME MP088 (N/W)', 650, 0, 'ecoteccomputersolutions@gmail.com'),
	(45, 'ORANGE 13A SINGLE SWITCHED SOCKET OUTLET (05Y)', 'Brand: Orange, Type: Orange X5 13A Switched Socket Outlet, Color: White, Indoor use, Whatâ€™s in the box: Orange X5 13A Switched Socket Outlet, Screws, Screw-Hole Lids. (05Y)', 950, 0, 'ecoteccomputersolutions@gmail.com'),
	(46, 'JEDEL GM-850 WIRED MOUSE (03M)', 'JEDEL GM-850 WIRED MOUSE (S/N:) (03M)', 1250, 0, 'ecoteccomputersolutions@gmail.com'),
	(47, 'GAMEMAX GMX-RF12-X 120MM COOLER FAN (N/W)', 'GAMEMAX GMX-RF12-X 120MM COOLER FAN (S/N:) (N/W)', 1500, 0, 'ecoteccomputersolutions@gmail.com'),
	(48, 'JEDEL CK4 USB 2.0 SPEAKER (03M)', 'JEDEL CK4 USB 2.0 SPEAKER (S/N:) (03M)', 950, 0, 'ecoteccomputersolutions@gmail.com'),
	(49, 'JEDEL M-600 USB 2.0 SPEAKER (03M)', 'JEDEL M-600 USB 2.0 SPEAKER (S/N:) (03M)', 1500, 0, 'ecoteccomputersolutions@gmail.com'),
	(50, 'JEDEL K-504 GAMING WIRED KEYBOARD (03M)', 'JEDEL K-504 GAMING WIRED KEYBOARD (S/N:) (03M)', 2900, 0, 'ecoteccomputersolutions@gmail.com'),
	(51, 'JEDEL M-66 RGB WIRED MOUSE (03M)', 'JEDEL M-66 RGB WIRED MOUSE (S/N:) (03M)', 1500, 0, 'ecoteccomputersolutions@gmail.com'),
	(52, 'JEDEL W920 2.4GHz WIRELESS MOUSE (03M)', 'JEDEL W920 2.4GHz WIRELESS MOUSE (S/N:) (03M)', 1500, 0, 'ecoteccomputersolutions@gmail.com'),
	(53, 'HAVIT HV-SK599 2.0 USB SPEAKER (03M)', 'HAVIT HV-SK599 2.0 USB SPEAKER (S/N:) (03M)', 2500, 0, 'ecoteccomputersolutions@gmail.com'),
	(54, 'HAVIT HV-SK486 SPEAKER (03M)', 'HAVIT HV-SK486 2.0 USB SPEAKER (S/N:) (03M)', 1500, 0, 'ecoteccomputersolutions@gmail.com'),
	(55, 'HAVIT MS1026 GAMING WIRED MOUSE (03M)', 'HAVIT MS1026 GAMING WIRED MOUSE (S/N:) (03M)', 1950, 0, 'ecoteccomputersolutions@gmail.com'),
	(56, 'HAVIT HV-MS1006 GAMING WIRED MOUSE (03M)', 'HAVIT HV-MS1006 GAMING WIRED MOUSE (S/N:) (03M)', 2750, 0, 'ecoteccomputersolutions@gmail.com'),
	(57, 'HAVIT HV-MS749 GAMING WIRED MOUSE (03M)', 'HAVIT HV-MS749 GAMING WIRED MOUSE (S/N:) (03M)', 2250, 0, 'ecoteccomputersolutions@gmail.com'),
	(58, 'HAVIT HV-KB866L GAMING WIRED KEYBOARD (03M)', 'HAVIT HV-KB866L GAMING WIRED KEYBOARD (S/N:) (03M)', 2950, 0, 'ecoteccomputersolutions@gmail.com'),
	(59, 'HAVIT HV-H2178D HEADPHONE (03M)', 'HAVIT HV-H2178D HEADPHONE (S/N:) (03M)', 2500, 0, 'ecoteccomputersolutions@gmail.com'),
	(60, 'HAVIT HV-H202D HEADPHONE (03M)', 'HAVIT HV-H202D HEADPHONE (S/N:) (03M)', 1450, 0, 'ecoteccomputersolutions@gmail.com'),
	(61, 'HAVIT HV-EP48P EARPHONE (03M)', 'HAVIT HV-EP48P EARPHONE (S/N:) (03M)', 1500, 0, 'ecoteccomputersolutions@gmail.com'),
	(62, 'HAVIT HV-CB66 3.5MM 1M AUDIO CABLE (03M)', 'HAVIT HV-CB66 3.5MM 1M AUDIO CABLE (S/N:) (03M)', 900, 0, 'ecoteccomputersolutions@gmail.com'),
	(63, 'MICROPACK K-203 WIRED KEYBOARD (06M)', 'MICROPACK K-203 WIRED KEYBOARD (S/N:) (06M)', 2500, 0, 'ecoteccomputersolutions@gmail.com'),
	(64, 'MICROPACK M101 WIRED MOUSE (06M)', 'MICROPACK M101 WIRED MOUSE (S/N:) (06M)', 1900, 0, 'ecoteccomputersolutions@gmail.com'),
	(65, 'MICROPACK M100 WIRED MOUSE (06M)', 'MICROPACK M100 WIRED MOUSE (S/N:) (06M)', 1750, 0, 'ecoteccomputersolutions@gmail.com'),
	(66, 'MICROPACK GM-01 RGB GAMING MOUSE (06M)', 'MICROPACK GM-01 RGB GAMING MOUSE (S/N:) (06M)', 2250, 0, 'ecoteccomputersolutions@gmail.com'),
	(67, 'THERMALTAKE LITEPOWER 450W POWER SUPPLY (02Y)', 'THERMALTAKE LITEPOWER 450W POWER SUPPLY (S/N:PSLTP0450NNSAND1SG000129) (02Y)', 11900, 0, 'ecoteccomputersolutions@gmail.com'),
	(68, 'MSI PRO H610M-E (DDR4) MOTHERBOARD (03Y)', 'MSI PRO H610M-E (DDR4) MOTHERBOARD (S/N:047C16B6E279) (03Y)', 36500, 0, 'ecoteccomputersolutions@gmail.com'),
	(69, 'RAMSTA DDR4 (PC4-25600) 8GB 3200MHZ RAM (03Y)', 'RAMSTA DDR4 (PC4-25600) 8GB 3200MHZ RAM (S/N:RRS3210641C00013/RRS3210641C00017) (03Y)', 7500, 0, 'ecoteccomputersolutions@gmail.com'),
	(70, 'RAMSTA R900 512GB M.2 NVME SSD (03Y)', 'RAMSTA R900 512GB M.2 NVME SSD (S/N:RLR360501SA00191) (03Y)', 9500, 0, 'ecoteccomputersolutions@gmail.com'),
	(71, 'HP ELITEDISPLAY E222 IPS 22\' LED MONITOR (USED) (03M)', 'HP ELITEDISPLAY E222 IPS 22\' LED MONITOR (USED) (S/N:6CM6370ZV1) (03M)', 21500, 0, 'ecoteccomputersolutions@gmail.com'),
	(72, 'RAMSTA S800 128GB SATA SSD (03Y)', 'RAMSTA S800 128GB SATA SSD (S/N:) (03Y)', 4500, 0, 'ecoteccomputersolutions@gmail.com'),
	(73, 'INTEL i3-12100 LGA1700 PROCESSOR (03Y)', 'INTEL CORE i3-12100 LGA1700 12TH GENERATION PROCESSOR (S/N:U235G1W700001) (03Y)', 38000, 0, 'ecoteccomputersolutions@gmail.com'),
	(74, 'HAVIT KB2006 WIRED KEYBOARD (03M)', 'HAVIT KB2006 WIRED KEYBOARD (S/N:) (03M)', 1800, 0, 'ecoteccomputersolutions@gmail.com'),
	(75, 'HAVIT MS626GT WIRELESS MOUSE (03M)', 'HAVIT MS626GT 2.4GHz WIRELESS MOUSE (S/N:) (03M)', 2500, 0, 'ecoteccomputersolutions@gmail.com'),
	(76, 'DDR2 1GB DESKTOP RAM (USED) (03M)', 'SAMSUNG DDR2 1GB DESKTOP RAM (6400U) (S/N:908591/908592) (03M)', 750, 0, 'ecoteccomputersolutions@gmail.com'),
	(77, 'INTEL G31 M/B (DDR2) (USED) (03M)', 'INTEL G31 MOTHERBOARD (DDR2) (S/N.908588) (USED) (03M)', 3500, 0, 'ecoteccomputersolutions@gmail.com'),
	(78, 'MICROLAB M280BT 2.1 SUBWOOFER (06M)', 'MICROLAB M280BT 2.1 SUBWOOFER (S/N:WJAAM04326) (06M)', 15000, 0, 'ecoteccomputersolutions@gmail.com'),
	(79, '15.6 30PIN SLIM FULL HD IPS DISPLAY (06M)', '15.6 30PIN SLIM FULL HD IPS LAPTOP DISPLAY (S/N:023508) (06M)', 18500, 0, 'ecoteccomputersolutions@gmail.com'),
	(80, 'LENOVO D22E-20 21.45\' FHD MONITOR (03Y)', 'MODEL NO : D21215FD0, CONTRAST RATIO : 3000:1, BRIGHTNESS : 250 cd/ãŽ¡, HEIGHT : 36.7 cm, STANDARD FUNCTIONS Tilt Angle : (-5Â° / 22Â°), PANEL TYPE : Vertical Alignment, RESOLUTION : 1920 x 1080, ASPECT RATIO : 16:9, RESPONSE TIME : (TYPICAL GTG) 4ms (Extreme mode) / 6ms (Typical mode), VIEWING ANGLES : 178 / 178 degrees (03Y)', 39900, 0, 'ecoteccomputersolutions@gmail.com'),
	(81, 'VIEWSONIC VA1903H 19\' LED MONITOR (03Y)', 'Product Code : MONVIE0001, Display Size (in.): 19, Viewable Area (in.): 18.5, Panel Type: TN Technology, Resolution: 1366 x 768, Resolution Type: WXGA, Static Contrast Ratio: 600:1 (typ), Dynamic Contrast Ratio: 50M:1, Brightness: 200 cd/m2 (typ), Aspect Ratio: 16:9, Viewing Angles: 90Âº horizontal, 65Âº vertical, Refresh Rate (Hz): 60, PC Resolution (max): 1366x768, PC Operating System: Windows 10 certified; macOS tested, VGA: 1, 3.5mm Audio Out: 1, HDMI 1.4: 1, Power in: 3-pin Socket (IEC C14 / CEE22), Approximate Weight : 3.20kg (03Y)', 34900, 0, 'ecoteccomputersolutions@gmail.com'),
	(82, 'PSU 400W (80+ Bronze) (USED) (03M)', 'ADVANTECH 400W (80+ Bronze) POWER SUPPLY (S/N:148437) (03M)', 2750, 0, 'ecoteccomputersolutions@gmail.com'),
	(83, 'INSTALLING WINDOWS 8.1 (N/W)', 'Installing Microsoft Windows 8.1 Operating System & Drivers, Applications Software. Setting up basic operating system settings and installing essential software and drivers. (S/N:) (N/W)', 1000, 0, 'ecoteccomputersolutions@gmail.com'),
	(84, '500GB LAPTOP HDD (USED) (03M)', 'WD Blue WD5000LPVX 500GB LAPTOP HDD (USED) (S/N:WX11A45ACE5K) (03M)', 3900, 0, 'ecoteccomputersolutions@gmail.com'),
	(85, '250GB HDD (USED) (03M)', '250GB SATA HDD (S/N:6VMF841H) (03M)', 2250, 0, 'ecoteccomputersolutions@gmail.com'),
	(86, 'MSI PRO MP223 FHD 21.45\' BUSINESS MONITOR (03Y)', 'PANEL SIZE : 21.45", PANEL RESOLUTION : 1920 x 1080 (Full HD), PANEL TYPE : VA, VIEWING ANGLE : 178Â°(H) / 178Â°(V), ASPECT RATIO : 16:9, REFRESH RATE : 100Hz, RESPONSE TIME : 1ms (MPRT) / 4ms (GTG), VIDEO PORTS : 1x HDMI (1.4b), 1x D-Sub (VGA), AUDIO PORTS : 1x Headphone-out, POWER TYPE : External Adaptor 30W, SRGB : 99% (CIE 1976), SURFACE TREATMENT : Anti-glare, ADJUSTMENT (TILT) : -5Â° ~ 20Â°, DISPLAY COLORS : 16.7M, COLOR BIT : 8 bits, BRIGHTNESS (NITS) : 250 cd/m2, POWER TYPE : External Adaptor 30W, POWER INPUT : 100~240V, 50~60Hz, WEIGHT (NW / GW) : 2.40 kg ( 5.29lbs) / 3.46 kg ( 7.63lbs) (03Y)', 42500, 0, 'ecoteccomputersolutions@gmail.com'),
	(87, 'ACER K202HQL 19.5\' MONITOR (03Y)', 'Size : 19.5", Panel Type : TN LCD, Resolution : 1366 x 768, Aspect Ratio : 16:9, Pixels Per Inch : 80ppi, Maximum Brightness : 200 cd/m2, Dynamic Contrast Ratio : 100,000,000:1, Bit Depth / Color Support : 6-Bit+FRC (16.7 Million Colors), Response Time : 5ms, Inputs / Outputs, Inputs/Outputs : 1 x VGA, Power Consumption : 11 W (Typical), Tilt Adjustment : -5 to 25Â°, Mounting-Hole Pattern : 100 x 100 mm, Dimensions : (W x H x D) 18.2 x 14.3 x 7.5" / 462.3 x 363.2, Package Weight : 7.53lb, Box Dimensions : (LxWxH) 20.1 x 14.6 x 4.2", (03Y)', 46500, 0, 'ecoteccomputersolutions@gmail.com'),
	(88, 'SAMSUNG S19A330NHE 19\' MONITOR (03Y)', 'Model No : LS19A330NHWXXL, Display Size : 19â€³, Monitor Resolution : 768x1366, Display Ports : VGA | HDMI, With Wall Mount : Yes, Approximate Weight : 2.00 kg (03Y)', 35900, 0, 'ecoteccomputersolutions@gmail.com'),
	(89, 'HARDWARE TROUBLESHOOTING & SERVICE CHARGE (N/W)', 'Computer Hardware Troubleshooting and Service Charge. (S/N:651591) (N/W)', 1000, 0, 'ecoteccomputersolutions@gmail.com'),
	(90, 'PSU 400W (80+BRONZE) (USED) (03M)', ' ADVANTECH POWER SUPPLY 400W (80+BRONZE) (S/N:148437) (03M)', 2900, 0, 'ecoteccomputersolutions@gmail.com'),
	(91, 'PSU 600W (8PIN) (USED) (03M)', 'POWEREX POWER SUPPLY 600W (08PIN) (S/N:148442) (03M)', 3900, 0, 'ecoteccomputersolutions@gmail.com'),
	(92, 'AK 12V 7AH UPS BATTERY (01Y)', 'AK 12V 7AH RECHARGEABLE UPS BATTERY (S/N:) (01Y)', 5950, 0, 'ecoteccomputersolutions@gmail.com'),
	(93, 'WD ELEMENTS 2.5" ENCLOSURE USB 3.0 (ORIGINAL) (03M)', 'WD ELEMENTS 2.5" ENCLOSURE USB 3.0 (ORIGINAL) (S/N:) (03M)', 3500, 0, 'ecoteccomputersolutions@gmail.com'),
	(94, 'MOSTCN 12V SWITCHING ADAPTER (03M)', 'MOSTCN 12V SWITCHING ADAPTER (S/N:) (03M)', 2500, 0, 'ecoteccomputersolutions@gmail.com'),
	(95, 'UNIVERSAL NOTEBOOK POWER ADAPTER (03M)', 'UNIVERSAL NOTEBOOK POWER ADAPTER (S/N:) (03M)', 2900, 0, 'ecoteccomputersolutions@gmail.com'),
	(96, 'SAMSUNG 20" LCD MONITOR (USED) (03M)', 'SAMSUNG SYNC MASTER MAGIC CX2043BW 20" WIDE LCD MONITOR (S/N:148063) (03M)', 14500, 0, 'ecoteccomputersolutions@gmail.com'),
	(97, 'INTEL CORE 2 QUAD (Q8200) SYSTEM UNIT (USED) (03M)', 'INTEL CORE 2 QUAD (Q8200) SYSTEM UNIT (USED) (S/N:148913) (03M)', 16000, 0, 'ecoteccomputersolutions@gmail.com'),
	(98, 'DVI CABLE 1.5M (USED) (N/W)', 'DVI CABLE 1.5M (USED) (S/N.) (N/W)', 900, 0, 'ecoteccomputersolutions@gmail.com'),
	(99, 'ARMAGGEDDON NIMITZ N5 AURORA CASING (N/W)', 'ARMAGGEDDON NIMITZ N5 AURORA GAMING CASING (S/N.170401) (N/W)', 10900, 0, 'ecoteccomputersolutions@gmail.com'),
	(100, 'KINGSTON 64GB MICRO SD CARD (02Y)', 'KINGSTON CANVAS SELECT PLUS 64GB 100MB/s MICRO SD CARD (S/N.) (02Y)', 2900, 0, 'ecoteccomputersolutions@gmail.com'),
	(101, 'KINGSTON 32GB MICRO SD CARD (02Y)', 'KINGSTON CANVAS SELECT PLUS 32GB 100MB/s MICRO SD CARD (S/N.) (02Y)', 2250, 0, 'ecoteccomputersolutions@gmail.com'),
	(102, 'BINGJU BJ120 ARGB 120MM FAN (N/W)', 'BINGJU BJ120 ARGB 120MM COOLING FAN (S/N.) (N/W)', 1500, 0, 'ecoteccomputersolutions@gmail.com'),
	(103, 'DDR3 4GB 1600MHz RAM (USED) (03M)', 'DDR3 4GB 1600MHz RAM (S/N;153853) (03M)', 2750, 0, 'ecoteccomputersolutions@gmail.com'),
	(104, 'INTEL LGA 775 / 1155 CPU COOLER (BRAND NEW) (N/W)', ' INTEL LGA 775 / 1155 CPU COOLER (S/N:BA31-00023B) (N/W)', 1500, 0, 'ecoteccomputersolutions@gmail.com'),
	(105, 'MEMORYGHOST ON900 128GB M.2 NVME (03Y)', 'MEMORYGHOST ON900 128GB M.2 NVME PCIE GEN3*4 SSD (S/N.MG45082314000307) (03Y)', 8500, 0, 'ecoteccomputersolutions@gmail.com'),
	(106, 'MEMORYGHOST SSD-001 256GB (03Y)', 'MEMORYGHOST SSD-001 256GB 2.5" SATA III SSD (S/N.MG11102319000823) (03Y)', 6900, 0, 'ecoteccomputersolutions@gmail.com'),
	(107, 'INTEL H81 M/B (USED) (03M)', 'INTEL H81 MOTHERBOARD (USED) (S/N.) (03M)', 9500, 0, 'ecoteccomputersolutions@gmail.com'),
	(108, 'PSU 350W (USED) (03M)', 'SAMSUNG PSD-350DHG7 350W Power Supply (S/N:N0959) (03M)', 2500, 0, 'ecoteccomputersolutions@gmail.com'),
	(109, 'INTEL G43M01S1 M/B (D2) (USED) (03M)', 'INTEL G43M01S1 MOTHERBOARD (DDR2) (S/N.153866) (03M)', 4500, 0, 'ecoteccomputersolutions@gmail.com'),
	(110, 'HP 15S-DU LAPTOP CPU COOLER FAN (BRAND NEW) (N/W)', 'HP 15S-DU LAPTOP CPU COOLER FAN (S/N:SPS-L52034-001) (N/W)', 4800, 0, 'ecoteccomputersolutions@gmail.com'),
	(111, 'SAMSUNG 19" WIDE LCD MONITOR (USED) (03M)', 'SAMSUNG SyncMaster 932BWE Plus 19" Wide LCD Monitor (S/N:143836) (03M)', 15500, 0, 'ecoteccomputersolutions@gmail.com'),
	(112, 'INTEL CORE 2 QUAD (Q8400) CPU (USED) (01M)', 'INTEL CORE 2 QUAD (Q8400) CPU (01M)', 2500, 0, 'ecoteccomputersolutions@gmail.com'),
	(113, 'INTEL LGA 775 CPU COOLER (USED) (N/W)', 'INTEL LGA 775 CPU COOLER (S/N:BA31-00023B) (USED) (N/W)', 1000, 0, 'ecoteccomputersolutions@gmail.com'),
	(114, 'DVD WRITER (USED) (01M)', 'DVD WRITER (S/N:153861) (01M)', 1000, 0, 'ecoteccomputersolutions@gmail.com'),
	(115, 'DDR3 2GB 8500U RAM (USED) (03M)', 'DDR3 2GB 8500U RAM (S/N:153853) (USED) (03M)', 1900, 0, 'ecoteccomputersolutions@gmail.com'),
	(116, 'HDMI TO VGA CONVERTER (BRAND NEW) (N/W)', 'HDMI TO VGA CONVERTER (S/N:175053) (N/W)', 1250, 0, 'ecoteccomputersolutions@gmail.com'),
	(117, 'TECH PRO JY-520BLTT USB KEYBOARD (03M)', 'Tech Pro JY-520BLTT Three Languages USB Keyboard (S/N:145605) (03M)', 1350, 0, 'ecoteccomputersolutions@gmail.com'),
	(118, 'PSU 400W (6PIN) (USED) (03M)', 'POWEREX POWER SUPPLY 400W (06PIN) (S/N:148921) (03M)', 3000, 0, 'ecoteccomputersolutions@gmail.com'),
	(119, 'SAMSUNG 19" SQUARE LCD MONITOR (USED) (03M)', 'Samsung SyncMaster Magic CX943B 19" Square LCD Monitor (S/N:147342) (03M)', 10900, 0, 'ecoteccomputersolutions@gmail.com'),
	(120, 'SAMSUNG 20" LED MONITOR (USED) (03M)', 'Samsung SyncMaster Magic BX2050 22" LED Monitor (S/N:008795) (03M)', 14900, 0, 'ecoteccomputersolutions@gmail.com'),
	(121, 'LAPTOP DISPLAY 16.5" (40PIN) (03M)', 'Laptop display Normal 16.5" (40PIN) (S/N:) (03M)', 16900, 0, 'ecoteccomputersolutions@gmail.com'),
	(122, 'SATA III CABLE (ORIGINAL) (N/W)', 'SATA III CABLE (ORIGINAL) (N/W)', 250, 0, 'ecoteccomputersolutions@gmail.com'),
	(123, 'G41 M/B (D3) (USED) (03M)', 'SAMSUNG G41 MOTHERBOARD (DDR3) (S/N.163188) (USED) (03M)', 5000, 0, 'ecoteccomputersolutions@gmail.com'),
	(124, 'DDR3 2GB DESKTOP RAM (USED) (03M)', 'DDR2 2GB Desktop Ram (S/N:140868) (USED) (03M)', 2250, 0, 'ecoteccomputersolutions@gmail.com'),
	(125, 'DCP 650VA UPS (02Y)', 'DCP 650VA LINE INTERACTIVE UPS DCP 650VA Intelligent CPU Controlled Wide Input Range (220V+25%) Full Protection against Over Voltage / Low Voltage (2 Years Warranty 1 Year Warranty For Battery)', 14900, 0, 'ecoteccomputersolutions@gmail.com'),
	(126, 'SAMSUNG 22" LCD MONITOR (USED) (03M)', 'Samsung Sync Master Magic 2243 22" LCD Monitor (S/N:ND04HVCS800464V) (03M)', 16500, 0, 'ecoteccomputersolutions@gmail.com'),
	(127, 'MEMORYGHOST 128GB SATA SSD (03Y)', 'MemoryGhost SATA III 2.5" 128GB SSD (S/N.MG11082339001615) (03Y)', 5500, 0, 'ecoteccomputersolutions@gmail.com'),
	(128, 'INTEL i3-3220 SYSTEM UNIT (USED) (03M)', 'Intel i3-3220 3rd Generation System Unit (S/N:50234142) (USED) (03M)', 26900, 0, 'ecoteccomputersolutions@gmail.com'),
	(129, 'SOFTWARE INSTALLATION & SERVICE CHARGE (N/W)', 'Setting up basic operating system settings and installing essential software and drivers. Windows Update and Defragmented drives and storage cleanup, Removing temporary files and Service charge. (S/N:) (N/W)', 1000, 0, 'ecoteccomputersolutions@gmail.com'),
	(130, 'G41 M/B (D2) (USED) (03M)', 'INTEL G41 MOTHERBOARD (DDR2) (S/N.140872) (03M)', 4500, 0, 'ecoteccomputersolutions@gmail.com'),
	(131, 'CAT 5E CABLE (01M) (N/W)', 'Cat 5E Cable (01M) (S/N:) (N/W)', 750, 0, 'ecoteccomputersolutions@gmail.com'),
	(132, 'COLORSIT CAT6 CABLE (05M) (01M)', 'Colorsit Cat6 Cable (05M) (S/N:) (01M)', 1750, 0, 'ecoteccomputersolutions@gmail.com'),
	(133, 'LAPTOP POWER ADAPTOR (06M)', 'Dell AC Adapter MODEL: (S/N:) (06M)', 4500, 0, 'ecoteccomputersolutions@gmail.com'),
	(134, 'LAPTOP BASIC SERVICE (HIGH END) (N/W)', 'Complete dust cleaning without removing back cover, Cleaning I/O ports. (S/N:) (N/W)', 2000, 0, 'ecoteccomputersolutions@gmail.com'),
	(135, 'LAPTOP BASIC SERVICE (ENTRY LEVEL) (N/W)', 'Complete dust cleaning without removing back cover, Cleaning I/O ports. (S/N:) (N/W)', 1000, 0, 'ecoteccomputersolutions@gmail.com'),
	(136, 'LAPTOP FULL SERVICE (HIGH END) (N/W)', 'Removing the back cover to clean internal components & cooling fans, Original thermal paste reapplying. Exterior & interior deep cleaning (S/N.) (N/W)', 4500, 0, 'ecoteccomputersolutions@gmail.com'),
	(137, 'DESKTOP PC FULL SERVICE (ENTRY LEVEL) (N/W)', 'System unit disassembly, Exterior & interior deep cleaning, Thermal paste reapplying. (S/N:) (N/W)', 2000, 0, 'ecoteccomputersolutions@gmail.com'),
	(138, 'DESKTOP PC FULL SERVICE (HIGH END) (N/W)', 'System unit disassembly, Exterior & interior deep cleaning, Original thermal paste reapplying. (S/N:) (N/W)', 5000, 0, 'ecoteccomputersolutions@gmail.com'),
	(139, 'DDR2 2GB DESKTOP RAM (USED) (03M)', 'Samsung DDR2 2GB Desktop Ram (S/N:140868) (USED) (03M)', 2250, 0, 'ecoteccomputersolutions@gmail.com'),
	(140, 'NOTEBOOK KEYBOARD (03M)', 'Lenovo G50-80 Notebook Keyboard (S/N:878585) (03M)', 3900, 0, 'ecoteccomputersolutions@gmail.com'),
	(141, 'D-SUB CABLE 1.5M (NORMAL) (N/W)', 'D-SUB CABLE 1.5M (NORMAL) (N/W)', 650, 0, 'ecoteccomputersolutions@gmail.com'),
	(142, 'POWER CABLE 1.5M WITHOUT FUSE (NORMAL) (N/W)', 'POWER CABLE 1.5M WITHOUT FUSE (NORMAL) (N/W)', 450, 0, 'ecoteccomputersolutions@gmail.com'),
	(143, 'LAPTOP HINGE REPAIR (N/W)', 'Dell Inspiron 15 3511 Laptop Hinge Repair (S/N:) (N/W)', 2000, 0, 'ecoteccomputersolutions@gmail.com'),
	(144, 'LAPTOP DISPLAY 15.6" NORMAL (30PIN) (06M)', 'Laptop display 15.6" Normal (30PIN) (S/N:) (06M)', 16900, 0, 'ecoteccomputersolutions@gmail.com'),
	(145, 'USED CASING FAN 120MM (USED) (01M)', 'QHD Casing Fan (QH12025SE) (S/N:) (USED) (01M)', 500, 0, 'ecoteccomputersolutions@gmail.com'),
	(146, 'DDR3 4GB DESKTOP RAM (USED) (03M)', 'ADATA DDR3 1600MHz 4GB Desktop Ram (S/N:) (USED) (03M)', 2900, 0, 'ecoteccomputersolutions@gmail.com'),
	(147, 'ACER VERITON ES2740G i3-10100 (03Y)', 'ACER Veriton ES2740G i3-10100 Desktop IntelÂ® Coreâ„¢ i3 4 GB DDR4-SDRAM 1000 GB HDD Windows 10 Pro PC Black (S/N:) (03Y)', 235000, 0, 'ecoteccomputersolutions@gmail.com'),
	(148, 'INSTALLATION & SERVICE CHARGE (N/W)', 'Configuring PC hardware and software settings. (S/N:) (N/W)', 1000, 0, 'ecoteccomputersolutions@gmail.com'),
	(149, 'AMP RJ45 CAT6 CONNECTOR (N/W)', 'AMP RJ45 CAT6 CONNECTOR (N/W)', 100, 0, 'ecoteccomputersolutions@gmail.com'),
	(150, 'CAT6 CABLE (PRICE PER METER) (01M)', 'CAT6 Network Cable (Price Per Meter) (01M)', 350, 0, 'ecoteccomputersolutions@gmail.com'),
	(151, 'JEDEL K13 KEYBOARD (03M)', 'JEDEL K13 KEYBOARD (S/N:) (03M)', 1250, 0, 'ecoteccomputersolutions@gmail.com'),
	(152, 'PSU 450W (USED) (03M)', 'ATX 4500BL Power Supply 450W (S/N:148920) (USED) (03M)', 2750, 0, 'ecoteccomputersolutions@gmail.com'),
	(153, 'LAPTOP FULL SERVICE (ENTRY LEVEL) (N/W)', 'Removing the back cover to clean internal components & cooling fans, Thermal paste reapplying. Exterior & interior deep cleaning. (S/N:) (N/W)', 2500, 0, 'ecoteccomputersolutions@gmail.com'),
	(154, '500GB HDD (USED) (03M)', '500GB SATA HDD (S/N:008556) (USED) (03M)', 3900, 0, 'ecoteccomputersolutions@gmail.com'),
	(155, 'EMARC CASING (BRAND NEW) (N/W)', 'EMARC Casing Model: C3113 (S/N:C311321070728) (N/W)', 4500, 0, 'ecoteccomputersolutions@gmail.com'),
	(156, 'HANDBOSS CLEANING AGENT (N/W)', 'HANDBOSS Cleaning Agent (S/N:) (N/W)', 1750, 0, 'ecoteccomputersolutions@gmail.com'),
	(157, 'HANDBOSS FOAM CLEANING (N/W)', 'HANDBOSS Foam Cleaning (S/N:) (N/W)', 1000, 0, 'ecoteccomputersolutions@gmail.com'),
	(158, 'HAVIT HV-MP838 MOUSE PAD (N/W)', 'HAVIT HV-MP838 MOUSE PAD (N/W)', 500, 0, 'ecoteccomputersolutions@gmail.com'),
	(159, 'COLORSIT HDMI CABLE 1.5M (N/W)', 'COLORSIT HDMI Cable 1.5M (S/N:) (N/W)', 750, 0, 'ecoteccomputersolutions@gmail.com'),
	(160, 'COLORSIT NOTBOOK POWER CABLE 1.5M FUSE BLACK (N/W)', 'COLORSIT Notebook Power Cable 1.5M Fuse Black (S/N:) (N/W)', 900, 0, 'ecoteccomputersolutions@gmail.com'),
	(161, 'COLORSIT POWER CABLE 1.5M FUSE BLACK (N/W)', 'COLORSIT Power Cable 1.5M Fuse Black (BRITISH) (S/N:) (N/W)', 900, 0, 'ecoteccomputersolutions@gmail.com'),
	(162, 'COLORSIT D-SUB CABLE 1.5M (N/W)', 'COLORSIT D-Sub Cable 1.5M Male to Male (S/N:) (N/W)', 800, 0, 'ecoteccomputersolutions@gmail.com'),
	(163, 'LB-LINK BL-WN151 WIFI ADAPTER (03M)', 'LB-LINK BL-WN151 150Mbps Nano Wireless Adapter (S/N:) (03M)', 1500, 0, 'ecoteccomputersolutions@gmail.com'),
	(164, 'LB-LINK BL-WN450M WIFI ADAPTER (03M)', 'LB-LINK BL-WN450M 300Mbps Wireless N USB Adapter (S/N:) (03M)', 2000, 0, 'ecoteccomputersolutions@gmail.com'),
	(165, 'OSCOO ON900 128GB M.2 NVME SSD (03Y)', 'OSCOO ON900 128GB M.2 NVME SSD (S/N:) (03Y)', 7900, 0, 'ecoteccomputersolutions@gmail.com'),
	(166, 'OSCOO BLACK 120GB 2.5" SATA SSD (03Y)', 'OSCOO BLACK 120GB 2.5" SATA SSD (S/N:) (03Y)', 5900, 0, 'ecoteccomputersolutions@gmail.com'),
	(167, 'JEDEL 220 USB MOUSE (03M)', 'JEDEL 220 USB Optical Mouse (S/N:) (03M)', 600, 0, 'ecoteccomputersolutions@gmail.com'),
	(168, 'REDLINK RL-617 WIRED MOUSE (03M)', 'REDLINK RL-617 Wired Mouse (S/N:) (03M)', 900, 0, 'ecoteccomputersolutions@gmail.com'),
	(169, 'WEB CAMERA 720P (03M)', 'Web Camera 720P (S/N:) (03M)', 2500, 0, 'ecoteccomputersolutions@gmail.com'),
	(170, 'KINGSTON 32GB USB 3.2 GEN 1 FLASH DRIVE (02Y)', 'KINGSTON 32GB DataTraveler Exodia M USB 3.2 Gen 1 Flash Drive (S/N:) (02Y)', 1700, 0, 'ecoteccomputersolutions@gmail.com'),
	(171, ' ESET INTERNET SECURITY (01 USER) (N/W)', 'ESET Internet Security (01 USER) (N/W)', 1900, 0, 'ecoteccomputersolutions@gmail.com'),
	(172, 'KASPERSKY INTERNET SECURITY (01 USER) (N/W)', 'KASPERSKY INTERNET SECURITY (01 USER) (N/W)', 1900, 0, 'ecoteccomputersolutions@gmail.com'),
	(173, 'PROLINK PMW 5010 WIRELESS MOUSE (06M)', 'PROLINK PMW 5010 Wireless Mouse (S/N:620401213402308) (06M)', 3000, 0, 'ecoteccomputersolutions@gmail.com'),
	(174, 'PROLINK PMC1006 WIRED MOUSE (06M)', 'PROLINK PMC1006 Optical Mouse (S/N:) (06M)', 2000, 0, 'ecoteccomputersolutions@gmail.com'),
	(175, 'SONICGEAR SONICUBE SPEAKER (03M)', 'SONICGEAR SONICUBE USB 2.0 Speaker (S/N:) (03M)', 1000, 0, 'ecoteccomputersolutions@gmail.com'),
	(176, 'KAZAI ICON100 SPEAKER (03M)', 'KAZAI ICON100 USB 2.0 Speaker (S/N:) (03M)', 1500, 0, 'ecoteccomputersolutions@gmail.com'),
	(177, 'HAVIT HV-SK473 SPEAKER (03M)', 'HAVIT HV-SK473 USB 2.0 Speaker (S/N:) (03M)', 1500, 0, 'ecoteccomputersolutions@gmail.com'),
	(178, 'JEDEL GK100+ COMBO (03M)', 'JEDEL Wired Keyboard Mouse Combo (S/N:) (03M)', 2000, 0, 'ecoteccomputersolutions@gmail.com'),
	(179, 'MICROPACK KM-203W COMBO (06M)', 'MICROPACK KM-203W Wireless Keyboard Mouse Combo (S/N:260201100646) (06M)', 4500, 0, 'ecoteccomputersolutions@gmail.com'),
	(180, 'MICROPACK GM-06 GAMING MOUSE (06M)', 'MICROPACK GM-06 Gaming Mouse (S/N:) (06M)', 2750, 0, 'ecoteccomputersolutions@gmail.com'),
	(181, 'JEDEL JD-808 HEADPHONE (03M)', 'JEDEL JD-808 Wired Headphone (S/N:) (03M)', 1500, 0, 'ecoteccomputersolutions@gmail.com'),
	(182, 'HAVIT H610BT HEADPHONE (03M)', 'HAVIT H610BT Multi Function Wireless Headphone (S/N:) (03M)', 3500, 0, 'ecoteccomputersolutions@gmail.com'),
	(183, 'CMOS BATTERY (SONY CR2032) (N/W)', 'SONY CR2032 Lithium Battery (N/W)', 100, 0, 'ecoteccomputersolutions@gmail.com'),
	(184, 'KSTAR 650VA UA60 UPS (02Y)', 'KSTAR Line Interactive UA60 UPS (Warranty 2 Years - 1 Year for Battery) (S/N:310036392CC8589601437)', 12500, 0, 'ecoteccomputersolutions@gmail.com'),
	(185, 'INSTALLING WINDOWS 11 (N/W)', 'Installing Microsoft Windows 11 Operating System & Drivers, Applications Software. Setting up basic operating system settings and installing essential software and drivers. Windows Update and Service charge. (S/N:) (N/W)', 2000, 0, 'ecoteccomputersolutions@gmail.com'),
	(186, 'INSTALLING WINDOWS 10 (N/W)', 'Installing Microsoft Windows 10 Operating System & Drivers, Applications Software. Setting up basic operating system settings and installing essential software and drivers. Windows Update and Service charge. (S/N:) (N/W)', 1500, 0, 'ecoteccomputersolutions@gmail.com'),
	(187, 'INSTALLING WINDOWS 7 (N/W)', 'Installing Microsoft Windows 7 Operating System & Drivers, Applications Software. Setting up basic operating system settings and installing essential software and drivers. (S/N:) (N/W)', 1000, 0, 'ecoteccomputersolutions@gmail.com'),
	(188, 'KINGSTON 64GB USB 3.2 GEN 1 (02Y)', 'KINGSTON 64GB DataTraveler Exodia M USB 3.2 Gen 1 Flash Drive (S/N:) (02Y)', 2500, 0, 'ecoteccomputersolutions@gmail.com'),
	(189, 'HAVIT HV-MS753 WIRED MOUSE (03M)', 'HAVIT HV-MS753 OPTICAL WIRED MOUSE (S/N:) (03M)', 900, 0, 'ecoteccomputersolutions@gmail.com'),
	(190, 'JEDEL K11 KEYBOARD (03M)', 'JEDEL K11 USB Wired Keyboard (S/N:) (03M)', 1200, 0, 'ecoteccomputersolutions@gmail.com'),
	(191, 'STORAGE DATA BACKUP & SERVICE CHARGE (N/W)', 'Hard disk backup is a process to create a complete copy of everything in a hard drive to another HDD/SSD or an external hard drive. (N/W)', 1000, 0, 'ecoteccomputersolutions@gmail.com'),
	(192, 'NEC L222VW 22INCH 1080P IPS MONITOR (USED) (03M)', 'NEC L222VW 22INCH 1080P IPS MONITOR (S/N:) (USED) (03M)', 14900, 0, 'ecoteccomputersolutions@gmail.com'),
	(193, 'KSTAR UA60 600VA (360W) LINE INTERACTIVE UPS (01Y)', 'KSTAR UA60 600VA (360W) LINE INTERACTIVE UPS (S/N:) (01Y)', 10900, 0, 'ecoteccomputersolutions@gmail.com'),
	(194, 'INTEL CORE I5 6TH GENERATION SYSTEM UNIT (USED) (03M)', 'Processor: Intel Core i5-6400 Motherboard: H110 RAM: 8GB DDR4 Hard Disk: 500GB SATA 3.5â€ Graphics: Integrated Optical Drive: DVD-RW, DVD, CD RW, CD Audio: On Board (S/N:) (USED) (03M)', 35900, 0, 'ecoteccomputersolutions@gmail.com'),
	(195, 'ASUS ROG-STRIX-750G 750W GAMING POWER SUPPLY (05Y)', 'ASUS ROG-STRIX-750G 750W GAMING POWER SUPPLY (S/N:) (05Y)\nThe ROG Strix 750W Gold PSU brings premium cooling performance to the mainstream.\nROG heatsinks cover critical components. Lower temps result in a longer lifespan and reduced noise.\nAxial-tech fan design features a smaller fan hub that facilitates longer blades and a barrier ring that increases downward air pressure.\nDual ball fan bearings can last up to twice as long as sleeve bearing designs.\n0dB Technology lets you enjoy light gaming in relative silence.\nAn 80 Plus Gold Certification is the result of Japanese capacitors and other premium components.\nCosmetic customization is enabled by a magnetic logo and stickers that help you reskin the visible side to your liking.\nFully modular cables keep your rig neat and tidy.', 38900, 0, 'ecoteccomputersolutions@gmail.com');

-- Dumping structure for table com-system.province
CREATE TABLE IF NOT EXISTS `province` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table com-system.province: ~10 rows (approximately)
INSERT INTO `province` (`id`, `name`) VALUES
	(1, 'Not Selected'),
	(2, 'Eastern'),
	(3, 'North Central'),
	(4, 'Northern'),
	(5, 'North Western'),
	(6, 'Sabaragamuwa'),
	(7, 'Southern'),
	(8, 'Uva'),
	(9, 'Western'),
	(10, 'Central');

-- Dumping structure for table com-system.status
CREATE TABLE IF NOT EXISTS `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table com-system.status: ~2 rows (approximately)
INSERT INTO `status` (`id`, `name`) VALUES
	(1, 'unblock'),
	(2, 'block');

-- Dumping structure for table com-system.user
CREATE TABLE IF NOT EXISTS `user` (
  `email` varchar(100) NOT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `mobile` varchar(10) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `verification_code` varchar(20) DEFAULT NULL,
  `status_id` int NOT NULL,
  `joined_date` date DEFAULT NULL,
  `user_image` text,
  `company_name` varchar(50) DEFAULT NULL,
  `company_address` varchar(100) DEFAULT NULL,
  `company_email` varchar(100) DEFAULT NULL,
  `company_mobile` varchar(10) DEFAULT NULL,
  `company_image` text,
  `footer` text,
  `invoice_notes` text,
  `instruction` text,
  `estimate_notes` text,
  PRIMARY KEY (`email`),
  KEY `fk_user_status1_idx` (`status_id`),
  CONSTRAINT `fk_user_status1` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table com-system.user: ~2 rows (approximately)
INSERT INTO `user` (`email`, `firstname`, `lastname`, `mobile`, `password`, `verification_code`, `status_id`, `joined_date`, `user_image`, `company_name`, `company_address`, `company_email`, `company_mobile`, `company_image`, `footer`, `invoice_notes`, `instruction`, `estimate_notes`) VALUES
	('ayesh@gmail.com', 'Ayesh', 'Chathuranga', '0712345683', '1234', NULL, 1, '2024-05-19', 'assets/images/Ayesh_uUg.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('ecoteccomputersolutions@gmail.com', 'ECOTEC', 'COMPUTER SOLUTIONS', '0711453382', '1234', NULL, 1, '2024-05-19', 'assets/images/Ayesh_uUg.jpg', 'ECOTEC COMPUTER SOLUTIONS', 'No.09, Mulatiyana junction, Mulatiyana, Matara, Srilanka.', 'ecoteccomputersolutions@gmail.com', '0711453382', 'assets/images/ECOTEC_DOx.jpg', 'We know the world is full of choices. Thank you for selecting us.', 'PLEASE PRODUSE THE INVOICE FOR WARRANTY. NO WARRANTY FOR CHIP BURNS, PHYSICAL DAMAGE OR CORROSION. Warranty covers only manufacturer s defects. Damage or defect due to other causes such as negligence, misuses, improper operation, power fluctuation, lightening, or other natural disasters, sabotage, or accident etc. (01M) = 30 Days, (03M) = 90 Days, (06M) = 180 Days, (01Y) = 350 Days, (02Y) = 700 Days, (03Y) = 1050 Days, (05Y) = 1750 Days, (10Y) = 3500 Days, (L/W) = Lifetime Warranty. (N/W) = No Warranty).', 'We know the world is full of choices. Thank you for selecting us.', 'This estimate is an approximation and is not guaranteed. The estimate is based on information\nprovided from the client regarding project requirements. Actual cost may change once all project\nelements are finalized or negotiated. Prior to any changes of cost, the client will be notified.\nEstimate valid for 30 days.');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
