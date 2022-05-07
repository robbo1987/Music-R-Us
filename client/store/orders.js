import axios from "axios";
import history from "../history";

const SET_ORDERS = "SET_ORDERS";
const RESET_ORDERS = "RESET_ORDERS";
const SET_ALLORDERS = "SET_ALLORDERS";

export const setOrders = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const orders = (
        await axios.get("/api/orders", {
          headers: {
            authorization: token,
          },
        })
      ).data;
      dispatch({ type: SET_ORDERS, orders });
    }
  };
};

export const setAllOrders = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const orders = (
        await axios.get("/api/orders/admin", {
          headers: {
            authorization: token,
          },
        })
      ).data;
      dispatch({ type: SET_ALLORDERS, orders });
    }
  };
};

export const updateOrder = (order) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const orders = (
        await axios.put(`/api/orders/${order.id}`, null, {
          headers: {
            authorization: token,
          },
        })
      ).data;
      dispatch({ type: SET_ORDERS, orders });
      history.push("/orders");
    }
  };
};

export const resetOrders = () => {
  return {
    type: RESET_ORDERS,
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders;
    case SET_ALLORDERS:
      return [...state, ...action.orders];
    case RESET_ORDERS:
      return [];
    default:
      return state;
  }
}
