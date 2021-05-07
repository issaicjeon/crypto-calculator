import React from "react";
import axios from "axios";

export default class Crypto extends React.Component {
  constructor() {
    super();
    this.state = {
      price: 0,
    };
  }

  buttonClick = () => {
    axios.get("/crypto").then((response) => {
      this.setState({
        price: response.data.price,
      });
    });
  };

  render() {
    return (
      <div>
        What is the current price of DOGE?
        <div>
          <button onClick={this.buttonClick}>Click me!</button>
        </div>
        <div>The current price of DOGE is: {this.state.price}</div>
      </div>
    );
  }
}
