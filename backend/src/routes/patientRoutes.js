const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({}, { strict: false });
const Patient = mongoose.models.Patient || mongoose.model('Patient', patientSchema);

router.get('/', async (req, res) => {
  try {
    const rows = await Patient.find();
    res.json(rows);
  } catch (err) {
    console.error('FETCH PATIENTS ERROR:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
