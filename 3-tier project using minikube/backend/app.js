const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 5000;

const db = mysql.createConnection({
    host: 'database-service', // Kubernetes service name
    user: 'user',
    password: 'password',
    database: 'mydb'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
    console.log('Connected to the MySQL database.');
});

app.get('/data', (req, res) => {
    db.query('SELECT message FROM messages LIMIT 1', (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json({ message: results[0].message });
    });
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});