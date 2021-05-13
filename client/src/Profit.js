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
      selldate: "",
      selldatestring: "",
      selltime: "",
      price: 0,
      tmpprice: 0,
    };
  }

  formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 5,
  });

  updateSymbol = (newsymbol) => {
    this.setState({
      symbol: newsymbol,
    });
  };

  updateStartDate = (newdate, newdatestring) => {
    this.setState({
      buydate: newdate,
      buydatestring: newdatestring,
    });
  };

  updateEndDate = (newdate, newdatestring) => {
    this.setState({
      selldate: newdate,
      selldatestring: newdatestring,
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

    axios.get("/tmpprice").then((response) => {
      this.setState({
        tmpprice: response.data.price,
      });
    });
  };

  render() {
    return (
      <div>
        <Symbol getSymbol={this.updateSymbol}></Symbol>
        <Dates
          getStartDate={this.updateStartDate}
          getEndDate={this.updateEndDate}
        ></Dates>
        <div>
          <button onClick={this.buttonClick}>Get Profit!</button>
        </div>
        {this.state.price !== 0 && (
          <div>
            The price of {this.state.symbol.toUpperCase()} at{" "}
            {this.state.buydatestring} is:{" "}
            {this.formatter.format(this.state.price)}
            {this.state.price === -1 && <div>Error: Symbol not found</div>}
          </div>
        )}
        {this.state.price !== 0 && (
          <div>
            The price of {this.state.symbol.toUpperCase()} at{" "}
            {this.state.selldatestring} is:{" "}
            {this.formatter.format(this.state.tmpprice)}
            {this.state.price === -1 && <div>Error: Symbol not found</div>}
          </div>
        )}
      </div>
    );
  }
}
