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

    axios.get("/currencies").then((response) => {
      this.setState({
        options: response.data.currencies,
      });
    });
  }

  handleSymbolChange = (event) => {
    this.setState({
      symbol: event.label,
    });
    this.props.getSymbol(event.label);
  };

  render() {
    const { selectedOption } = this.state.symbol;
    return (
      <div>
        <div>
          Enter symbol:
          <Select
            value={selectedOption}
            options={this.state.options}
            className="Select"
            onChange={this.handleSymbolChange}
            placeholder="'BTC'"
          />
        </div>
      </div>
    );
  }
}
