// backend/index.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my_app_db',
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Example: Get all users
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Example: Add a user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  db.query(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, name, email });
    }
  );
});

app.listen(3001, () => console.log('Server running on port 3001'));
