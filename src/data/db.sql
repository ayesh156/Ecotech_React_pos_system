-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.29 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------




CREATE DATABASE IF NOT EXISTS `u993191433_react_api`;
USE `u993191433_react_api`;


CREATE TABLE IF NOT EXISTS `admin` (
  `email` varchar(100) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `mobile` varchar(10) DEFAULT NULL,
  `verification_code` varchar(20) DEFAULT NULL,
  `image` text,
  PRIMARY KEY (`email`)
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS `province` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11;

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

CREATE TABLE IF NOT EXISTS `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3;


INSERT INTO `status` (`id`, `name`) VALUES
	(1, 'unblock'),
	(2, 'block');

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
  PRIMARY KEY (`email`),
  KEY `fk_user_status1_idx` (`status_id`),
  CONSTRAINT `fk_user_status1` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`)
) ENGINE=InnoDB;


INSERT INTO `user` (`email`, `firstname`, `lastname`, `mobile`, `password`, `verification_code`, `status_id`, `joined_date`, `user_image`, `company_name`, `company_address`, `company_email`, `company_mobile`, `company_image`) VALUES
	('ayesh@gmail.com', 'Ayesh', 'Chathuranga', '0712345683', '1234', NULL, 1, NULL, 'assets/images/Ayesh_uUg.jpg', NULL, NULL, NULL, NULL, NULL),
	('ecotec@gmail.com', '', '', '0711453382', '1234', NULL, 1, NULL, 'assets/images/Ayesh_uUg.jpg', 'ECOTEC COMPUTER SOLUTIONS', 'No.14, Mulatiyana junction, Mulatiyana, Matara.', 'ecoteccomputersolutions@gmail.com', '0711453111', 'assets/images/ECOTE_Ffh.jpg');


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
) ENGINE=InnoDB AUTO_INCREMENT=15;


INSERT INTO `customer` (`id`, `name`, `email`, `mobile`, `balance`, `user_email`) VALUES
	(1, 'Ayesh Chathuranga', 'ayesh001@gmail.com', '0771234564', 0, 'ecotec@gmail.com'),
	(2, 'Jane Smith', 'ayesh@gmail.com', '0772345678', 0, 'ecotec@gmail.com'),
	(3, 'Alice Johnson', 'ayesh@gmail.com', '0773456789', 0, 'ecotec@gmail.com'),
	(4, 'Bob Brown', 'ayesh@gmail.com', '0774567890', 0, 'ecotec@gmail.com'),
	(5, 'Emma Lee', 'ayesh@gmail.com', '0775678901', 0, 'ecotec@gmail.com'),
	(6, 'Michael Davis', 'ayesh@gmail.com', '0776789012', 0, 'ecotec@gmail.com'),
	(7, 'Sarah Wilson', 'ayesh@gmail.com', '0777890123', 0, 'ecotec@gmail.com'),
	(8, 'David Taylor', 'ayesh@gmail.com', '0778901234', 0, 'ecotec@gmail.com'),
	(9, 'Olivia White', 'ayesh@gmail.com', '0779012345', 0, 'ecotec@gmail.com'),
	(10, 'James Martinez', 'ayesh@gmail.com', '0770123456', 0, 'ecotec@gmail.com'),
	(11, 'Eshara', 'eshara@gmail.com', '0712345789', 0, 'ecotec@gmail.com'),
	(12, 'Thisara', 'thisara@gmail.com', '0723654123', 0, 'ecotec@gmail.com'),
	(13, 'Thathsara', 'thathsara@gmail.com', '0786523147', 0, 'ecotec@gmail.com'),
	(14, 'Dilshan', 'dilshan@gmail.com', '0786541233', 0, 'ecotec@gmail.com');


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
) ENGINE=InnoDB AUTO_INCREMENT=5;


INSERT INTO `customer_details` (`id`, `address1`, `address2`, `city`, `postal_code`, `instruction`, `account_no`, `fax`, `telephone`, `website`, `note`, `province_id`, `customer_id`) VALUES
	(1, 'Address Line 1', 'Address Line 2', 'Kamburupitiya', '10234', 'Kamburupitiya, 10234', '1245623', '0712345789', '0712345789', 'eshara.com', '0712345789, eshara.com', 7, 11),
	(2, 'Hikkotawaththa', 'Makandura', 'Matara', '80123', 'Delivery instruction', '8012365', '0723654453', '0723654783', 'thisara.com', 'thisara internal Notes', 7, 12),
	(3, 'address line 1', 'address line 2', 'Kamburupitiya', '10002', 'instruction', '123456', '0786541123', '0786541453', 'dilshan.com', 'notes', 7, 14),
	(4, 'Mulatiyana', 'Makandura', 'Matara', '80100', 'Home Delivery', '801236587', '+94771234562', '0771234563', 'ayesh@gmail.com', 'note', 7, 1);


