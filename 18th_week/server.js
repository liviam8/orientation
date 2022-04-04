const express = require('express');
const mysql = require('mysql');

const port = 3000;
const app = express();

const pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'abc123',
  database: 'bookstore',
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
    // Load index.html from the public folder
    res.redirect('/index.html');
});

app.get('/api/booktitle', (req, res) => {
   const query = `
         SELECT book_name FROM book_mast
     `;

     pool.query(query, (err, rows) => {
         if (err) {
             console.error(err);
             res.status(500).send({ message: err.sqlMessage });
             return;
         }
         res.send({ books: rows });
     });
 });

app.get('/api/books', (req, res) => {
    const query = `
    select book_id, book_name, aut_name, cate_descrip, book_price, pub_name from book_mast
    JOIN author on book_mast.aut_id = author.aut_id
    JOIN category on book_mast.cate_id=category.cate_id
    JOIN publisher on book_mast.pub_id=publisher.pub_id;
    
    `;

    pool.query(query, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: err.sqlMessage });
            return;
        }
        res.send({ books: rows });
    });
});


app.post('/api/books', (req, res) => {
    const query1 = `
    SELECT book_name FROM bookstore.book_mast
    WHERE book_id= ?;
    
 
    `;
    const params1 = [
        req.body.book_name,
        
    ];

    pool.query(query1, params1, (err1, result1) => {
        if (err1) {
            console.error(err1);
            res.status(500).send({ message: err1.sqlMessage });
            return;
        }

        // const query2 = `
        //     INSERT INTO participants_classes (participant_id, class_id)
        //     VALUES (?, ?)
        // `;
        // const params2 = [result1.insertId, req.body.class_id];

        // pool.query(query2, params2, (err2) => {
        //     if (err2) {
        //         console.error(err2);
        //         res.status(500).send({ message: err2.sqlMessage });
        //         return;
        //     }

        //     res.status(201).send({ message: 'Success' });
        // // });
    });
});




app.use('/api/*', (req, res) => {
   // Return 404 errors for the REST API in JSON format
   res.status(404).send({ message: 'Not found' });
});

app.listen(port, () =>
    console.log(`Server running at http://localhost:${port}`));
