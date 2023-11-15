-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: kiotviet
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'cafe hoàng minh'),(2,'cafe hoàng minh 2'),(3,'cafe hoàng minh 3'),(5,'Cafe Hầm Trú Ẩn'),(6,'Cafe Hà Nội');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `store_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKp7gj4l80fx8v0uap3b2crjwp5` (`product_id`),
  KEY `FKtdgy352s88shlsdbhxqp5k9vk` (`store_id`),
  CONSTRAINT `FKp7gj4l80fx8v0uap3b2crjwp5` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FKtdgy352s88shlsdbhxqp5k9vk` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,97,1,1),(2,1000,1,2),(3,1000,2,1);
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `store_id` int DEFAULT NULL,
  `is_enable` bit(1) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKm2y7cjw5xfgq4g6hrn8x64ody` (`order_id`),
  KEY `FK551losx9j75ss5d6bfsqvijna` (`product_id`),
  KEY `FK5x5y6ey8qdd5tvr8bqg0uwtvu` (`store_id`),
  CONSTRAINT `FK551losx9j75ss5d6bfsqvijna` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FK5x5y6ey8qdd5tvr8bqg0uwtvu` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`),
  CONSTRAINT `FKm2y7cjw5xfgq4g6hrn8x64ody` FOREIGN KEY (`order_id`) REFERENCES `orderbill` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (2,1,NULL,1,1,_binary '',1),(3,1,NULL,2,1,_binary '',1),(5,4,NULL,1,1,_binary '\0',1);
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderbill`
--

DROP TABLE IF EXISTS `orderbill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderbill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_date` datetime DEFAULT NULL,
  `total_price` int DEFAULT NULL,
  `store_id` int DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `employees_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKoj5f6dnd2qp0h4av78yfbgewf` (`store_id`),
  KEY `FKghnvvbvrp8ysbxh6rj7qk8i44` (`user_id`),
  KEY `FKq1h3wley47soc5hwsfsoivb9v` (`employees_id`),
  CONSTRAINT `FKghnvvbvrp8ysbxh6rj7qk8i44` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKoj5f6dnd2qp0h4av78yfbgewf` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`),
  CONSTRAINT `FKq1h3wley47soc5hwsfsoivb9v` FOREIGN KEY (`employees_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderbill`
--

LOCK TABLES `orderbill` WRITE;
/*!40000 ALTER TABLE `orderbill` DISABLE KEYS */;
INSERT INTO `orderbill` VALUES (4,'2023-09-09 00:00:00',200000,1,NULL,NULL),(5,'2023-09-09 00:00:00',200000,1,NULL,NULL),(6,'2023-09-09 00:00:00',200000,1,NULL,NULL),(7,'2023-09-09 00:00:00',200000,1,NULL,NULL),(8,'2023-09-09 00:00:00',200000,1,NULL,NULL),(9,'2023-09-09 00:00:00',200000,1,NULL,NULL),(10,NULL,200000,1,NULL,NULL);
/*!40000 ALTER TABLE `orderbill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` int DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `method` varchar(255) DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  `is_lock` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKk1nncvjq3wwwp2fe1s8lwgmce` (`order_id`),
  CONSTRAINT `FKk1nncvjq3wwwp2fe1s8lwgmce` FOREIGN KEY (`order_id`) REFERENCES `orderbill` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,NULL,'2023-10-22 06:44:45','Thanh toan tien mat',NULL,_binary '\0'),(2,NULL,'2023-10-22 06:45:16','Thanh toan tien mat',NULL,_binary '\0');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `total_quantity` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1mtsbur82frn64de7balymq9s` (`category_id`),
  CONSTRAINT `FK1mtsbur82frn64de7balymq9s` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Sản phẩm tốt','Sản phẩm 1',100000,15,1),(2,'Sản phẩm tốt','Sản phẩm 2',100000,19,1),(3,'Sản phẩm tốt','Sản phẩm 3',100000,20,1),(4,'Sản phẩm tốt','Sản phẩm 4',100000,20,1),(5,'Sản phẩm tốt','Sản phẩm 5',100000,20,1),(6,'Sản phẩm tốt','Sản phẩm 6',100000,20,1),(7,'Nhà đẹp không lo về giá các cháu cứ đến thuê nhé','Cafe Nâu Đá 1',100000,10,5),(8,'Nhà đẹp không lo về giá các cháu cứ đến thuê nhé','Cafe Nâu Đá 2',100000,10,3),(9,'Nhà đẹp không lo về giá các cháu cứ đến thuê nhé','Cafe Nâu Đá 3',100000,10,3);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_media`
