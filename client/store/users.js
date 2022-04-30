import axios from "axios";

const SET_USERS = "SET_USERS";
const UPDATE_PROFILE = "UPDATE_PROFILE";

const token = window.localStorage.getItem("token");

export const setUsers = () => {
  return async (dispatch) => {
    const users = (
      await axios.get("/api/users", {
        headers: {
          authorization: token,
        },
      })
    ).data;
    dispatch({ type: SET_USERS, users });
  };
};

export const updateProfile = (id, username) => {
  return async (dispatch) => {
    const user = (await axios.put(`/api/users/${id}`, { username })).data;
    dispatch({ type: UPDATE_PROFILE, user });
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    case UPDATE_PROFILE:
      return state.map((user) =>
        user.id !== action.user.id ? user : action.user
      );
    default:
      return state;
  }
}
