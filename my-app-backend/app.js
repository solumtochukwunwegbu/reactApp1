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
    SELECT id, username, first_name, middle_name, last_name,
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

// User login
app.post('/api/login', (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: 'Username/email and password are required' });
  }

  const sql = `
    SELECT id, username, password, email, first_name, middle_name, last_name,
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

    const { password: _, ...safeUser } = user;
    res.json(safeUser);
  });
});

// Get user by email (for settings page)
app.post('/api/user', (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required' });

  const sql = `
    SELECT id, username, email, first_name, middle_name, last_name,
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

// Update user by ID
app.post('/api/user/update', (req, res) => {
  const {
    id,
    username,
    first_name,
    middle_name,
    last_name,
    phone,
    email,
    base_location_state,
    base_location_area,
    password,
  } = req.body;

  if (!id) return res.status(400).json({ message: 'User ID is required' });

  const fields = [];
  const values = [];

  if (username !== undefined) {
    fields.push('username = ?');
    values.push(username);
  }
  if (first_name !== undefined) {
    fields.push('first_name = ?');
    values.push(first_name);
  }
  if (middle_name !== undefined) {
    fields.push('middle_name = ?');
    values.push(middle_name);
  }
  if (last_name !== undefined) {
    fields.push('last_name = ?');
    values.push(last_name);
  }
  if (phone !== undefined) {
    fields.push('phone = ?');
    values.push(phone);
  }
  if (email !== undefined) {
    fields.push('email = ?');
    values.push(email);
  }
  if (base_location_state !== undefined) {
    fields.push('base_location_state = ?');
    values.push(base_location_state);
  }
  if (base_location_area !== undefined) {
    fields.push('base_location_area = ?');
    values.push(base_location_area);
  }
  if (password !== undefined) {
    fields.push('password = ?');
    values.push(password);
  }

  if (fields.length === 0) {
    return res.status(400).json({ message: 'No fields to update' });
  }

  const sql = `
    UPDATE users
    SET ${fields.join(', ')}
    WHERE id = ?
  `;

  values.push(id);

  console.log('📦 Update SQL:', sql);
  console.log('📦 Update values:', values);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    console.log('✅ MySQL affectedRows:', result.affectedRows); // 👈 Add this
    res.json({ message: 'User updated successfully' });
  });

  console.log('✅ Update triggered');
});










// Start server
app.listen(3001, () => console.log('🚀 Server running on http://localhost:3001'));
