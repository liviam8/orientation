const express = require('express');
const mysql = require('mysql');

const port = 3000;
const app = express();

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abc123',
    database: 'newsletter',
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
  res.redirect('/Newsletter.html')
})





app.post('/subscribe', (req, res) => {
    console.log("Request:" + req.body);
    const data = {
        name: req.body.name,
        email: req.body.email,
    };

    // Validation
    if (!data.name) {
        res.status(400).send({ message: 'Name is missing' });
        return;
    }
    if (!data.email || !data.email.includes('@')) {
        res.status(400).send({ message: 'missing or invalid email address' });
        return;
    }

    const query = `INSERT INTO newsletter (name, email) VALUES (?, ?)`;
    const params = [data.name, data.email];

    pool.query(query, params, (error, result) => {
        if (error) {
            res.status(500).send({ message: 'DB error' });
            return;
        }
        res.status(201).send({
            id: result.insertId,
        });
    });
});








app.use('/api/*', (req, res) => {
    // Return 404 errors for the REST API in JSON format
    res.status(404).send({ message: 'Not found' });
 });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