--

DROP TABLE IF EXISTS `product_media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_media` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKish5xtvhdauc3njtkj6j5eyjp` (`product_id`),
  CONSTRAINT `FKish5xtvhdauc3njtkj6j5eyjp` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_media`
--

LOCK TABLES `product_media` WRITE;
/*!40000 ALTER TABLE `product_media` DISABLE KEYS */;
INSERT INTO `product_media` VALUES (1,'1.png',7),(2,'1.png',8),(3,'1.png',9);
/*!40000 ALTER TABLE `product_media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_nb4h0p6txrmfc0xbrd1kglp9t` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ROLE_ADMIN'),(2,'ROLE_USER');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` VALUES (1,'Trường Chinh, Đống Đa, Hà Nội','Nam.BKC19187@student.bkacad.edu.vn','Cafe Hầm Trú Ẩn','0987654321'),(2,'Trường Chinh, Đống Đa, Hà Nội','dinhnam.nghiem.2611@gmail.com','TinyPost Cafe','0987654321');
/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supply`
--

DROP TABLE IF EXISTS `supply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supply` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supply`
--

LOCK TABLES `supply` WRITE;
/*!40000 ALTER TABLE `supply` DISABLE KEYS */;
INSERT INTO `supply` VALUES (1,'Dao Tu, Quang Phu Cau','Nam.BKC19187@student.bkacad.edu.vn','CTY cổ phần Chiến Thắng','3982233232'),(2,'Quảng Phú Cầu, Ứng Hòa','namsky1826@gmail.com','CTY cổ phần CMC Global','0397507826');
/*!40000 ALTER TABLE `supply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supply_product`
--

DROP TABLE IF EXISTS `supply_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supply_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `supply_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKedr6cr5bo16yisvwhx0ykg65u` (`product_id`),
  KEY `FKif3awob8xprddg6qr0r301apo` (`supply_id`),
  CONSTRAINT `FKedr6cr5bo16yisvwhx0ykg65u` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FKif3awob8xprddg6qr0r301apo` FOREIGN KEY (`supply_id`) REFERENCES `supply` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supply_product`
--

LOCK TABLES `supply_product` WRITE;
/*!40000 ALTER TABLE `supply_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `supply_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`),
  CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,1),(5,2);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified` bit(1) NOT NULL,
  `facebook_url` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_confirmed` bit(1) DEFAULT NULL,
  `is_locked` bit(1) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `provider` varchar(255) NOT NULL,
  `provider_id` varchar(255) DEFAULT NULL,
  `zalo_url` varchar(255) DEFAULT NULL,
  `store_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UK_du5v5sr43g5bfnji4vb8hg5s3` (`phone`),
  KEY `FKhmd3m5tgfs282j7f6svl8kalp` (`store_id`),
  CONSTRAINT `FKhmd3m5tgfs282j7f6svl8kalp` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2023-09-21 08:54:19','2023-09-21 08:55:52',NULL,'admin@gmail.com',_binary '\0',NULL,NULL,_binary '',_binary '\0','Admin','$2a$10$aX5K74GHs.MSbML/CKF/i./7NV8MVHr.hg4ltI2cSEYfllDubZKM6',NULL,'local',NULL,NULL,NULL),(5,'2023-10-18 15:50:55','2023-10-18 15:56:00','Ứng Hòa, Hà Nội','namsky1826@gmail.com',_binary '\0',NULL,NULL,_binary '',_binary '\0','Trần Văn Mạnh','$2a$10$.ljV6hRgTL7If4nRBtmrAONtmx96glRhG9fOcQx718D2mFaDm3QUW','0987654321','local',NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-22 18:30:58
