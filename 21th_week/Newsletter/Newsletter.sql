DROP DATABASE IF EXISTS newsletter;
CREATE DATABASE newsletter;
USE newsletter;

DROP TABLE IF EXISTS newsletter;

CREATE TABLE newsletter (
  id           INT AUTO_INCREMENT,
      PRIMARY KEY (id),
  name    VARCHAR(30) NOT NULL,
  email	   VARCHAR(30) NOT NULL
);

INSERT INTO newsletter ( name, email)
VALUES
    ( 'György', 'gyszanto@greenfoxacademy.com'),
    ( 'Olga', 'ofarago@yahoo.com'),
    ( 'Zsófia', 'zspusztai@gmail.com');
