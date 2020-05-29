import { SIGN_UP, LOG_IN, LOG_OUT, ERR_MSG_RESET, FETCH_USER } from './types';
import user from '../apis/user';
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
    // history.push('/');
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

  
  


