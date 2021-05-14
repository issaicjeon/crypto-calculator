import React from "react";

export default class Symbol extends React.Component {
  constructor() {
    super();
    this.state = {
      symbol: "",
    };
  }

  handleSymbolChange = (event) => {
    this.props.getSymbol(event.target.value);
  };

  render() {
    return (
      <div>
        Get the current price of any cryptocurrency:
        <div>
          Enter symbol:{" "}
          <input
            value={this.state.value}
            onChange={this.handleSymbolChange}
            placeholder="'BTC'"
          ></input>
        </div>
      </div>
    );
  }
}
