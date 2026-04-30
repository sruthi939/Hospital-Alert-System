const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');

// Route to create a new alert
router.post('/', alertController.createAlert);

// Route to get all active alerts
router.get('/', alertController.getActiveAlerts);

// Route to update an alert status
router.put('/:id/status', alertController.updateAlertStatus);

module.exports = router;
