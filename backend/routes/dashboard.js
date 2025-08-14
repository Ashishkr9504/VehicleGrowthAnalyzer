const express = require('express');
const router = express.Router();
//  const authMiddleware = require("../middleware/authMiddleware");

const { getDashboard } = require('../controllers/dashboardController');  

router.get("/dashboard", getDashboard);

module.exports = router;


