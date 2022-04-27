import axios from "axios";

const SET_LINEITEM = "SET_LINEITEM";
const UPDATE_LINEITEM = "UPDATE_LINEITEM";
const CREATE_LINEITEM = "CREATE_LINEITEM";
const DELETE_LINEITEM = "DELETE_LINEITEM";

export const setLineitem = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
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
    const token = window.localStorage.getItem("token");
    if (token) {
      const lineitem = (
        await axios.put(`/api/lineitems/${item.id}`, item, {
          headers: {
            authorization: token,
          },
        })
      ).data;
      dispatch({ type: UPDATE_LINEITEM, lineitem });
    }
  };
};

export const createLineItem = (item) => {
  return async (dispatch) => {
    const newItem = (await axios.post("/api/lineitems", item)).data;
    dispatch({ type: CREATE_LINEITEM, newItem });
  };
};

export const deleteLineitem = (item) => {
  return async (dispatch) => {
    await axios.delete(`/api/lineitems/${item.id}`);
    dispatch({ type: DELETE_LINEITEM, item });
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case SET_LINEITEM:
      return action.lineitems;
    case UPDATE_LINEITEM:
      return state.map((lineitem) =>
        lineitem.id === action.lineitem.id ? action.lineitem : lineitem
      );
    case CREATE_LINEITEM:
      return [...state, action.newItem];
    case DELETE_LINEITEM:
      return state.filter((lineitem) => lineitem.id !== action.item.id);
    default:
      return state;
  }
}
