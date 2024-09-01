const express = require("express");
const { Stock, Portfolio } = require("./models/userModels");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected Successfully");
    app.listen(process.env.PORT || 5000, (err) => {
      if (err) console.log(err);
      console.log(`running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("Failed to connect", error));
// Add a new stock to the portfolio
app.post("/api/portfolio/:userId/stocks", async (req, res) => {
  try {
    const { userId } = req.params;
    const { script, name, price, urls } = req.body;

    // Find or create the stock
    let stock = await Stock.findOne({ script });
    if (!stock) {
      stock = new Stock({ script, name, price, urls });
      await stock.save();
    }

    // Find the user's portfolio or create a new one
    let portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) {
      portfolio = new Portfolio({ userId, stocks: [stock._id] });
    } else {
      // Add stock to portfolio if it's not already there
      if (!portfolio.stocks.includes(stock._id)) {
        portfolio.stocks.push(stock._id);
      }
    }

    await portfolio.save();
    res
      .status(200)
      .json({ message: "Stock added to portfolio successfully", portfolio });
  } catch (error) {
    res.status(500).json({ message: "Error adding stock to portfolio", error });
  }
});

// Remove a stock from the portfolio
app.delete("/api/portfolio/:userId/stocks/:stockId", async (req, res) => {
  try {
    const { userId, stockId } = req.params;

    // Find the user's portfolio
    const portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    // Remove the stock from the portfolio
    portfolio.stocks = portfolio.stocks.filter(
      (stock) => stock.toString() !== stockId
    );
    await portfolio.save();

    res.status(200).json({
      message: "Stock removed from portfolio successfully",
      portfolio,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing stock from portfolio", error });
  }
});

app.post("/api/portfolio", async (req, res) => {
  try {
    const { userId, name, description } = req.body;

    // Validate the input
    if (!userId || !name) {
      return res
        .status(400)
        .json({ message: "User ID and portfolio name are required" });
    }

    // Create a new portfolio
    const newPortfolio = new Portfolio({
      userId,
      name,
      description,
      stocks: [], // Initially, the portfolio can start with no stocks
    });

    // Save the portfolio to the database
    await newPortfolio.save();

    res.status(201).json({
      message: "Portfolio created successfully",
      portfolio: newPortfolio,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating portfolio", error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server running successfully on port", PORT);
});
