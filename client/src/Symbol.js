import React from "react";
import axios from "axios";
import Select from "react-select";
import "react-dropdown/style.css";

export default class Symbol extends React.Component {
  constructor() {
    super();
    this.state = {
      symbol: "",
      options: [],
    };
  }

  handleSymbolChange = (symbol) => {
    this.setState({
      symbol,
    });
    this.props.getSymbol(this.state.symbol);
  };

  dropdown = () => {
    axios.get("/currencies").then((response) => {
      this.setState({
        options: response.data.currencies,
      });
      console.log(response.data.currencies);
    });
  };

  render() {
    return (
      <div>
        {this.dropdown()}
        <div>
          Enter symbol:
          <Select
            options={this.state.options}
            // style={{ marginLeft: "15px" }}
            className="Input"
            onChange={this.handleSymbolChange}
            placeholder="'BTC'"
            value={this.state.symbol}
          />
          {this.state.symbol !== "" && <div>{this.state.symbol}</div>}
          {/* <input
            style={{ marginLeft: "15px" }}
            className="Input"
            value={this.state.value}
            onChange={this.handleSymbolChange}
            placeholder="'BTC'"
          ></input> */}
        </div>
      </div>
    );
  }
}
