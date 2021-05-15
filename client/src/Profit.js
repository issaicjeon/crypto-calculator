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
      profit: 0,
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

    axios.post("/amount", {
      amount: this.state.amount,
    });

    axios.get("/profit").then((response) => {
      this.setState({
        profit: response.data.profit,
      });
    });
  };

  render() {
    return (
      <div className="Body">
        <Symbol getSymbol={this.updateSymbol}></Symbol>
        <Amount getAmount={this.updateAmount}></Amount>
        <Dates
          getStartDate={this.updateStartDate}
          getEndDate={this.updateEndDate}
        ></Dates>
        <div>
          <button onClick={this.buttonClick}>Get Profit!</button>
        </div>
        {this.state.profit !== 0 && (
          <div>
            The amount of profit from buying ${this.state.amount} of{" "}
            {this.state.symbol.toUpperCase()} from {this.state.buydatestring} to{" "}
            {this.state.selldatestring} is:{" "}
            {this.formatter.format(this.state.profit)}
          </div>
        )}
      </div>
    );
  }
}
