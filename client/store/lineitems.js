import axios from 'axios'

const SET_LINEITEM = 'SET_LINEITEM'

export const setLineitem = () => {
  return async dispatch =>{
    const items = (await axios.get('/api/lineitems')).data
    dispatch({type: SET_LINEITEM, items})
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case SET_LINEITEM:
      return action.items
    default:
      return state
  }
}