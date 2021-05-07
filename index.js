const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.listen(4000, () => console.log("Listening at 3000"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var symbol = "DOGE";

app.get("/crypto", (req, res) => {
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`;
  const options = {
    method: "GET",
    headers: {
      "X-CMC_PRO_API_KEY": "cb701616-6d64-491d-81ed-aecdeff42d99",
    },
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      //var parsed_json = JSON.parse(json);
      console.log(json["data"][symbol].quote.USD.price);
      var price = json["data"][symbol].quote.USD.price;
      res.send({ price });
    });
});
