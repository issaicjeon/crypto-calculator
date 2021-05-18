const express = require("express");
const fetch = require("node-fetch");
const ccxt = require("ccxt");

const app = express();
app.listen(4000, () => console.log("Listening at 4000"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var symbol = "";
var buydate = "";
var selldate = "";
var amount = -1;
var exchange = new ccxt.bequant();

// (async () => {
//   console.log(await exchange.loadMarkets());
// })();

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

app.get("/profit", (req, res) => {
  (async () => {
    let sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    if (exchange.has.fetchOHLCV) {
      await sleep(exchange.rateLimit); // milliseconds

      //get buying and selling prices from API
      var buyamount = await exchange.fetchOHLCV(
        `${symbol}/USDT`,
        "1m",
        buydate,
        1
      );
      var sellamount = await exchange.fetchOHLCV(
        `${symbol}/USDT`,
        "1m",
        selldate,
        1
      );

      console.log("buy: " + buyamount);
      console.log("sell: " + sellamount);
      //calculate profit
      var shares = amount / buyamount[0][4];
      var profit = (sellamount[0][4] - buyamount[0][4]) * shares;
      console.log("profit: " + profit);
      res.send({ profit });
    }
  })();
});

/*TODO:
-Add CSS (DONE)
-Change exchange to get data before 2017 (currently using binance) (DONE)
-Be able to enter new times/amounts/symbols after the first time without refreshing page
-Add loading symbol while profit is fetched
-Dropdown of symbols
-Throw error if sell date is after buy date or dates out of range
-Error if symbol incorrect
*/
