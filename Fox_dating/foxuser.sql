#SELECT * FROM example.example;
#UPDATE example SET hit = hit +1 WHERE id =5
#DROP DATABASE IF EXISTS foxdate;
#CREATE DATABASE foxdate;
USE foxdate;

DROP TABLE IF EXISTS foxuser;

CREATE TABLE foxuser (
  id   INT AUTO_INCREMENT,
      PRIMARY KEY (id),
	username VARCHAR(16) NOT NULL,
    nickname VARCHAR(16) NOT NULL,
    birthyear VARCHAR (4) NOT NULL, 
	URL    VARCHAR(256) NOT NULL,
    iam INT NOT NULL,
    looking4 INT NOT NULL, 
    aboutme VARCHAR (256) NULL
);

INSERT INTO foxuser ( username, nickname, birthyear, URL, iam, looking4, aboutme)
VALUES
    ( 'brad63', 'brad', '1963', 'http://www.nemtudom.hu', 1 , 2, 'i am smart and wealthy');
