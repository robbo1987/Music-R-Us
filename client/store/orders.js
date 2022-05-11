import axios from "axios";

const SET_ORDERS = "SET_ORDERS";
const RESET_ORDERS = "RESET_ORDERS";
const SET_ALLORDERS = "SET_ALLORDERS";
const UPDATE_CART = "UPDATE_CART";

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
        await axios.put(`/api/orders/${order.id}`, order, {
          headers: {
            authorization: token,
          },
        })
      ).data;
      dispatch({ type: SET_ORDERS, orders });
    }
  };
};

export const updateCart = (cart) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const updatedCart = (
        await axios.put(`/api/orders/cart/${cart.id}`, cart, {
          headers: {
            authorization: token,
          },
        })
      ).data;
      dispatch({ type: UPDATE_CART, updatedCart });
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
    case UPDATE_CART:
      return state.map((order) =>
        order.id === action.updatedCart.id ? action.updatedCart : order
      );
    default:
      return state;
  }
}
