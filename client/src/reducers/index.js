import { combineReducers } from 'redux'
import userReducer from './userReducer'
import candiReducer from './candiReducer'
import { reducer as formReducer } from 'redux-form'
import compReducer from './compReducer'

export default combineReducers({
  user: userReducer,
  form: formReducer,
  candidate: candiReducer,
  company: compReducer
})
