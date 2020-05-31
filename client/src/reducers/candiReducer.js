import { CREATE_CANDI, FETCH_CANDIS } from '../actions/types';

const INITIAL_STATE = {
  errMsg: null,
  email: null,
  candidate: null,
  candidates:null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_CANDI: 
      if (action.payload.err){
        return {...state, errMsg: action.payload.err}
      }
      return {...state, candidate:action.payload.candidate,email:action.payload.candidate.company_email}
    case FETCH_CANDIS:
      if (action.payload.err){
        return {...state, errMsg: action.payload.err}
      }
      console.log('in reducer', action.payload.candidates)
      return {...state, candidates:action.payload.candidates}
    default:
      return state;
  }
}