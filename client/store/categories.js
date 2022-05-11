import axios from "axios";

const SET_CATEGORIES = "SET_CATEGORIES";

export const setCategories = () => {
  return async (dispatch) => {
    const categories = (await axios.get("/api/categories")).data;
    dispatch({ type: SET_CATEGORIES, categories });
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}
