const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, getMe } = require('../Controller/AdminController');
const { protect } = require('../Middleware/AuthMiddleware');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/me', protect, getMe);

module.exports = router;
