DROP DATABASE IF EXISTS gfa_register;
CREATE DATABASE gfa_register;
USE gfa_register;

DROP TABLE IF EXISTS participants_classes;
DROP TABLE IF EXISTS classes;
DROP TABLE IF EXISTS participants;
DROP TABLE IF EXISTS cohorts;

CREATE TABLE participants (
  id           INT AUTO_INCREMENT,
  is_mentor    BOOLEAN DEFAULT false,
  first_name   VARCHAR(30) NOT NULL,
  last_name    VARCHAR(30) NOT NULL,
  email        VARCHAR(30),
  phone_number VARCHAR(30),
  is_deleted   BOOLEAN DEFAULT false, -- soft delete
  PRIMARY KEY (id),
  UNIQUE (email),
  UNIQUE (phone_number)
);

CREATE TABLE cohorts (
  id   INT AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE classes (
  id         INT AUTO_INCREMENT,
  name       VARCHAR(120) NOT NULL,
  start_date DATE,
  end_date   DATE,
  cohort_id  INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (cohort_id) REFERENCES cohorts(id)
);

CREATE TABLE participants_classes (
  participant_id INT NOT NULL,
  class_id INT NOT NULL,
  PRIMARY KEY (participant_id, class_id),
  FOREIGN KEY (participant_id) REFERENCES participants(id),
  FOREIGN KEY (class_id) REFERENCES classes(id)
);

INSERT INTO participants (is_mentor, first_name, last_name, email, phone_number)
VALUES
    (true, 'György', 'Szántó','gyszanto@greenfoxacademy.com', '+36709873466'),
    (false, 'Olga', 'Faragó', 'ofarago@yahoo.com', '+36706353246'),
    (false, 'Zsófia', 'Pusztai', 'zspusztai@gmail.com', '+36309546765'),
    (false, 'Adolf', 'Czinege','aczinege@gmail.com', '+363099553321'),
    (true, 'Rita', 'Dobos','rdobos@greenfoxacademy.com', '+36303648237'),
    (false, 'Luca', 'Kárpáti','lkarpati@gmail.com', '+36205528647'),
    (false, 'Károly', 'Görög','kgorog@outlook.com', '+36208493286'),
    (false, 'Emil', 'Horváth','ehorvath@gmail.com', '+36303232753'),
    (false, 'Bernadett', 'Ruzsa','bruzsa@yahoo.com', '+36708785746'),
    (true, 'János', 'Tar','jtar@greenfoxacademy.com', '+36203664778'),
    (false, 'Zsófia', 'Bálint','zsbalint@gmail.com', '+36203856634'),
    (false, 'Rudolf', 'Kató','rkato@gmail.com', '+36308844367'),
    (false, 'Eszter', 'Pataki','epataki@yahoo.com', '+36704728844'),
    (false, 'Krisztofer', 'Vida','kvida@gmail.com', '+36309338477'),
    (true, 'Károly', 'Takács','ktakacs@greenfoxacademy.com', '+36203558761'),
    (false, 'Szonja', 'Vörös','szvoros@gmail.com', '+36208575467');

INSERT INTO cohorts (name) VALUES ('VULPES'), ('VELOX'), ('LASERS');

INSERT INTO classes (name, start_date, end_date, cohort_id)
VALUES
    ('Chama', '2020-03-01', '2020-06-15', 1),
    ('Griseus', '2021-02-01', '2021-05-15', 2),
    ('Vetulus', '2020-03-01', '2020-10-30', 1);

INSERT INTO participants_classes (participant_id, class_id)
VALUES
    (1, 1),
    (15, 3),
    (5, 1),
    (10, 2),
    (13, 3),
    (2, 1),
    (12, 3),
    (8, 2),
    (14, 3),
    (4, 1),
    (15, 2),
    (6, 2),
    (3, 1),
    (7, 2),
    (11, 3),
    (9, 2),
    (1, 3);
