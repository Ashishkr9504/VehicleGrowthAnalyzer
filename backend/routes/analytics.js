const express = require("express");
const router = express.Router();
const { getAnalyticsKpi } = require("../controllers/analyticsController");
// const authMiddleware = require("../middleware/authMiddleware");
router.get("/kpi", getAnalyticsKpi);

module.exports = router;
