const express = require("express");
const cors = require("cors");
require('dotenv').config()

const app = express();

app.use(cors());

app.get("/api/markets", async (req, res) => {

const response = await fetch(
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,binancecoin",
  {
    headers: {
      "x-cg-demo-api-key": process.env.COINGECKO_API_KEY
    }
  }
);
const data = await response.json();

res.send(data);
});



app.get('/chart', async(req, res)=>{

      const days = req.query.days || 1;  //default and fallback
      const currentCoinChart = req.query.currentCoinChart || "bitcoin"   //default and fallback
    const response = await fetch(
  `https://api.coingecko.com/api/v3/coins/${currentCoinChart}/market_chart?vs_currency=usd&days=${days}`,
  {
    headers: {
      "x-cg-demo-api-key": process.env.COINGECKO_API_KEY
    }
  }
);

const data = await response.json();
res.send(data)
})






app.listen(process.env.PORT, () => {
  console.log(`Backend running on ${process.env.PORT}`);
});