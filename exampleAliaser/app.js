const express = require('express');
const mysql = require('mysql');

const port = 3000;
const app = express();

const pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'abc123',
  database: 'example',
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

app.post('/api/links', (req, res) => {
    const data = {
        URL: req.body.URL,
        alias: req.body.alias,
    };

    // Validation
    if (!data.URL) {
        res.status(400).send({ message: 'missing URL' });
        return;
    }
    if (!data.alias) {
        res.status(400).send({ message: 'missing alias' });
        return;
    }
    const selectquery =  `SELECT id FROM example WHERE alias = ? `;
    const param = [data.alias];
    
    pool.query(selectquery, param, (error, result) => {
        if (error) {
            res.status(500).send({ message: 'DB error' });
            return;
        }

        if (result.length > 0) {
            // Alias exists
            console.log(`Alias exists, length ${result.length} id.0: ${result[0].id} ` )
            res.status(410).send({ message: 'This alias is already in use' });
            const paramid = result[0].id;
            const updatehit = `UPDATE example SET hit = hit +1 WHERE id =${result[0].id} `;
            pool.query(updatehit, paramid)
             
            return;//this will stop execution
        }else{
            const code = Math.floor(Math.random() * 10000);
            const query = `INSERT INTO example (URL, alias, code ) VALUES (?, ?, ?)`;
            const params = [data.URL, data.alias, code];
        
            pool.query(query, params, (error, result) => {
                if (error) {
                    res.status(500).send({ message: 'DB error' });
                    return;
                }
                res.status(201).send({
                    id: result.insertId,
                    secretcode: code,
                    ...data
                });
            });
        }
    });
    
});


app.get('/api/links', (req, res) => {
    const query = `SELECT id, URL, alias FROM example.example`;
 
      pool.query(query, (err, rows) => {
          if (err) {
              console.error(err);
              res.status(500).send({ message: err.sqlMessage });
              return;
          }
          res.send({ example : rows
                });
      });
  });


app.use('/api/*', (req, res) => {
    // Return 404 errors for the REST API in JSON format
    res.status(404).send({ message: 'Not found' });
 });
 
 app.listen(port, () =>
     console.log(`Server running at http://localhost:${port}`));
 