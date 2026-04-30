const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect all alert routes with JWT authentication
// router.use(authMiddleware); 

router.post('/', alertController.triggerAlert);
router.get('/recent', alertController.getRecentAlerts);
router.put('/:id/status', alertController.updateAlertStatus);

module.exports = router;
