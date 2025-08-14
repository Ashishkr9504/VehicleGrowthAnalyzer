const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Import your existing connection and model
require('dotenv').config();
const connectDB = require("./config/db"); // adjust relative path if needed
const Vehicle = require("./models/Vehicle"); // adjust relative path if needed

async function seed() {
  try {
    await connectDB(); // Connect using your config

    // Read JSON data file
    const dataPath = path.join(__dirname, "vehicle_data_sample.json");
    const vehiclesData = JSON.parse(fs.readFileSync(dataPath, "utf8"));

    // Clear old data
    await Vehicle.deleteMany({});
    console.log("Old vehicle data removed.");

    // Insert new seed data
    await Vehicle.insertMany(vehiclesData);
    console.log("Vehicle data seeded successfully.");

    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding error:", error);
    mongoose.connection.close();
  }
}

seed();