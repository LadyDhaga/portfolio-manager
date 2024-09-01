const express = require("express");
const { Stock } = require("./models/userModels");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected Successfully");
  })
  .catch((error) => console.log("Failed to connect", error));

// Add a new stock to the portfolio
app.get("/api/stocks/:stockId", (req, res) => {
  const { stockId } = req.params;
  const { script, name, price, exchange, classId, urls } = req.body;

  try {
    const data = request.get(
      `https://www.google.com/finance/quote/${script}:${exchange}`
    );

    res.status(200).json({
      message: "data gathered successfully",
      price,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error getting data",
      error,
    });
  }
});

app.post("/api/stocks", async (req, res) => {
  try {
    // const { stockId } = req.params;
    const { script, name, price, exchange, classId, urls } = req.body;

    // Find or create the stock
    let stock = await Stock.findOne({ script });
    if (!stock) {
      stock = new Stock({ script, name, price, exchange, classId, urls });
      await stock.save();
    }
    res.status(200).json({
      message: "Stock added to watchlist successfully",
      stock,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding new stock to watchlist", error });
  }
});

// Remove a stock from the portfolio
app.delete("/api/stocks/:stockId", async (req, res) => {
  try {
    const { stockId } = req.params;
    let stock = await Stock.findByIdAndDelete(stockId);

    res.status(200).json({
      message: "Stock removed successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error removing stock", error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server running successfully on port", PORT);
});
