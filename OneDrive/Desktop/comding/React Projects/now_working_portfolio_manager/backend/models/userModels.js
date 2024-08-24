const mongoose = require("mongoose");

// Stock Schema
const stockSchema = new mongoose.Schema({
  script: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  urls: {
    nseLink: { type: String, required: true },
    screenerLink: { type: String, required: true },
    tradingViewLink: { type: String, required: true },
  },
});

// Portfolio Schema
const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Assuming you have a User model
  stocks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stock" }],
});

// Create models
const Stock = mongoose.model("Stock", stockSchema);
const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = { Stock, Portfolio };
