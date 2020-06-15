import React, { Component } from "react";
import ContentEditable from "react-contenteditable";
import { Table } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getStockData,
  updateTableCell,
  resetEditable,
} from "../actions/stockActions";
import { CHART_DATA_TYPE } from "../constants";

class StockTable extends Component {
  constructor() {
    super();
    this.state = {
      editChart: false,
    };

    this.timeInterval = null;
  }

  componentDidMount() {
    this.props.getStockData();
    this.timeInterval = setInterval(() => {
      if (this.state.editChart === false) {
        this.props.getStockData();
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  handleKeyPress = (event) => {
    const code = event.keyCode || event.which;
    const char = String.fromCharCode(code);
    const regex = /[0-9]|\./;
    if (!regex.test(char)) {
      event.returnValue = false;
      if (event.preventDefault) event.preventDefault();
    }
  };

  handleChange = (index, dataType, value) => {
    const { updateTableCell } = this.props;
    updateTableCell(index, dataType, value);
  };

  handleAutoChart = () => {
    this.setState({ editChart: !this.state.editChart });
  };

  handleReset = () => {
    this.props.resetEditable();
  };

  render() {
    const { stocks } = this.props;
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <input
            type='checkbox'
            defaultChecked={this.state.editChart}
            onChange={this.handleAutoChart}
          />
          <label htmlFor=''> Edit Chart</label>
          <input
            style={{ marginLeft: "50px" }}
            type='button'
            onClick={this.handleReset}
            value='Reset'
          />
        </div>
        <Table celled>
          <Table.Header></Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              {stocks &&
                stocks.map((data) => (
                  <Table.HeaderCell key={data.index} className='table-header'>
                    {data.index}
                  </Table.HeaderCell>
                ))}
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>CAC40</Table.HeaderCell>
              {stocks &&
                stocks.map((data, index) => (
                  <Table.Cell key={data.index} className='header-center'>
                    <ContentEditable
                      html={data[CHART_DATA_TYPE.CAC40]}
                      disabled={!this.state.editChart}
                      data-column='item'
                      className='content-editable'
                      onKeyPress={this.handleKeyPress}
                      onChange={(event) =>
                        this.handleChange(
                          index,
                          CHART_DATA_TYPE.CAC40,
                          event.target.value
                        )
                      }
                    />
                  </Table.Cell>
                ))}
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>NASDAQ</Table.HeaderCell>
              {stocks &&
                stocks.map((data, index) => (
                  <Table.Cell key={data.index} className='header-center'>
                    <ContentEditable
                      html={data[CHART_DATA_TYPE.NASDAQ]}
                      disabled={!this.state.editChart}
                      data-column='item'
                      className='content-editable'
                      onKeyPress={this.handleKeyPress}
                      onChange={(event) =>
                        this.handleChange(
                          index,
                          CHART_DATA_TYPE.NASDAQ,
                          event.target.value
                        )
                      }
                    />
                  </Table.Cell>
                ))}
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}

StockTable.propTypes = {
  getStockData: PropTypes.func.isRequired,
  updateTableCell: PropTypes.func.isRequired,
  resetEditable: PropTypes.func.isRequired,
  stocks: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  stocks: state.stocks.stockList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getStockData,
      updateTableCell,
      resetEditable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StockTable);
