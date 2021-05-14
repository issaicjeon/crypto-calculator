import React from "react";

export default class Amount extends React.Component {
  constructor() {
    super();
    this.state = {
      amount: 0,
    };
  }

  handleAmountChange = (event) => {
    this.props.getAmount(event.target.value);
  };

  render() {
    return (
      <div>
        <div>
          Enter amount:{" "}
          <input
            value={this.state.value}
            onChange={this.handleAmountChange}
            placeholder="'$100'"
          ></input>
        </div>
      </div>
    );
  }
}
