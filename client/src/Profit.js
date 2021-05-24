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
      isLoading: null,
      error: 0,
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
    this.setState({
      isLoading: true,
    });

    //Send and get profit from server
    axios.get("/profit").then((response) => {
      this.setState({
        isLoading: false,
        profit: response.data.profit,
      });
    });
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

    //Error handling
    if (!isFinite(String(this.state.amount))) {
      this.setState({
        error: 1,
      });
    }
    if (this.state.buydate > new Date().getTime()) {
      this.setState({
        error: 2,
      });
    } else if (this.state.selldate > new Date().getTime()) {
      this.setState({
        error: 3,
      });
    } else if (this.state.buydate > this.state.selldate) {
      this.setState({
        error: 4,
      });
    }
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
          <button className="Button" onClick={this.buttonClick}>
            Get Profit!
          </button>
        </div>

        {this.state.profit === "error" && this.state.error === 0 && (
          <div style={{ color: "#F1948A" }}>
            This currency is not supported this far back!
          </div>
        )}
        {this.state.error === 1 && (
          <div style={{ color: "#F1948A" }}>Entered amount is invalid!</div>
        )}
        {this.state.error === 2 && (
          <div style={{ color: "#F1948A" }}>
            Buying date is past current time!
          </div>
        )}
        {this.state.error === 3 && (
          <div style={{ color: "#F1948A" }}>
            Selling date is past current time!
          </div>
        )}

        {this.state.error === 4 && (
          <div style={{ color: "#F1948A" }}>
            Buying date is past selling date!
          </div>
        )}

        {/* Loading state while data is being fetched */}
        {this.state.isLoading === true &&
          !this.state.error &&
          this.state.profit !== "error" && <div>Loading...</div>}

        {/* Show profit data */}
        {this.state.isLoading === false &&
          !this.state.error &&
          this.state.profit !== "error" && (
            <div>
              The amount of profit from buying{" "}
              {this.formatter.format(this.state.amount)} of{" "}
              {this.state.symbol.toUpperCase()} from {this.state.buydatestring}{" "}
              to {this.state.selldatestring} is:{" "}
              <div className="Profit">
                {this.state.profit < 0 ? (
                  <a style={{ color: "#F1948A" }}>
                    {this.formatter.format(this.state.profit)}
                  </a>
                ) : (
                  <a style={{ color: "#73c6b6" }}>
                    {this.formatter.format(this.state.profit)}
                  </a>
                )}
              </div>
            </div>
          )}
      </div>
    );
  }
}
