import axios from "axios";
import history from "../history";

const SET_INSTRUMENTS = "SET_INSTRUMENTS";
const UPDATE_INVENTORY = "UPDATE_INVENTORY";
const DELETE_INSTRUMENT = "DELETE_INSTRUMENT";

export const setInstruments = (pageNumber = 1, itemsPerPage = 6) => {
  return async (dispatch) => {
    const instruments = (await axios.get("/api/instruments")).data;
    const paginatedInstruments = instruments.slice((pageNumber -1) * itemsPerPage, (pageNumber * itemsPerPage))
    dispatch({ type: SET_INSTRUMENTS, instruments: paginatedInstruments });
  };
};

export const updateInventory = (instrument) => {
  return async (dispatch) => {
    const updatedInventory = (
      await axios.put(`/api/instruments/${instrument.instrumentId}`, instrument)
    ).data;
    dispatch({ type: UPDATE_INVENTORY, updatedInventory });
  };
};

export const deleteInstrument = (id) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    await axios.delete(`/api/instruments/${id}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: DELETE_INSTRUMENT, id });
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case SET_INSTRUMENTS:
      return action.instruments;
    case UPDATE_INVENTORY:
      return state.map((instrument) => {
        if (instrument.id === action.updatedInventory.id) {
          return action.updatedInventory;
        } else return instrument;
      });
    case DELETE_INSTRUMENT:
      return state.filter((instrument) => instrument.id !== action.id);
    default:
      return state;
  }
}
