import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { connect } from "react-redux";

class StockChart extends Component {
  render() {
    return (
      <LineChart width={1400} height={600} data={this.props.stocks}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='index'
          type='number'
          tickCount={20}
          domain={[1, 20]}
          padding={{ left: 50, right: 50 }}
        />
        <YAxis type='number' tickCount={9} domain={[0, 160]} />
        <Tooltip />
        <Legend iconType='plainline' />
        <Line dataKey='CAC40' stroke='#5e9cd3' type='linear' />
        <Line dataKey='NASDAQ' stroke='#eb7d3c' type='linear' />
      </LineChart>
    );
  }
}

StockChart.propTypes = {
  stocks: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  stocks: state.stocks.stockList,
});

export default connect(mapStateToProps)(StockChart);
