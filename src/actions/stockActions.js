import { GET_STOCK_DATA, UPDATE_CELL_DATA, RESET_EDITABLE } from "./types";
import Axios from "axios";

export const getStockData = () => async (dispatch) => {
  try {
    const { data } = await Axios.get("http://localhost:8000?count=20");

    const dataList = data.map((item, index) => ({
      index: index + 1,
      CAC40: item.stocks.CAC40.toFixed(2),
      NASDAQ: item.stocks.NASDAQ.toFixed(2),
      edit: {
        CAC40: {
          edited: false,
          value: null,
        },
        NASDAQ: {
          edited: false,
          value: null,
        },
      },
    }));

    return dispatch({
      type: GET_STOCK_DATA,
      payload: dataList,
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateTableCell = (index, type, data) => {
  return {
    type: UPDATE_CELL_DATA,
    payload: { index, type, data },
  };
};

export const resetEditable = () => {
  return {
    type: RESET_EDITABLE,
  };
};
