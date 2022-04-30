import axios from "axios";

const SET_LINEITEM = "SET_LINEITEM";
const UPDATE_LINEITEM = "UPDATE_LINEITEM";
const CREATE_LINEITEM = "CREATE_LINEITEM";
const DELETE_LINEITEM = "DELETE_LINEITEM";
const RESET_LINEITEMS = "RESET_LINEITEMS";

const token = window.localStorage.getItem("token");

export const setLineitem = () => {
  return async (dispatch) => {
    if (token) {
      const lineitems = (await axios.get("/api/lineitems")).data;
      dispatch({ type: SET_LINEITEM, lineitems });
    } else {
      const cart = JSON.parse(window.localStorage.getItem("cart"));
      dispatch({ type: SET_LINEITEM, lineitems: cart.lineitems });
    }
  };
};

export const updateLineitem = (item) => {
  return async (dispatch) => {
    if (token) {
      const lineitem = (
        await axios.put(`/api/lineitems/${item.id}`, item, {
          headers: {
            authorization: token,
          },
        })
      ).data;
      dispatch({ type: UPDATE_LINEITEM, lineitem });
    } else {
      const cart = JSON.parse(window.localStorage.getItem("cart"));
      cart.lineitems.map((lineitem) => {
        if (lineitem.instrumentId === item.instrumentId) {
          lineitem.quantity = item.quantity;
        }
        return lineitem;
      });
      window.localStorage.setItem("cart", JSON.stringify(cart));

      dispatch({ type: UPDATE_LINEITEM, lineitem: item });
    }
  };
};

export const createLineItem = (item) => {
  return async (dispatch) => {
    if (token) {
      const newItem = (await axios.post("/api/lineitems", item)).data;
      dispatch({ type: CREATE_LINEITEM, newItem });
    } else {
      const cart = JSON.parse(window.localStorage.getItem("cart"));
      console.log(cart);
      cart.lineitems.push(item);
      console.log(cart);

      window.localStorage.setItem("cart", JSON.stringify(cart));

      dispatch({ type: CREATE_LINEITEM, newItem: item });
    }
  };
};

export const deleteLineitem = (item) => {
  return async (dispatch) => {
    if (token) {
      await axios.delete(`/api/lineitems/${item.id}`);
      dispatch({ type: DELETE_LINEITEM, item });
    } else {
      const cart = JSON.parse(window.localStorage.getItem("cart"));
      cart.lineitems.filter(
        (lineitem) => lineitem.instrumentId !== item.instrumentId
      );
      window.localStorage.setItem("cart", JSON.stringify(cart));

      dispatch({ type: DELETE_LINEITEM, item });
    }
  };
};

export const guestCheckout = (cartItems) => {
  return async (dispatch) => {
    window.localStorage.removeItem("cart");
    const lineItems = { lineitems: [] };
    window.localStorage.setItem("cart", JSON.stringify(lineItems));

    const order = (await axios.post("/api/orders")).data;
    for (let i = 0; i < cartItems.length; i++) {
      cartItems[i].orderId = order.id;
      await axios.post("/api/lineitems", cartItems[i]);
    }
    dispatch({ type: RESET_LINEITEMS });
  };
};

export const resetLineitem = () => {
  return {
    type: RESET_LINEITEMS,
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case SET_LINEITEM:
      return action.lineitems;
    case UPDATE_LINEITEM:
      if (action.lineitem.id) {
        return state.map((lineitem) =>
          lineitem.id === action.lineitem.id ? action.lineitem : lineitem
        );
      } else
        return state.map((lineitem) =>
          lineitem.instrumentId === action.lineitem.instrumentId
            ? action.lineitem
            : lineitem
        );
    case CREATE_LINEITEM:
      return [...state, action.newItem];
    case DELETE_LINEITEM:
      return state.filter((lineitem) => lineitem.id !== action.item.id);
    case RESET_LINEITEMS:
      return [];
    default:
      return state;
  }
}
