const axios = require("axios");
const express = require("express");
const request = require("request");
const { NseIndia } = require("stock-nse-india");
const nseIndia = new NseIndia();

const twelvedataKey = "8b5889773a4a44ae9c7955d43fa236b0";

async function currentPrices(symbols) {
  let twelvedataUrl = `https://api.twelvedata.com/price?symbol=${symbols.toString()}&country=India&apikey=${twelvedataKey}`;

  request.get(
    {
      url: twelvedataUrl,
      json: true,
      headers: { "User-Agent": "request" },
    },
    (err, res, data) => {
      if (err) {
        console.log("Error:", err);
      } else if (res.statusCode !== 200) {
        console.log("Status:", res.statusCode);
      } else {
        // data is successfully parsed as a JSON object:
        console.log(data);
      }
    }
  );
}

async function getnseData(symbols) {
  for (const symbol of symbols) {
    try {
      const details = await nseIndia.getEquityDetails(symbol);
      console.log(details);
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
    }
  }
}

