import axios from "axios";
import history from "../history";

const SET_INSTRUMENTS = "SET_INSTRUMENTS";
const UPDATE_INVENTORY = "UPDATE_INVENTORY";

export const setInstruments = () => {
  return async (dispatch) => {
    const instruments = (await axios.get("/api/instruments")).data;
    dispatch({ type: SET_INSTRUMENTS, instruments });
  };
};

export const updateInventory = (instrument) => {
  return async (dispatch) => {
    console.log(instrument);
    const updatedInventory = (
      await axios.put(`/api/instruments/${instrument.instrumentId}`, instrument)
    ).data;
    dispatch({ type: UPDATE_INVENTORY, updatedInventory });
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case SET_INSTRUMENTS:
      return action.instruments;
    default:
      return state;
  }
}
