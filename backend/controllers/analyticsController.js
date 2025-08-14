// controllers/analyticsController.js
const Vehicle = require("../models/Vehicle");
const User = require("../models/User"); 


async function getAnalyticsKpi(req, res) {
  try {
    // Count total vehicles
    const totalVehicles = await Vehicle.countDocuments();

    // Count active users (adjust filter to your logic)
    const activeUsers = await User.countDocuments();

    // Reports generated (example: total number of Report docs)
    const reportsGenerated = await User.countDocuments();

    // New registrations this month
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const newRegistrations = await User.countDocuments({ createdAt: { $gte: firstDay } });

    res.json({
      totalVehicles,
      activeUsers,
      reportsGenerated,
      newRegistrations,
    });
  } catch (err) {
    console.error("Analytics KPI fetch error:", err);
    res.status(500).json({ error: "Failed to fetch analytics KPIs" });
  }
}

module.exports = { getAnalyticsKpi };
