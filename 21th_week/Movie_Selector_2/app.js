const express = require('express');
const mysql = require('mysql');

const port = 3000;
const app = express();

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abc123',
    database: 'movieselector',
    debug: true,
  });


  pool.connect((err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Connection established");
    }
});


// Serve files from the 'public' folder
app.use(express.static('public'));

// Convert JSON bodies to JavaScript objects
app.use(express.json());

app.get('/', (req, res) => {
  res.redirect('/movieselector.html')
})


app.get('/api/movie/:genre', (req, res) => {
    const query1 = `
    SELECT movie FROM movieselector.movieselector 
    WHERE genre = ?  
    `;
    const params = [req.params.genre];
    

    pool.query(query1, params, (err1, rows) => {
        if (err1) {
            console.error(err1);
            res.status(500).send({ message: err1.sqlMessage });
            return;
        }
        if (rows.length === 0) {
            res.status(404).send({ message: 'Not found' });
            return;
        }
        res.send({ movieSelector: rows });
    });
});

app.get('/api/genre', (req, res) => {
    const query = `
    SELECT DISTINCT genre FROM movieselector.movieselector
      `;
 
      pool.query(query, (err, rows) => {
          if (err) {
              console.error(err);
              res.status(500).send({ message: err.sqlMessage });
              return;
          }
          res.send({ genreSelector: rows });
      });
  });
 
 

app.use('/api/*', (req, res) => {
    // Return 404 errors for the REST API in JSON format
    res.status(404).send({ message: 'Not found' });
 });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


