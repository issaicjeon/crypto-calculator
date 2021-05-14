import React from "react";
import axios from "axios";
import Symbol from "./Symbol.js";
import Dates from "./Dates.js";
import Amount from "./Amount.js";

export default class Profit extends React.Component {
  constructor() {
    super();
    //initialize buying and selling dates
    var buydate = new Date();
    buydate.setHours(0);
    buydate.setMinutes(0);
    buydate.setSeconds(0);
    var selldate = new Date();
    selldate.setMinutes(selldate.getMinutes() - 1);

    this.state = {
      symbol: "",
      buydate: buydate.getTime(),
      buydatestring: buydate.toLocaleString(),
      selldate: selldate.getTime(),
      selldatestring: selldate.toLocaleString(),
      amount: 0,
      price: 0,
      tmpprice: 0,
    };
  }

  //format profit amount as US currency
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

  updateAmount = (newamount) => {
    this.setState({
      amount: newamount,
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

    axios.post("/selldate", {
      selldate: this.state.selldate,
    });

    axios.get("/price").then((response) => {
      this.setState({
        price: response.data.price,
      });
    });

    axios.get("/tmpprice").then((response) => {
      this.setState({
        tmpprice: response.data.tmpprice,
      });
    });

    axios.post("/amount", {
      amount: this.state.amount,
    });
  };

  render() {
    return (
      <div>
        <Symbol getSymbol={this.updateSymbol}></Symbol>
        <Amount getAmount={this.updateAmount}></Amount>
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
        <div>Amount is: {this.state.amount}</div>
      </div>
    );
  }
}
