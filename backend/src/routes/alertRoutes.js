const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');

router.post('/', alertController.triggerAlert);
router.get('/recent', alertController.getRecentAlerts);

module.exports = router;
