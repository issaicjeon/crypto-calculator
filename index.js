const express = require("express");
const fetch = require("node-fetch");
const ccxt = require("ccxt");

const app = express();
app.listen(4000, () => console.log("Listening at 4000"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var symbol = "";
var price = -1;
var buydate = "";
var selldate = "";
var amount = -1;
var exchange = new ccxt.binance();

app.post("/symbol", (req, res) => {
  symbol = req.body.symbol.toUpperCase();
  console.log(symbol);
});

app.post("/buydate", (req, res) => {
  buydate = req.body.buydate;
  console.log(buydate);
});

app.post("/selldate", (req, res) => {
  selldate = req.body.selldate;
  console.log(selldate);
});

app.post("/amount", (req, res) => {
  amount = req.body.amount;
  console.log(amount);
});

//get the price of cryptocurrency at the buying date
app.get("/price", (req, res) => {
  (async () => {
    let sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    if (exchange.has.fetchOHLCV) {
      await sleep(exchange.rateLimit); // milliseconds

      var data = await exchange.fetchOHLCV(`${symbol}/USDT`, "1m", buydate, 1);

      price = data[0][4];
      res.send({ price });
      console.log("buy data: " + data);
    }
  })();
});

//get the price of cryptocurrency at the selling date
app.get("/tmpprice", (req, res) => {
  (async () => {
    let sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    if (exchange.has.fetchOHLCV) {
      await sleep(exchange.rateLimit); // milliseconds

      var data = await exchange.fetchOHLCV(`${symbol}/USDT`, "1m", selldate, 1);

      console.log("sell data " + data);
      var tmpprice = data[0][4];
      res.send({ tmpprice });
    }
  })();
});

//TODO: Make sure sell date is after buy date
