const express = require('express');
const router = express.Router();
const signup = require('../controllers/user/signup');
const login = require('../controllers/user/login');
const forgotPassword = require('../controllers/user/forgotPassword');
const { resetPassword } = require('../controllers/user/resetPassword');
// Routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot', forgotPassword);
router.post('/reset-password/:token', resetPassword);
    

module.exports = router;
