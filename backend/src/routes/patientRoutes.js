const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Patients');
    res.json(rows);
  } catch (err) {
    console.error('FETCH PATIENTS ERROR:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
