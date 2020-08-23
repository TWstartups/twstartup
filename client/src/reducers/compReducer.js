import { FETCH_COMPS, FETCH_COMP, EDIT_COMP, ADD_EVENT, DELETE_EVENT } from '../actions/types'

const INITIAL_STATE = {
  errMsg: null,
  companylist: [],
  currentCompany: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_COMPS:
    if (action.payload.err) {
      return { ...state, errMsg: action.payload.err }
    }
    return { ...state, companylist: action.payload.companies }
  case FETCH_COMP:
    if (action.payload.err) {
      return { ...state, errMsg: action.payload.err }
    }
    return { ...state, currentCompany: action.payload.company }
  case EDIT_COMP:
    if (action.payload.err) {
      return { ...state, errMsg: action.payload.err }
    }
    return { ...state, currentCompany: action.payload.company }
  case ADD_EVENT:
    if (action.payload.err) {
      return { ...state, errMsg: action.payload.err }
    }
    return { ...state, currentCompany: action.payload.company }
  case DELETE_EVENT:
    if (action.payload.err) {
      return { ...state, errMsg: action.payload.err }
    }
    return { ...state, currentCompany: action.payload.company }
  default: return state
  }
}