CREATE TABLE IF NOT EXISTS `estimate` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `subhead` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `notes` text,
  `paid_amount` double DEFAULT NULL,
  `customer_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_invoice_customer1_idx` (`customer_id`),
  CONSTRAINT `fk_invoice_customer10` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS `estimate_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` text,
  `qty` double DEFAULT NULL,
  `buying_price` double DEFAULT NULL,
  `selling_price` double DEFAULT NULL,
  `tax` double DEFAULT NULL,
  `estimate_id` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_estimate_item_estimate1_idx` (`estimate_id`),
  CONSTRAINT `fk_estimate_item_estimate1` FOREIGN KEY (`estimate_id`) REFERENCES `estimate` (`id`)
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS `invoice` (
  `id` varchar(50) NOT NULL,
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
  CONSTRAINT `fk_invoice_customer1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS `invoice_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` text,
  `qty` double DEFAULT NULL,
  `buying_price` double DEFAULT NULL,
  `selling_price` double DEFAULT NULL,
  `tax` double DEFAULT NULL,
  `invoice_id` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_invoice_item_invoice1_idx` (`invoice_id`),
  CONSTRAINT `fk_invoice_item_invoice1` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`)
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS `job_note` (
  `id` varchar(50) NOT NULL,
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
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS `job_note_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` text,
  `qty` double DEFAULT NULL,
  `buying_price` double DEFAULT NULL,
  `selling_price` double DEFAULT NULL,
  `tax` double DEFAULT NULL,
  `job_note_id` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_job_note_item_job_note1_idx` (`job_note_id`),
  CONSTRAINT `fk_job_note_item_job_note1` FOREIGN KEY (`job_note_id`) REFERENCES `job_note` (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `job_order` (
  `id` varchar(50) NOT NULL,
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
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS `job_order_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` text,
  `qty` double DEFAULT NULL,
  `buying_price` double DEFAULT NULL,
  `selling_price` double DEFAULT NULL,
  `tax` double DEFAULT NULL,
  `job_order_id` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_job_order_item_job_order1_idx` (`job_order_id`),
  CONSTRAINT `fk_job_order_item_job_order1` FOREIGN KEY (`job_order_id`) REFERENCES `job_order` (`id`)
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject` varchar(100) DEFAULT NULL,
  `message` text,
  `user_email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_notification_user1_idx` (`user_email`),
  CONSTRAINT `fk_notification_user1` FOREIGN KEY (`user_email`) REFERENCES `user` (`email`)
) ENGINE=InnoDB;


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
) ENGINE=InnoDB AUTO_INCREMENT=15;


INSERT INTO `product` (`id`, `name`, `description`, `selling_price`, `buying_price`, `user_email`) VALUES
	(1, 'Keyboard', 'A high-quality keyboard for efficient typing.', 5400, 5000, 'ecotec@gmail.com'),
	(2, 'Mouse', 'A comfortable and precise mouse for smooth navigation.', 2400, 2000, 'ecotec@gmail.com'),
	(3, 'Monitor', 'A large, high-resolution monitor for immersive viewing experience.', 2400, 2100, 'ecotec@gmail.com'),
	(4, 'CPU (Central Processing Unit)', 'The brain of your computer, responsible for executing tasks.', 4500, 41000, 'ecotec@gmail.com'),
	(5, 'RAM (Random Access Memory)', 'Fast memory for quick access to frequently used data.', 5600, 5000, 'ecotec@gmail.com'),
	(6, 'Hard Drive (HDD)', 'High-capacity storage for your files and applications.', 2500, 2000, 'ecotec@gmail.com'),
	(7, 'Solid State Drive (SSD)', 'Lightning-fast storage with no moving parts.', 7400, 7000, 'ecotec@gmail.com'),
	(8, 'Graphics Card', 'Delivers stunning visuals and smooth gaming performance. GTX 200', 22400, 20000, 'ecotec@gmail.com'),
	(9, 'Motherboard', 'Connects and coordinates all components of your computer.', 8500, 8000, 'ecotec@gmail.com'),
	(10, 'Power Supply Unit (PSU)', 'Provides stable power to all components of your computer.', 1800, 1500, 'ecotec@gmail.com'),
	(11, 'Laptop', 'Laptop Description', 1200, 1300, 'ecotec@gmail.com'),
	(12, 'Monitor', 'Monitor Desc', 7500, 8500, 'ecotec@gmail.com'),
	(13, 'Speaker', 'Speaker Description', 1100, 1100, 'ecotec@gmail.com'),
	(14, 'Gaming Pad', 'Gaming Pad Description', 2200, 2100, 'ecotec@gmail.com');







