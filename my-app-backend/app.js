const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const upload = multer(); // For parsing multipart/form-data

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

// Get all users (💡 includes `status`)
app.get('/api/users', (req, res) => {
  const sql = `
    SELECT id, username, first_name, middle_name, last_name,
           phone, email, base_location_state, base_location_area,
           status
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

// Get user by email
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

// Update user info
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

  if (username !== undefined) fields.push('username = ?'), values.push(username);
  if (first_name !== undefined) fields.push('first_name = ?'), values.push(first_name);
  if (middle_name !== undefined) fields.push('middle_name = ?'), values.push(middle_name);
  if (last_name !== undefined) fields.push('last_name = ?'), values.push(last_name);
  if (phone !== undefined) fields.push('phone = ?'), values.push(phone);
  if (email !== undefined) fields.push('email = ?'), values.push(email);
  if (base_location_state !== undefined) fields.push('base_location_state = ?'), values.push(base_location_state);
  if (base_location_area !== undefined) fields.push('base_location_area = ?'), values.push(base_location_area);
  if (password !== undefined) fields.push('password = ?'), values.push(password);

  if (fields.length === 0) {
    return res.status(400).json({ message: 'No fields to update' });
  }

  const sql = `
    UPDATE users
    SET ${fields.join(', ')}
    WHERE id = ?
  `;

  values.push(id);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.json({ message: 'User updated successfully' });
  });
});


// Update user status
app.post('/api/user/status', (req, res) => {
  const { id, status } = req.body;
  if (!id || !status) return res.status(400).json({ message: 'Missing data' });

  const sql = `UPDATE users SET status = ? WHERE id = ?`;
  db.query(sql, [status, id], (err) => {
    if (err) return res.status(500).json({ message: 'Update failed' });
    res.json({ message: 'Status updated' });
  });
});



// Submit Merchant details
app.post('/api/submit-service', upload.single('receipt'), (req, res) => {
  const {
    TerminalID, MerchantName, Address, TerminalKey,
    phone, appName, appVersion, ptsp,
    serial, type, model, connectivity, network,
    latitude, longitude, comment, commentOther, user_id // Add this
  } = req.body;

  const receipt = req.file ? req.file.buffer : null;

  const sql = `
    INSERT INTO merchants (
      TerminalID, MerchantName, Address, TerminalKey,
      phone, appName, appVersion, ptsp,
      serial, type, model, connectivity, network,
      latitude, longitude, comment, commentOther, receipt, user_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    TerminalID, MerchantName, Address, TerminalKey,
    phone, appName, appVersion, ptsp,
    serial, type, model, connectivity, network,
    latitude, longitude, comment, commentOther, receipt, user_id // Include user_id
  ], (err, result) => {
    if (err) {
      console.error('Merchant insert error:', err);
      return res.status(500).json({ message: 'Database insert error' });
    }
    res.json({ message: 'Merchant submitted successfully' });
  });
});



// Get all merchants
app.get('/api/merchants', (req, res) => {
  db.query('SELECT * FROM merchants', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching merchants' });
    res.json(results);
  });
});




app.post('/api/merchant/update', (req, res) => {
  const {
    id, TerminalID, MerchantName, Address, TerminalKey, phone,
    appName, appVersion, ptsp, serial, type, model,
    connectivity, network, latitude, longitude, comment, commentOther
  } = req.body;

  if (!id) return res.status(400).json({ message: 'Merchant ID is required' });

  const sql = `
    UPDATE merchants
    SET TerminalID = ?, MerchantName = ?, Address = ?, TerminalKey = ?, phone = ?,
        appName = ?, appVersion = ?, ptsp = ?, serial = ?, type = ?, model = ?,
        connectivity = ?, network = ?, latitude = ?, longitude = ?, comment = ?, commentOther = ?
    WHERE id = ?
  `;

  db.query(sql, [
    TerminalID, MerchantName, Address, TerminalKey, phone,
    appName, appVersion, ptsp, serial, type, model,
    connectivity, network, latitude, longitude, comment, commentOther, id
  ], (err) => {
    if (err) {
      console.error('Merchant update error:', err);
      return res.status(500).json({ message: 'Database update error' });
    }
    res.json({ message: 'Merchant updated successfully' });
  });
});





// Start server
app.listen(3001, () => console.log('🚀 Server running on http://localhost:3001'));
