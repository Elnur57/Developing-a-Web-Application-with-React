import * as ACTIONS from './Constants';
import { login, signup, logout } from '../api/apiCalls';

export const logoutSuccess = () => {
    return async function(dispatch) {
        try {
            await logout();
        } catch(err){}
        dispatch({
            type: ACTIONS.LOGOUT_SUCCESS
        })
    }   
};

export const loginSuccess = authState => {
    return {
        type: ACTIONS.LOGIN_SUCCESS,
        payload: authState
    }
};
export const udateSuccess = ( displayName, image ) => {
    return {
        type: ACTIONS.UPDATE_SUCCESS,
        payload: {
            displayName,
            image
        }
    }
};

export const loginHandler = ( credentals ) => {
      return async function (dispatch ){
      const response = await login(credentals);
      const authState = {
        ...response.data.user,
        password: credentals.password,
        token: response.data.token
      };
      dispatch(loginSuccess(authState));
      return response;
    };
};

export const signupHandler =  user  => {
    return async function (dispatch) {
        const response = await signup( user );
        await dispatch ( loginHandler(user));
        return response;
    }
}