import { createAction } from 'redux-actions';

export const changeEmail = createAction('AUTH_CHANGE_EMAIL');
export const changePassword = createAction('AUTH_CHANGE_PASSWORD');
export const changeIsLoggedIn = createAction('AUTH_CHANGE_ISLOGGEDIN');
export const changeIsSubmit = createAction('AUTH_CHANGE_ISSUBMIT');
