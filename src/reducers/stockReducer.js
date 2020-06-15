import {
  GET_STOCK_DATA,
  UPDATE_CELL_DATA,
  RESET_EDITABLE,
} from "../actions/types";
import { CHART_DATA_TYPE } from "../constants";

const initialState = {
  stockList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STOCK_DATA:
      if (
        !state.stockList ||
        state.stockList.length < 20 ||
        action.payload.length < 20
      ) {
        return { stockList: action.payload };
      } else if (state.stockList.length === 20) {
        let items = state.stockList.map((stock, index) => {
          if (stock["edit"][CHART_DATA_TYPE.CAC40]["edited"] === true) {
            stock[CHART_DATA_TYPE.CAC40] =
              stock["edit"][CHART_DATA_TYPE.CAC40]["value"];
          } else {
            stock[CHART_DATA_TYPE.CAC40] =
              action.payload[index][CHART_DATA_TYPE.CAC40];
          }

          if (stock["edit"][CHART_DATA_TYPE.NASDAQ]["edited"] === true) {
            stock[CHART_DATA_TYPE.NASDAQ] =
              stock["edit"][CHART_DATA_TYPE.NASDAQ]["value"];
          } else {
            stock[CHART_DATA_TYPE.NASDAQ] =
              action.payload[index][CHART_DATA_TYPE.NASDAQ];
          }
          return stock;
        });
        return {
          stockList: items,
        };
      }
      break;
    case UPDATE_CELL_DATA:
      const { index, type, data } = action.payload;
      state.stockList[index][type] = data;
      state.stockList[index]["edit"][type]["edited"] = true;
      state.stockList[index]["edit"][type]["value"] = data;
      return {
        stockList: [...state.stockList],
      };
    case RESET_EDITABLE:
      let arr = state.stockList.map((stock, index) => {
        stock["edit"][CHART_DATA_TYPE.CAC40]["edited"] = false;
        stock["edit"][CHART_DATA_TYPE.NASDAQ]["edited"] = false;
        return stock;
      });
      return {
        stockList: arr,
      };
    default:
      return state;
  }
}
