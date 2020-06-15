import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import StockChart from "./components/StockChart";
import StockTable from "./components/StockTable";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <StockChart />
          <StockTable />
        </div>
      </Provider>
    );
  }
}

export default App;
