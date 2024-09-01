const mongoose = require("mongoose");

// Stock Schema
const stockSchema = new mongoose.Schema({
  script: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  exchange: { type: String, required: true },
  classId: { type: String, required: true },
  urls: {
    nseLink: { type: String },
    screenerLink: { type: String },
    tradingViewLink: { type: String },
  },
});

// Portfolio Schema
// const portfolioSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Assuming you have a User model
//   stocks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stock" }],
// });

// Create models
const Stock = mongoose.model("Stock", stockSchema);
// const Portfolio = mongoose.model("Portfolio", portfolioSchema)pp;

module.exports = { Stock };
