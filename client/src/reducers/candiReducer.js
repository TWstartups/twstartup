import { CREATE_CANDI } from '../actions/types';

const INITIAL_STATE = {
  errMsg: null,
  email: null,
  candidate: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_CANDI: 
      if (action.payload.err){
        return {...state, errMsg: action.payload.err}
      }
      return {...state, candidate:action.payload.candidate,email:action.payload.candidate.company_email}
    default:
      return state;
  }
}