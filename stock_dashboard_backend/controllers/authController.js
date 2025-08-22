const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

// 📝 Register Controller
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length > 0) return res.status(400).json({ error: 'Email already registered' });

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ error: 'Registration failed' });
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// 🔐 Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length === 0) return res.status(401).json({ error: 'Invalid email or password' });

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

      const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });

      res.status(200).json({ message: 'Login successful', token });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// 🚪 Logout Controller
exports.logout = (req, res) => {
  // Frontend should clear token from localStorage/sessionStorage
  res.status(200).json({ message: 'Logged out successfully' });
};