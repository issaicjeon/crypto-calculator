import React from "react";
import axios from "axios";
import Symbol from "./Symbol.js";
import Dates from "./Dates.js";

export default class Profit extends React.Component {
  constructor() {
    super();
    this.state = {
      symbol: "",
      buydate: "",
      buydatestring: "",
      buytime: "",
      selldate: "",
      selltime: "",
      price: 0,
    };
  }

  formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  updateSymbol = (newsymbol) => {
    this.setState({
      symbol: newsymbol,
    });
  };

  updateDate = (newdate, newdatestring) => {
    this.setState({
      buydate: newdate,
      buydatestring: newdatestring,
    });
  };

  buttonClick = () => {
    axios.post("/symbol", {
      symbol: this.state.symbol,
    });

    axios.post("/buydate", {
      buydate: this.state.buydate,
    });

    axios.get("/price").then((response) => {
      this.setState({
        price: response.data.price,
      });
    });
  };

  render() {
    return (
      <div>
        <Symbol getSymbol={this.updateSymbol}></Symbol>
        <Dates getDate={this.updateDate}></Dates>
        <div>
          <button onClick={this.buttonClick}>Get Profit!</button>
        </div>
        <div>
          The price of {this.state.symbol} at {this.state.buydatestring} is:{" "}
          {this.formatter.format(this.state.price)}
          {this.state.price === -1 && <div>Error: Symbol not found</div>}
        </div>
      </div>
    );
  }
}
