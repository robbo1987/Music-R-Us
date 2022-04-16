import axios from 'axios'
import history from '../history'

const SET_INSTRUMENTS = 'SET_INSTRUMENTS'

export const setInstruments = () => {
  return async dispatch =>{
    const instruments = (await axios.get('/api/instruments')).data
    dispatch({type: SET_INSTRUMENTS, instruments})
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case SET_INSTRUMENTS:
      return action.instruments
    default:
      return state
  }
}
