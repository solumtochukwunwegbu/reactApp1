const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
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


// Get all users
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


// Add a new user
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





// Login route - lookup by email
app.post('/api/login', (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required' });

  db.query(
    'SELECT name, email FROM users WHERE email = ?',
    [email],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (results.length > 0) {
        res.json(results[0]); // send back user info
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    }
  );
});


// Get user by email (called from settings page using sessionStorage email)
app.post('/api/user', (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required' });

  db.query(
    'SELECT name, email FROM users WHERE email = ?',
    [email],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (results.length > 0) {
        res.json(results[0]); // send back user info
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    }
  );
});


// Start server
app.listen(3001, () => console.log('Server running on port 3001'));
