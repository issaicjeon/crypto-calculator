import React from "react";
import axios from "axios";
import Select from "react-select";

//change font color and remove border
const customStyles = {
  option: (provided) => ({
    ...provided,
    color: "#5d6d7e",
  }),
  control: (provided) => ({
    ...provided,
    border: 0,
    boxShadow: "none",
    color: "#5d6d7e",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#5d6d7e",
  }),
};

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

  //update symbol change to Profit.js
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
            styles={customStyles}
          />
        </div>
      </div>
    );
  }
}
