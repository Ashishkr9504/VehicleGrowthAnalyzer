const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes"); 
const dashboardRoutes = require("./routes/dashboard");
const analyticsRoutes = require("./routes/analytics");

dotenv.config();

const app = express();


app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser()); // 

// MongoDB Connection
const connectDB = require("./config/db");
connectDB();

// Routes
app.use("/api/user", userRoutes);
app.use("/api", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);




// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// app.get("/", (req, res) => {
//   res.send("🚀 Financially Free Backend is Running!");
// });
// app.get("/api/user/login", (req, res) => {
//   res.send("🚀 Financially Free login Backend is Running!");
// });
// app.get("/api/user/login", (req, res) => {
//   res.send("🚀 Financially Free login Backend is Running!");
// });
// app.get("/api/dashboard", (req, res) => {
//   res.send("🚀 Financially Free Dashboard Backend is Running!");
// });
