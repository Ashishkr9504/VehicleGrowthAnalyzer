const mongoose = require("mongoose");


const vehicleSchema = new mongoose.Schema({
  year: Number,
  quarter: String,
  manufacturer: String,
  vehicleType: String,  
  vehicles: Number,
});
module.exports = mongoose.model("Vehicle", vehicleSchema);
