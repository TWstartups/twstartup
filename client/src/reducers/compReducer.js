import { FETCH_COMPS } from '../actions/types';

const INITIAL_STATE = {
  errMsg: null,
  companylist: null,
  currentCompany: null
}

export default (state = INITIAL_STATE, action) => {
  switch(action, type) {
    case FETCH_COMPS:
      if (action.payload.err){
        return {...state, errMsg: action.payload.err}
      }
      return {...state, companylist: action.payload.companies}
    default: return state;
  }
}