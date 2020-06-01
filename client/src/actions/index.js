import { SIGN_UP, LOG_IN, LOG_OUT, ERR_MSG_RESET, FETCH_USER, CREATE_CANDI, FETCH_CANDI, FETCH_CANDIS } from './types';
import user from '../apis/user';
import candidate from '../apis/candidate'
import history from '../history';

export const signUp = formValues => async dispatch => {
  //redux thunk will take the returned function and invoke it, after that, it will pass it back to the dispatch and go through reduc thunk again. this time, the disptch is return a plain opbject which redux thunk will not do anything but pass it through.
  try {
    const response = await user.post('./signup', {formValues});
    dispatch({
      type: SIGN_UP,
      payload: response.data
    })
    //implement programmatic navigation
    history.push('/');
  } catch (err) {
    dispatch({
      type: SIGN_UP,
      payload: {err:err.response.data.message}
    })
  }
    
}

export const logIn = formValues => async dispatch => {
  try {
    const response = await user.post('./login', {formValues});
    dispatch({
      type: LOG_IN,
      payload: response.data
    })
    history.push('/');
  } catch(err) {
    console.log(err.response.data.message)
    dispatch({
      type: LOG_IN,
      payload: {err:err.response.data.message}
    })
  }
    
  
}

export const logOut = () => {
  return {
    type: LOG_OUT
  }
}

export const errMsgReset = () => {
  return {
    type: ERR_MSG_RESET
  }
}

export const fetchUser = token => async dispatch =>{
  console.log(token);
  const response = await user.get(`./user/${token}`);
  dispatch({
    type: FETCH_USER,
    payload: response.data
  })
}

export const createCandi = formValues => async dispatch => {
  try {
    const response = await candidate.post('',{formValues});

    dispatch({
      type: CREATE_CANDI,
      payload: response.data
    })
    history.push('/apply/success');

  } catch (err) {
    dispatch({
      type: CREATE_CANDI,
      payload: {err:err.response.data.message}
    })
  }
}

export const fetchCandi = (candidateId) => async dispatch => {
  const token = localStorage.getItem('token');
  try {
    const response = await candidate.get(`/${candidateId}/${token}`);
    dispatch({
      type: FETCH_CANDI,
      payload: response.data
    })
    
  } catch(err) {
    dispatch({
      type: FETCH_CANDI,
      payload: {err:err.response.data.message}
    })

  }
}

export const fetchCandis = () => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const response = await candidate.get(`/all/${token}`);
    console.log(response);
    dispatch({
      type: FETCH_CANDIS,
      payload: response.data
    })
  } catch (err) {
    
    dispatch({
      type: FETCH_CANDIS,
      payload: {err:err.response.data.message}
    })
    
  }
}


