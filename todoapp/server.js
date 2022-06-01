const express = require('express');
const mysql = require('mysql');

const port = 3000;
const app = express();

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abc123',
    database: 'todolist',
    debug: false,
});

// Serve files from the 'public' folder
app.use(express.static('public'));

// Convert JSON bodies to JavaScript objects
app.use(express.json());







app.get("/api/todos", (req, res) => {
    const query = `SELECT * FROM todolist.todos`;
    pool.query(query, (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send({ message: 'DB error' });
            return;
        }
        res.status(200).send([rows]);
    });
});

app.get("/api/todos/:id", (req, res) => {
    const query1 = `SELECT * FROM todolist.todos WHERE id=?`;
    const params1 = [req.params.id];
    console.log(params1);
    pool.query(query1, params1, (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send({ message: 'DB error' });
            return;
        }
        res.status(200).send([rows]);
    });
});

//false nem működik
app.post('/api/todos', (req, res) => {
    const data = {
        task: req.body.task,
        completed: req.body.completed
    };

    // Validation
    if (!data.task) {
        res.status(400).send({ message: 'task is missing' });
        return;
    }
    if (!data.completed ) {
        data.completed=0;
        
    }

    const query = `INSERT INTO todos (task, completed) VALUES (?, ?)`;
    const params = [data.task, data.completed];

    pool.query(query, params, (error, result) => {
        if (error) {
            res.status(500).send(error.sqlMessage);
            console.log(req.body);
            return;
        }
        res.status(201).send({
            id: result.insertId,
        });
    });
});

app.put('/api/todos/:id', (req, res) => {
    const data = {
        id : req.body.id,
        task : req.body.task,
        completed : req.body.completed,
    };

    // Validation
    if (!data.task) {
        res.status(400).send({ message: 'task is missing' });
        return;
    }
    if (!data.completed ) {
        data.completed = 1;
    }

    const query2 = `UPDATE todolist.todos SET completed = 1 WHERE id=? `;
    const params2 = [data.id, data.task, data.completed];

    pool.query(query2, params2, (error, result) => {
        if (error) {
            res.status(500).send({ message: 'DB error' });
            console.log(req.body);
            return;
        }
        res.status(201).send('updated');
    });
});

app.delete('/api/todos/:id', (req, res) => {
    const query3 = `DELETE from todolist.todos WHERE id=? `;
    const params3 = [req.params.id];
    console.log(params3);

    // Validation
    if (!params3) {
        res.status(400).send({ message: 'id is missing' });
        return;
    }
 
    pool.query(query3, params3, (error, result) => {
        if (error) {
            res.status(500).send({ message: 'DB error' });
            console.log(req.body);
            return;
        }
        res.status(201).send('deleted');
    });
});



pool.connect((err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Connection established");
    }
});



app.get('/', (req, res) => {
    // Load index.html from the public folder
    res.redirect('/index.html');
});


app.use('/api/*', (req, res) => {
    // Return 404 errors for the REST API in JSON format
    res.status(404).send({ message: 'Not found' });
});

app.listen(port, () =>
    console.log(`Server running at http://localhost:${port}`));
