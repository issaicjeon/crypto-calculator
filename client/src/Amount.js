import React from "react";

export default class Amount extends React.Component {
  constructor() {
    super();
    this.state = {
      amount: 0,
    };
  }

  //Update amount to Profit.js
  handleAmountChange = (event) => {
    this.props.getAmount(event.target.value);
  };

  render() {
    return (
      <div>
        <div>
          <a style={{ marginRight: "15px" }}>Enter amount:</a>
          <a style={{ fontSize: "21px" }}>$ </a>
          <input
            className="Input"
            value={this.state.value}
            onChange={this.handleAmountChange}
            placeholder="'1000'"
          ></input>
        </div>
      </div>
    );
  }
}
