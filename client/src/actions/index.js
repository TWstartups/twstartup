import { SIGN_UP, LOG_IN, LOG_OUT, ERR_MSG_RESET, FETCH_USER, CREATE_CANDI, FETCH_CANDI, FETCH_CANDIS, APPROVE_CANDI, FETCH_COMPS, FETCH_COMP, EDIT_COMP } from './types'
import privateAPI from '../apis/private'
import publicAPI from '../apis/public'
import history from '../history'

export const signUp = formValues => async dispatch => {
  // redux thunk will take the returned function and invoke it, after that, it will pass it back to the dispatch and go through reduc thunk again. this time, the disptch is return a plain opbject which redux thunk will not do anything but pass it through.
  try {
    const response = await publicAPI.post('./signup', { formValues })
    dispatch({
      type: SIGN_UP,
      payload: response.data
    })
    // implement programmatic navigation
    history.push('/')
  } catch (err) {
    dispatch({
      type: SIGN_UP,
      payload: { err: err.response.data.message }
    })
  }
}

export const logIn = formValues => async dispatch => {
  try {
    const response = await publicAPI.post('./login', { formValues })
    dispatch({
      type: LOG_IN,
      payload: response.data
    })
    history.push('/')
  } catch (err) {
    if (err.response && err.response.status) {
      dispatch({
        type: LOG_IN,
        payload: { err: err.response.data.message }
      })
    }
  }
}

export const logOut = () => dispatch => {
  history.push('/')
  dispatch({
    type: LOG_OUT
  })
}

export const errMsgReset = () => {
  return {
    type: ERR_MSG_RESET
  }
}

export const fetchUser = () => async dispatch => {
  try {
    const response = await privateAPI.get('./profile')
    dispatch({
      type: FETCH_USER,
      payload: response.data
    })
  } catch (err) {
    console.log(err.response.data.message)
  }
}

export const createCandi = formValues => async dispatch => {
  try {
    const response = await privateAPI.post('/api/candidate/create', { formValues })

    dispatch({
      type: CREATE_CANDI,
      payload: response.data
    })
    console.log('here after candi')
    history.push('/apply/success')
  } catch (err) {
    console.log(err.response)
    if (err.response.status === 403) {
      window.location = '#/login'
    }
    dispatch({
      type: CREATE_CANDI,
      payload: { err: err.response.data.message }
    })
  }
}

export const fetchCandi = (candidateId) => async dispatch => {
  try {
    const response = await privateAPI.get(`/api/candidate/${candidateId}`)
    dispatch({
      type: FETCH_CANDI,
      payload: response.data
    })
  } catch (err) {
    if (err.response.status === 403) {
      window.location = '#/login'
    }
    dispatch({
      type: FETCH_CANDI,
      payload: { err: err.response.data.message }
    })
  }
}

export const fetchCandis = () => async dispatch => {
  try {
    const response = await privateAPI.get('/api/candidate/all')
    dispatch({
      type: FETCH_CANDIS,
      payload: response.data
    })
  } catch (err) {
    // if (err.response.status === 403) {
    //   window.location = '#/login';
    // }
    console.log('err for fetchCandis', err)
    dispatch({
      type: FETCH_CANDIS,
      payload: { err: err.response.data.message }
    })
  }
}

export const approveCandi = (candiId, approverId) => async dispatch => {
  try {
    const response = await privateAPI.post(`/api/candidate/approve/${candiId}`, { approverId })
    dispatch({
      type: APPROVE_CANDI,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: APPROVE_CANDI,
      payload: { err: err.response.data.message }
    })
  }
}

export const fetchComps = () => async dispatch => {
  try {
    const response = await publicAPI.get('/company/all')
    dispatch({
      type: FETCH_COMPS,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: FETCH_COMPS,
      payload: { err: err.response ? err.response.data.message : '' }
    })
  }
}

export const fetchComp = (id) => async dispatch => {
  try {
    const response = await publicAPI.get(`/company/${id}`)
    dispatch({
      type: FETCH_COMP,
      payload: response.data
    })
  } catch (err) {
    console.log(err.response)
    dispatch({
      type: FETCH_COMP,
      payload: { err: 'err.response.data.message' }
    })
  }
}

export const editComp = (id, formValues) => (dispatch) => {
  return privateAPI.put(`/api/company/edit/${id}`, formValues)
    .then(res => {
      dispatch({
        type: EDIT_COMP,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: EDIT_COMP,
        payload: { err: err.response.data.message }
      })
    })
}
