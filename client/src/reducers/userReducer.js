import { SIGN_UP, LOG_IN, LOG_OUT} from '../actions/types';


const INITIAL_STATE = {
    user:null,
};


export default (state =INITIAL_STATE ,action) => {
    switch (action.type) {
        case SIGN_UP:
            //put jwt in local storage for future verify login
            localStorage.setItem('token',action.payload.token)
            //return userObj
            return {...state, user: action.payload.user};
        case LOG_IN:
            localStorage.setItem('token',action.payload.token)
            return {...state, user: action.payload.user}
        case LOG_OUT:
            localStorage.removeItem('token');
            return {...state, user: null}
        default:
            return state;
    }
}