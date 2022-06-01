const express = require('express');
const mysql = require('mysql');

const port = 3000;
const app = express();

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abc123',
    database: 'foxdate',
    debug: false,
});

// Serve files from the 'public' folder
app.use(express.static('public'));

// Convert JSON bodies to JavaScript objects
app.use(express.json());


app.get('/api/users/:username', (req, res) => {
    const query2 = `SELECT * FROM foxdate.foxuser WHERE username=?`;
    const params2 = [req.params.username];
    console.log(params2);
    pool.query(query2, params2, (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send({ message: 'DB error' });
            return;
        }

        res.send({ foxuser: rows })

    });

});
app.post('/api/users', (req, res) => {
    if (!req.body) {
        res.status(400).send('Missing body');
        return;
    }
    if (!req.body.username) {
        res.status(400).send('Missing username');
        return;
    }
    if (!req.body.nickname) {
        res.status(400).send('Missing nickname');
        return;
    }
    if (!req.body.birthyear) {
        res.status(400).send('Missing birthyear');
        return;
    }
    if (!req.body.url) {
        res.status(400).send('Missing URL');
        return;
    }

    const query1 = `SELECT * FROM foxdate.foxuser WHERE username=?`;
    const params1 = [req.body.username];

    pool.query(query1, params1, (err1, rows) => {
        if (err1) {
            console.error(err1);
            res.status(500).send(err1.sqlMessage);
            return;
        }

        if (rows.length > 0) {
            res.status(400).send('Your username is already in use!');
            return;
        }

        const query2 = `
            INSERT INTO foxuser ( username, nickname, birthyear, URL, iam, looking4, aboutme)

                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

        const params2 = [req.body.username, req.body.nickname, req.body.birthyear, req.body.url, req.body.iam, req.body.looking4, req.body.aboutme];

        pool.query(query2, params2, (err2, result) => {
            if (err2) {
                console.error(err2);
                res.status(500).send(err2.sqlMessage);
                return;
            }
            const data = {
                id: result.insertId,
                username: req.body.username,
                nickname: req.body.nickname,
                birthyear: req.body.birthyear,
                url: req.body.url,
                iam: req.body.iam,
                looking4: req.body.looking4,
                aboutme: req.body.aboutme,
            };
            res.status(201).send(data);
        });
    });
});

app.post('/api/likes', (req, res) => {
    if (!req.body) {
        res.status(400).send('Missing body');
        return;
    }
    const query2 = `INSERT INTO likes ( sourceuser_id, targetuser_id, liked) VALUES (?, ?, ?)`;
    const params2 = [req.body.sourceuser_id, req.body.targetuser_id, req.body.likeflag];
    pool.query(query2, params2, (err2, result) => {
        if (err2) {
            console.error(err2);
            res.status(500).send(err2.sqlMessage);
            return;
        }

        const params3 = [req.body.targetuser_id, req.body.sourceuser_id];
        const query3 = ` SELECT * FROM foxdate.likes WHERE sourceuser_id = ? AND targetuser_id = ? AND liked = 1` 
        pool.query(query3, params3, (err3, result) => {
            if (err3) {
                console.error(err3);
                res.status(500).send(err3.sqlMessage);
                return;
            }
            if (result.length > 0) {
                const query4 = `INSERT INTO matches ( sourceuser_id, targetuser_id) VALUES (?, ?)`;
                const params4 = [req.body.sourceuser_id, req.body.targetuser_id];

                pool.query(query4, params4, (err4, result) => {
                    if (err4) {
                        console.error(err2);
                        res.status(500).send(err2.sqlMessage);
                        return;
                    }
                });
            };
        });

        const data = {
            id: result.insertId,
            sourceuser_id: req.body.sourceuser_id,
            targetuser_id: req.body.targetuser_id,
            likeflag: req.body.likeflag,
        };
        res.status(201).send(data);
    });
});

app.get("/api/random-user", (req, res) => {
    pool.query(`SELECT * FROM foxdate.foxuser ORDER BY RAND() LIMIT 1`, (err5, rows) => {
        if (err5) {
            console.error(err5);
            res.status(500).send(err5.sqlMessage);
            return;
        }

        console.log("Result" + [rows[0]]);
        res.status(200).send([rows[0]]);
        // res.status(201).redirect (`/profiles/${rows.username}`)
    });
});

app.get("/api/profiles/:username", (req, res) => {
    const query2 = `SELECT username FROM foxdate.foxuser WHERE username=?`;
    const params2 = [req.params.username];
    console.log(params2);
    pool.query(query2, params2, (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send({ message: 'DB error' });
            return;
        }
        console.log (rows.username)
        // res.status(201).redirect (`/profiles/${rows.username}`)
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
app.get('/profile.html', (req, res) => {
    // Load index.html from the public folder
    res.redirect('/profile.html');
});

app.use('/api/*', (req, res) => {
    // Return 404 errors for the REST API in JSON format
    res.status(404).send({ message: 'Not found' });
});

app.listen(port, () =>
    console.log(`Server running at http://localhost:${port}`));
