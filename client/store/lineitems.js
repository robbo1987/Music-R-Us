import axios from "axios";

const SET_LINEITEM = "SET_LINEITEM";
const UPDATE_LINEITEM = "UPDATE_LINEITEM";

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

export default function (state = [], action) {
  switch (action.type) {
    case SET_LINEITEM:
      return action.lineitems;
    case SET_LINEITEM:
      return state.map((lineitem) =>
        lineitem.id === action.lineitem.id ? action.lineitem : lineitem
      );
    default:
      return state;
  }
}
