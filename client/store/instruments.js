import axios from "axios";

const SET_INSTRUMENTS = "SET_INSTRUMENTS";
const UPDATE_INSTRUMENT = "UPDATE_INSTRUMENT";
const DELETE_INSTRUMENT = "DELETE_INSTRUMENT";

export const setInstruments = () => {
  return async (dispatch) => {
    const instruments = (await axios.get("/api/instruments")).data;
    dispatch({ type: SET_INSTRUMENTS, instruments });
  };
};

export const updateInstrument = (instrument) => {
  return async (dispatch) => {
    const updatedInstrument = (
      await axios.put(`/api/instruments/${instrument.id}`, instrument)
    ).data;
    dispatch({ type: UPDATE_INSTRUMENT, updatedInstrument });
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
    case UPDATE_INSTRUMENT:
      return state.map((instrument) => {
        if (instrument.id === action.updatedInstrument.id) {
          return action.updatedInstrument;
        } else return instrument;
      });
    case DELETE_INSTRUMENT:
      return state.filter((instrument) => instrument.id !== action.id);
    default:
      return state;
  }
}
