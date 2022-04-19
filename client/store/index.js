import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import instruments from './instruments'
import brands from './brands'
import orders from './orders'
import lineitems from './lineitems'

const reducer = combineReducers({ auth, instruments, brands, orders, lineitems })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
export * from './brands'
export * from './instruments'
export * from './orders'
export * from './lineitems'