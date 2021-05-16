import "./App.css";
import Profit from "./Profit.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <header className="Header">Cryptocurrency Profit Calculator</header>
        <header className="SubHeader">
          Get the amount of profit from investing in any cryptocurrency at any
          date and time!
          <hr className="Hr" />
        </header>
        <Profit />
      </header>
    </div>
  );
}

export default App;
