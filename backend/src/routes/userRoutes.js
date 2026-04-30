const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// In a real production app, we would add authMiddleware here.
// router.use(require('../middleware/authMiddleware'));

router.get('/', userController.getUsers);
router.post('/', userController.createUser);

module.exports = router;
