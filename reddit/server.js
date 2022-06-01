const express = require('express');
const mysql = require('mysql');

const port = 3000;
const app = express();

const pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'abc123',
  database: 'reddit',
  debug: true,
});


app.get('/', (req, res) => {
    res.send('Hello World!')
  })

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

// app.get('/', (req, res) => {
//     // Load index.html from the public folder
//     res.redirect('/index.html');
// });

app.get('/api/reddit', (req, res) => {
   const query = `
   SELECT * FROM reddit.reddit
     `;

     pool.query(query, (err, rows) => {
         if (err) {
             console.error(err);
             res.status(500).send({ message: err.sqlMessage });
             return;
         }
         res.send({ reddit: rows });
     });
 });



app.get('/api/reddit/:id', (req, res) => {
    const query1 = `
    select title from reddit 
    WHERE id= ?   
    `;
    const params = [req.params.id];
    

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
        res.send({ reddit: rows });
    });
});



app.post('/posts', (req, res) => {
    const data = {
        title: req.body.title,
        url: req.body.url,
        timestamp: new Date(),
    };

    // Validation
    if (!data.title) {
        res.status(400).send({ message: 'missing title' });
        return;
    }
    if (!data.url || !data.url.includes(':')) {
        res.status(400).send({ message: 'missing or invalid URL' });
        return;
    }

    const query = `INSERT INTO reddit (title, url, timestamp) VALUES (?, ?, ?)`;
    const params = [data.title, data.url, data.timestamp];

    pool.query(query, params, (error, result) => {
        if (error) {
            res.status(500).send({ message: 'DB error' });
            return;
        }
        res.status(201).send({
            id: result.insertId,
            score: 0,
            ...data
        });
    });
});

app.delete("/posts/:id",(req,res)=> {

    
    const query1 = `
    DELETE FROM reddit WHERE id= ?   
    `;
    const params = [req.params.id];
    

    pool.query(query1, params, (err1) => {
        if (err1) {
            console.error(err1);
            res.status(500).send({ message: err1.sqlMessage });
            return;
        }
       
        res.status(200).send({message: 'done'})
    });



})


function vote(req, res, operator) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).send({ message: 'invalid ID' });
        return;
    }

    const updateQuery = `
        UPDATE reddit SET score = score ${operator} 1 WHERE id = ?
    `;
    const params = [id];

    pool.query(updateQuery, params, (updateErr, updateResult) => {
        if (updateErr) {
            console.error(updateErr);
            res.status(500).send({ message: 'DB error' });
            return;
        }

        if (updateResult.affectedRows === 0) {
            // No row has been updated
            res.status(404).send({ message: 'not found' });
            return;
        }

        const selectQuery = `SELECT * FROM reddit WHERE id = ?`;

        pool.query(selectQuery, params, (selectErr, rows) => {
            if (selectErr) {
                console.error(selectErr);
                res.status(500).send({ message: 'DB error' });
                return;
            }

            if (rows.length === 0) {
                // Someone has deleted the post since the update
                res.status(410).send({ message: 'Gone' });
                return;
            }

            res.send(rows[0]);
        });
    });
}

app.put('/posts/:id/upvote', (req, res) => vote(req, res, '+'));
app.put('/posts/:id/downvote', (req, res) => vote(req, res, '-'));





app.use('/api/*', (req, res) => {
   // Return 404 errors for the REST API in JSON format
   res.status(404).send({ message: 'Not found' });
});

app.listen(port, () =>
    console.log(`Server running at http://localhost:${port}`));
