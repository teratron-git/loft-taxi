import { createAction } from 'redux-actions';
import * as constants from './constants';

export const actions = {
	logIn: createAction(constants.LOGIN),
	logInSuccess: createAction(constants.LOGIN_SUCCESS),
	logInFailure: createAction(constants.LOGIN_FAILURE),
};

export const changeEmail = createAction('AUTH_CHANGE_EMAIL');
export const changePassword = createAction('AUTH_CHANGE_PASSWORD');
export const changeIsLoggedIn = createAction('AUTH_CHANGE_ISLOGGEDIN');
export const changeIsSubmit = createAction('AUTH_CHANGE_ISSUBMIT');
