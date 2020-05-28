import { SIGN_UP, LOG_IN, LOG_OUT } from './types';
import user from '../apis/user';
import history from '../history';

export const signUp = formValues => async dispatch => {
  //redux thunk will take the returned function and invoke it, after that, it will pass it back to the dispatch and go through reduc thunk again. this time, the disptch is return a plain opbject which redux thunk will not do anything but pass it through.
    const response = await user.post('./signup', {formValues});
    dispatch({
      type: SIGN_UP,
      payload: response.data
    })
    //implement programmatic navigation
    history.push('/');
}

export const logIn = formValues => async dispatch => {
  const response = await user.post('./login', {formValues});
  dispatch({
    type: LOG_IN,
    payload: response.data
  })
  history.push('/');
}

export const logOut = () => {
  return {
    type: LOG_OUT
  }
}

  
  


