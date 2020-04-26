import { createAction } from 'redux-actions';
import * as constants from './constants';

export const actions = {
	logIn: createAction(constants.LOGIN),
	logOut: createAction(constants.LOGOUT),
	logInSuccess: createAction(constants.LOGIN_SUCCESS),
	logInFailure: createAction(constants.LOGIN_FAILURE),
	checkIsLogin: createAction(constants.CHECK_IS_LOGIN),
	logInErrorReset: createAction(constants.LOGIN_ERROR_RESET),
};
