DROP DATABASE IF EXISTS movieselector;
CREATE DATABASE movieselector;
USE movieselector;

DROP TABLE IF EXISTS movieselector;

CREATE TABLE movieselector (
  id           INT AUTO_INCREMENT,
      PRIMARY KEY (id),
  genre    VARCHAR(30) NOT NULL,
  movie	   VARCHAR(30) NOT NULL
);

INSERT INTO movieselector ( genre, movie)
VALUES
    ( 'Sci-fi', 'Moon'),
    ( 'Sci-fi', '2001: A Space Odyssey'),
    ( 'Sci-fi', 'Contact'),
    ( 'Drama', 'Darkest Hour'),
    ( 'Drama', 'There Will Be Blood'),
    ( 'Drama', 'American Beauty'),
    ( 'Comedy', 'Airplane!'),
    ( 'Comedy', 'Deadpool'),
    ( 'Comedy', 'Waynes World');
    
    
    
    
    
    
    ;
