const mongoose = require("mongoose");

const insightSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, enum: ["Growth", "Stats", "Trend"], default: "Stats" },
  data: { type: mongoose.Schema.Types.Mixed }, 
  generatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Insight", insightSchema);