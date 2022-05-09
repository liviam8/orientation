create TABLE IF NOT EXISTS users  (
	id INT AUTO_INCREMENT, 
    first_name VARCHAR(120) NOT NULL,
    last_name VARCHAR(120) NOT NULL,
    email      VARCHAR(30),
	phone_number VARCHAR(30),
    PRIMARY KEY (id)
    );
    
CREATE TABLE IF NOT EXISTS todo_list (
id INT AUTO_INCREMENT, 
tasks VARCHAR (120) NOT NULL, 
start_date DATE,
end_date   DATE,
PRIMARY KEY (id), 
FOREIGN KEY (id) REFERENCES users(id)
);   

INSERT INTO users ( first_name, last_name, email, phone_number)
VALUES
    ( 'György', 'Szántó','gyszanto@greenfoxacademy.com', '+36709873466'),
    ( 'Olga', 'Faragó', 'ofarago@yahoo.com', '+36706353246'),
    ( 'Zsófia', 'Pusztai', 'zspusztai@gmail.com', '+36309546765'),
    ( 'Adolf', 'Czinege','aczinege@gmail.com', '+363099553321'),
    ( 'Rita', 'Dobos','rdobos@greenfoxacademy.com', '+36303648237'),
    ( 'Luca', 'Kárpáti','lkarpati@gmail.com', '+36205528647'),
    ( 'Károly', 'Görög','kgorog@outlook.com', '+36208493286'),
    ('Emil', 'Horváth','ehorvath@gmail.com', '+36303232753'),
    ( 'Bernadett', 'Ruzsa','bruzsa@yahoo.com', '+36708785746'),
    ( 'János', 'Tar','jtar@greenfoxacademy.com', '+36203664778'),
    ('Zsófia', 'Bálint','zsbalint@gmail.com', '+36203856634'),
    ( 'Rudolf', 'Kató','rkato@gmail.com', '+36308844367'),
    ( 'Eszter', 'Pataki','epataki@yahoo.com', '+36704728844'),
    ('Krisztofer', 'Vida','kvida@gmail.com', '+36309338477'),
    ('Károly', 'Takács','ktakacs@greenfoxacademy.com', '+36203558761'),
    ('Szonja', 'Vörös','szvoros@gmail.com', '+36208575467');
    
    
INSERT INTO todo_list (tasks, start_date, end_date, cohort_id)
VALUES
    ('Walk the dog', '2020-03-01', '2020-06-15', 1),
    ('Buy milk', '2021-02-01', '2021-05-15', 2),
    ('Do homework', '2020-03-01', '2020-10-30', 1);
