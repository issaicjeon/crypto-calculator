import React from "react";
import axios from "axios";

export default class Crypto extends React.Component {
  constructor() {
    super();
    this.state = {
      price: 0,
      symbol: "",
    };
  }

  handleChange = (event) => {
    this.setState({ symbol: event.target.value });
  };

  buttonClick = () => {
    axios
      .post("/symbol", {
        symbol: this.state.symbol,
      })
      .then((response) => {
        console.log(response);
      });
    axios.get("/price").then((response) => {
      this.setState({
        price: response.data.price,
      });
    });
  };

  render() {
    return (
      <div>
        Get the current price of any cryptocurrency:
        <div>
          <form>
            <input
              value={this.state.value}
              onChange={this.handleChange}
            ></input>
          </form>
          <button onClick={this.buttonClick}>Click me!</button>
        </div>
        <div>
          The current price of {this.state.symbol} is: {this.state.price}
          {this.state.price === -1 && <div>Error: Symbol not found</div>}
        </div>
      </div>
    );
  }
}
