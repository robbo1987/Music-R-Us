import axios from "axios";
import history from "../history";
import { setOrders, setLineitem } from "../store";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";
const UPDATE_AUTH = "UPDATE_AUTH"

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });
const updateAuth = updatedUser => ({type: UPDATE_AUTH, updatedUser})

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    console.log(res.data.correctPassword);
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
      dispatch(setOrders());
      dispatch(setLineitem());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const updateProfile = (user) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    console.log(token);
    console.log("user", user);
    const updatedUser = (
      await axios.put("/auth/me", user, {
        headers: {
          authorization: token,
        },
      })
    ).data;
    return dispatch(updateAuth(updatedUser))
    // const profile = await axios.put(
    //   "/auth/me",
    //   { username, },
    //   {
    //     headers: {
    //       authorization: token,
    //     },
    //   }
    // );
    // return dispatch(setAuth(profile.data));
  };
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/login");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    case UPDATE_AUTH:
      return action.updatedUser;
    default:
      return state;
  }
}
