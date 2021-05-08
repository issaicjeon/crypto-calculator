const express = require("express");
const fetch = require("node-fetch");
const ccxt = require("ccxt");

const app = express();
app.listen(4000, () => console.log("Listening at 4000"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var symbol = "DOGE";

app.get("/crypto", (req, res) => {
  //access exchange and API
  var exchange = new ccxt.binance();
  (async () => {
    if (exchange.has["fetchTicker"]) {
      //get ticker info from symbol
      var info = await exchange.fetchTicker(`${symbol}/USDT`);
      var price = info.last;
      console.log(price);
      res.send({ price });
    }
  })();
});
