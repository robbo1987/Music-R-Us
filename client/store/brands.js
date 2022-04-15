import axios from 'axios'
import history from '../history'

const SET_BRANDS = 'SET_BRANDS'

export const setBrands = () => {
  return async dispatch =>{
    const brands = (await axios.get('/api/brands')).data
    dispatch({type: SET_BRANDS, brands})
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case SET_BRANDS:
      return action.brands
    default:
      return state
  }
}
