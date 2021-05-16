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
        <div>
          Enter symbol:
          <input
            style={{ marginLeft: "15px" }}
            className="Input"
            value={this.state.value}
            onChange={this.handleSymbolChange}
            placeholder="'BTC'"
          ></input>
        </div>
      </div>
    );
  }
}
