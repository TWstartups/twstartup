import { FETCH_COMPS, FETCH_COMP } from '../actions/types';

const INITIAL_STATE = {
  errMsg: null,
  companylist: null,
  currentCompany: null
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_COMPS:
      if (action.payload.err){
        return {...state, errMsg: action.payload.err}
      }
      return {...state, companylist: action.payload.companies}
    case FETCH_COMP:
      if (action.payload.err) {
        return {...state, errMsg: action.payload.err}
      }
      return {...state, currentCompany: action.payload.company}
    default: return state;
  }
}