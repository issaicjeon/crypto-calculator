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
var beginDate = "";
var amount = -1;
var exchange = new ccxt.binance();

app.post("/symbol", (req, res) => {
  symbol = req.body.symbol.toUpperCase();
  console.log(symbol);
});

app.post("/date", (req, res) => {
  console.log(req.body.date);
});

app.get("/price", (req, res) => {
  //access exchange and API
  (async () => {
    if (exchange.has["fetchTicker"]) {
      //get ticker info from symbol
      await exchange.loadMarkets();
      if (exchange.symbols.includes(`${symbol}/USDT`)) {
        var info = await exchange.fetchTicker(`${symbol}/USDT`);
        price = info.last;
        console.log(info);
      }
      res.send({ price });
    }
  })();
});
console.log("working");
(async () => {
  let sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  if (exchange.has.fetchOHLCV) {
    await sleep(exchange.rateLimit); // milliseconds
    console.log(
      await exchange.fetchOHLCV(
        "BTC/USDT",
        "1m",
        //TODO: Convert from GMT to EST
        exchange.parse8601("2020-01-01T00:00:00Z"),
        20
      )
    ); // one minute
  }
})();
