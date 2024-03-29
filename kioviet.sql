-- MySQL Script generated by MySQL Workbench
-- Fri Dec  8 18:26:46 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema kiotviet
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema kiotviet
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `kiotviet` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `kiotviet` ;

-- -----------------------------------------------------
-- Table `kiotviet`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kiotviet`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `kiotviet`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kiotviet`.`customer` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `phone` VARCHAR(255) NULL DEFAULT NULL,
  `discount` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `kiotviet`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kiotviet`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `price` INT NULL DEFAULT NULL,
  `total_quantity` INT NULL DEFAULT NULL,
  `category_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK1mtsbur82frn64de7balymq9s` (`category_id` ASC) VISIBLE,
  CONSTRAINT `FK1mtsbur82frn64de7balymq9s`
    FOREIGN KEY (`category_id`)
    REFERENCES `kiotviet`.`category` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `kiotviet`.`store`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kiotviet`.`store` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `phone` VARCHAR(255) NULL DEFAULT NULL,
  `is_stock` BIT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `kiotviet`.`inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kiotviet`.`inventory` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `quantity` INT NULL DEFAULT NULL,
  `time_to_end` DATE NULL DEFAULT NULL,
  `time_to_start` DATE NULL DEFAULT NULL,
  `product_id` INT NULL DEFAULT NULL,
  `store_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKp7gj4l80fx8v0uap3b2crjwp5` (`product_id` ASC) VISIBLE,
  INDEX `FKtdgy352s88shlsdbhxqp5k9vk` (`store_id` ASC) VISIBLE,
  CONSTRAINT `FKp7gj4l80fx8v0uap3b2crjwp5`
    FOREIGN KEY (`product_id`)
    REFERENCES `kiotviet`.`product` (`id`),
  CONSTRAINT `FKtdgy352s88shlsdbhxqp5k9vk`
    FOREIGN KEY (`store_id`)
    REFERENCES `kiotviet`.`store` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `kiotviet`.`order_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kiotviet`.`order_item` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `is_enable` BIT(1) NULL DEFAULT NULL,
  `quantity` INT NULL DEFAULT NULL,
  `user_id` BIGINT NULL DEFAULT NULL,
  `order_id` INT NULL DEFAULT NULL,
  `product_id` INT NULL DEFAULT NULL,
  `store_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK5x5y6ey8qdd5tvr8bqg0uwtvu` (`store_id` ASC) VISIBLE,
  CONSTRAINT `FK5x5y6ey8qdd5tvr8bqg0uwtvu`
    FOREIGN KEY (`store_id`)
    REFERENCES `kiotviet`.`store` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `kiotviet`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kiotviet`.`users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NOT NULL,
  `email_verified` BIT(1) NOT NULL,
  `facebook_url` VARCHAR(255) NULL DEFAULT NULL,
  `image_url` VARCHAR(255) NULL DEFAULT NULL,
  `is_confirmed` BIT(1) NULL DEFAULT NULL,
  `is_locked` BIT(1) NULL DEFAULT NULL,
  `name` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `phone` VARCHAR(255) NULL DEFAULT NULL,
  `provider` VARCHAR(255) NOT NULL,
  `provider_id` VARCHAR(255) NULL DEFAULT NULL,
  `time_work_start` VARCHAR(255) NULL DEFAULT NULL,
  `zalo_url` VARCHAR(255) NULL DEFAULT NULL,
  `store_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UK6dotkott2kjsp8vw4d0m25fb7` (`email` ASC) VISIBLE,
  UNIQUE INDEX `UK_du5v5sr43g5bfnji4vb8hg5s3` (`phone` ASC) VISIBLE,
  INDEX `FKhmd3m5tgfs282j7f6svl8kalp` (`store_id` ASC) VISIBLE,
  CONSTRAINT `FKhmd3m5tgfs282j7f6svl8kalp`
    FOREIGN KEY (`store_id`)
    REFERENCES `kiotviet`.`store` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `kiotviet`.`orderbill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kiotviet`.`orderbill` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `order_date` DATETIME NULL DEFAULT NULL,
  `total_price` INT NULL DEFAULT NULL,
  `store_id` INT NULL DEFAULT NULL,
  `user_id` BIGINT NULL DEFAULT NULL,
  `employees_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKoj5f6dnd2qp0h4av78yfbgewf` (`store_id` ASC) VISIBLE,
  INDEX `FKghnvvbvrp8ysbxh6rj7qk8i44` (`user_id` ASC) VISIBLE,
  INDEX `FKq1h3wley47soc5hwsfsoivb9v` (`employees_id` ASC) VISIBLE,
  CONSTRAINT `FKghnvvbvrp8ysbxh6rj7qk8i44`
    FOREIGN KEY (`user_id`)
    REFERENCES `kiotviet`.`users` (`id`),
  CONSTRAINT `FKoj5f6dnd2qp0h4av78yfbgewf`
    FOREIGN KEY (`store_id`)
    REFERENCES `kiotviet`.`store` (`id`),
  CONSTRAINT `FKq1h3wley47soc5hwsfsoivb9v`
    FOREIGN KEY (`employees_id`)
    REFERENCES `kiotviet`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `kiotviet`.`payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kiotviet`.`payment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `amount` INT NULL DEFAULT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `is_lock` BIT(1) NULL DEFAULT NULL,
  `method` VARCHAR(255) NULL DEFAULT NULL,
  `order_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKk1nncvjq3wwwp2fe1s8lwgmce` (`order_id` ASC) VISIBLE,
  CONSTRAINT `FKk1nncvjq3wwwp2fe1s8lwgmce`
    FOREIGN KEY (`order_id`)
    REFERENCES `kiotviet`.`orderbill` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `kiotviet`.`product_media`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kiotviet`.`product_media` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `product_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKish5xtvhdauc3njtkj6j5eyjp` (`product_id` ASC) VISIBLE,
  CONSTRAINT `FKish5xtvhdauc3njtkj6j5eyjp`
    FOREIGN KEY (`product_id`)
    REFERENCES `kiotviet`.`product` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `kiotviet`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kiotviet`.`roles` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(60) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UK_nb4h0p6txrmfc0xbrd1kglp9t` (`name` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `kiotviet`.`supply`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kiotviet`.`supply` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `phone` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `kiotviet`.`stock`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kiotviet`.`stock` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `quantity` DOUBLE NULL DEFAULT NULL,
  `product_id` INT NULL DEFAULT NULL,
  `store_id` INT NULL DEFAULT NULL,
  `supply_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKjghkvw2snnsr5gpct0of7xfcf` (`product_id` ASC) VISIBLE,
  INDEX `FKa9un5jymd7dqr3orbkt9fa74b` (`store_id` ASC) VISIBLE,
  INDEX `FK3sk6bwyif13q81i169394p024` (`supply_id` ASC) VISIBLE,
  CONSTRAINT `FK3sk6bwyif13q81i169394p024`
    FOREIGN KEY (`supply_id`)
    REFERENCES `kiotviet`.`supply` (`id`),
  CONSTRAINT `FKa9un5jymd7dqr3orbkt9fa74b`
    FOREIGN KEY (`store_id`)
    REFERENCES `kiotviet`.`store` (`id`),
  CONSTRAINT `FKjghkvw2snnsr5gpct0of7xfcf`
    FOREIGN KEY (`product_id`)
    REFERENCES `kiotviet`.`product` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `kiotviet`.`supply_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kiotviet`.`supply_product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `quantity` INT NULL DEFAULT NULL,
  `time` DATE NULL DEFAULT NULL,
  `product_id` INT NULL DEFAULT NULL,
  `supply_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKedr6cr5bo16yisvwhx0ykg65u` (`product_id` ASC) VISIBLE,
  INDEX `FKif3awob8xprddg6qr0r301apo` (`supply_id` ASC) VISIBLE,
  CONSTRAINT `FKedr6cr5bo16yisvwhx0ykg65u`
    FOREIGN KEY (`product_id`)
    REFERENCES `kiotviet`.`product` (`id`),
  CONSTRAINT `FKif3awob8xprddg6qr0r301apo`
    FOREIGN KEY (`supply_id`)
    REFERENCES `kiotviet`.`supply` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `kiotviet`.`user_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kiotviet`.`user_roles` (
  `user_id` BIGINT NOT NULL,
  `role_id` BIGINT NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
  INDEX `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id` ASC) VISIBLE,
  CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6`
    FOREIGN KEY (`role_id`)
    REFERENCES `kiotviet`.`roles` (`id`),
  CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f`
    FOREIGN KEY (`user_id`)
    REFERENCES `kiotviet`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
