// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import data from './data'
import assign from './assign'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  data,
  assign
})

export default rootReducer
