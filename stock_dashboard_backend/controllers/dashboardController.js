const db = require('../db');

exports.getDashboard = (req, res) => {
  const userId = req.user.id;

  db.query('SELECT * FROM stocks WHERE user_id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch dashboard data' });
    res.status(200).json({ data: results });
  });
};