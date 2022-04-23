import axios from "axios";

const SET_LINEITEM = "SET_LINEITEM";
const UPDATE_LINEITEM = "UPDATE_LINEITEM";
const CREATE_LINEITEM = "CREATE_LINEITEM";

export const setLineitem = () => {
  return async (dispatch) => {
    const lineitems = (await axios.get("/api/lineitems")).data;
    dispatch({ type: SET_LINEITEM, lineitems });
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
  console.log(item);
  return async (dispatch) => {
    const newItem = (await axios.post("/api/lineitems", item)).data;
    dispatch({ type: CREATE_LINEITEM, newItem });
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
    default:
      return state;
  }
}
