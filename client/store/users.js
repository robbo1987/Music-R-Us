import axios from "axios";

const SET_USERS = "SET_USERS";
const BAN_USER = "BAN_USER";

export const setUsers = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const users = (
      await axios.get("/api/users/admin", {
        headers: {
          authorization: token,
        },
      })
    ).data;
    dispatch({ type: SET_USERS, users });
  };
};

export const banUser = (id) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const user = (
      await axios.put(`/api/users/admin/${id}`, null, {
        headers: {
          authorization: token,
        },
      })
    ).data;
    dispatch({ type: BAN_USER, user });
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    case BAN_USER:
      return state.map((user) =>
        user.id === action.user.id ? action.user : user
      );
    default:
      return state;
  }
}
