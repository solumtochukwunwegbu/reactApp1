-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR(50) UNIQUE NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     first_name VARCHAR(50) NOT NULL,
--     last_name VARCHAR(50) NOT NULL,
--     middle_name VARCHAR(50),
--     phone VARCHAR(20),
--     email VARCHAR(100) UNIQUE,
--     base_location_state VARCHAR(50),
--     base_location_area VARCHAR(100)
-- );




desc merchants;


ALTER TABLE merchants DROP INDEX fk_user;



drop table users;

SELECT * FROM users;


ALTER TABLE users 
CHANGE activeStatus status ENUM('active', 'suspended') DEFAULT 'active';

SELECT * FROM users WHERE email = 'xenia.reed@example.com';


show databases;




delete from merchants;

SELECT * FROM merchants;




CREATE TABLE `merchants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `TerminalID` varchar(255) DEFAULT NULL,
  `MerchantName` varchar(255) DEFAULT NULL,
  `Address` text,
  `TerminalKey` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `appName` varchar(100) DEFAULT NULL,
  `appVersion` varchar(100) DEFAULT NULL,
  `ptsp` varchar(100) DEFAULT NULL,
  `serial` varchar(255) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `model` varchar(100) DEFAULT NULL,
  `connectivity` varchar(50) DEFAULT NULL,
  `network` varchar(50) DEFAULT NULL,
  `latitude` varchar(50) DEFAULT NULL,
  `longitude` varchar(50) DEFAULT NULL,
  `comment` text,
  `commentOther` text,
  `receipt` longblob,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;



show CREATE table merchants;

DROP TABLE merchants;


ALTER TABLE merchants ADD COLUMN user_id INT;





desc merchants