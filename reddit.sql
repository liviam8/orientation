DROP DATABASE IF EXISTS reddit;
CREATE DATABASE reddit;
USE reddit;

DROP TABLE IF EXISTS reddit;

CREATE TABLE reddit (
  id           INT AUTO_INCREMENT,
      PRIMARY KEY (id),
  title    VARCHAR(30) NOT NULL,
  url	   VARCHAR(30) NOT NULL,
  score INT DEFAULT '0'

);



