const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  
    password: 'suyash@2005',
    database: 'newcommentsDB'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

// Route to get all comments
// POST endpoint to save comments
app.post('/comments', (req, res) => {
    const { name, message, postId } = req.body;
    if (!name || !message || !postId) {
        return res.status(400).send('Name, message, and postId are required');
    }
    db.query('INSERT INTO comments (name, message, postId) VALUES (?, ?, ?)', [name, message, postId], (err, results) => {
        if (err) throw err;
        res.json({ name, message, postId, id: results.insertId });
    });
});

// GET endpoint to fetch comments based on postId
app.get('/comments', (req, res) => {
    const { postId } = req.query;
    if (!postId) {
        return res.status(400).send('postId is required');
    }

    db.query('SELECT * FROM comments WHERE postId = ? ORDER BY date DESC', [postId], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
