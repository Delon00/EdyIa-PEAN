const express = require('express');
const authController = require('../controllers/authController');
const dashboardController = require('../controllers/dashboardController');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/dashboard', dashboardController.dashboard);

module.exports = router;
