import { CREATE_CANDI, FETCH_CANDIS, FETCH_CANDI, APPROVE_CANDI } from '../actions/types'

const INITIAL_STATE = {
  errMsg: null,
  email: null,
  candidate: null,
  candidates: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CREATE_CANDI:
    if (action.payload.err) {
      return { ...state, errMsg: action.payload.err }
    }
    return { ...state, candidate: action.payload.candidate, email: action.payload.candidate.companyEmail }
  case FETCH_CANDI:
    if (action.payload.err) {
      return { ...state, errMsg: action.payload.err }
    }
    return { ...state, candidate: action.payload.candidate, email: action.payload.candidate.companyEmail }
  case FETCH_CANDIS:
    if (action.payload.err) {
      return { ...state, errMsg: action.payload.err }
    }

    return { ...state, candidates: action.payload.candidates }
  case APPROVE_CANDI:
    if (action.payload.err) {
      return { ...state, errMsg: action.payload.err }
    }
    return { ...state, candidate: action.payload.candidate, candidates: action.payload.candidates }
  default:
    return state
  }
}
