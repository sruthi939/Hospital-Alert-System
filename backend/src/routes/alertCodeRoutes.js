const express = require('express');
const router = express.Router();
const alertCodeController = require('../controllers/alertCodeController');

router.get('/', alertCodeController.getAlertCodes);
router.post('/', alertCodeController.createAlertCode);
router.put('/:id', alertCodeController.updateAlertCode);
router.delete('/:id', alertCodeController.deleteAlertCode);

module.exports = router;
