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
  console.log('✅ Connected to MySQL');
});


// Get all users
app.get('/api/users', (req, res) => {
  const sql = `
    SELECT username, first_name, middle_name, last_name,
           phone, email, base_location_state, base_location_area
    FROM users
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});


// Add a new user
app.post('/api/users', (req, res) => {
  const {
    username, password,
    first_name, middle_name, last_name,
    phone, email, base_location_state, base_location_area
  } = req.body;

  const sql = `
    INSERT INTO users (
      username, password,
      first_name, middle_name, last_name,
      phone, email, base_location_state, base_location_area
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [username, password, first_name, middle_name, last_name, phone, email, base_location_state, base_location_area],
    (err, result) => {
      if (err) {
        console.error('Insert error:', err);
        return res.status(500).json({ error: 'Insert failed' });
      }

      res.json({
        id: result.insertId,
        username, first_name, middle_name, last_name,
        phone, email, base_location_state, base_location_area
      });
    }
  );
});



app.post('/api/login', (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: 'Username/email and password are required' });
  }

  const sql = `
    SELECT username, password, email, first_name, middle_name, last_name,
           phone, base_location_state, base_location_area
    FROM users
    WHERE username = ? OR email = ?
  `;

  db.query(sql, [identifier, identifier], (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Remove password before sending back user info
    const { password: _, ...safeUser } = user;
    res.json(safeUser);
  });
});




// Get user by email (for Settings page)
app.post('/api/user', (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required' });

  const sql = `
    SELECT username, email, first_name, middle_name, last_name,
           phone, base_location_state, base_location_area
    FROM users
    WHERE email = ?
  `;

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});


// Start server
app.listen(3001, () => console.log('🚀 Server running on http://localhost:3001'));
