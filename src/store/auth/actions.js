import { createAction } from 'redux-actions';
import * as constants from './constants';

export const actions = {
	logIn: createAction(constants.LOGIN),
	logInSuccess: createAction(constants.LOGIN_SUCCESS),
	logInFailure: createAction(constants.LOGIN_FAILURE),
};
