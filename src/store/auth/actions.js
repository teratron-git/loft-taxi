export const AUTH_CHANGE_EMAIL = 'AUTH_CHANGE_EMAIL';
export const AUTH_CHANGE_PASSWORD = 'AUTH_CHANGE_PASSWORD';
export const AUTH_CHANGE_ISLOGGEDIN = 'AUTH_CHANGE_ISLOGGEDIN';

export const changeEmail = (email) => {
	return { type: AUTH_CHANGE_EMAIL, payload: email };
};

export const changePassword = (password) => {
	return { type: AUTH_CHANGE_PASSWORD, payload: password };
};

export const changeIsLoggedIn = (isLoggedIn) => {
	return { type: AUTH_CHANGE_ISLOGGEDIN, payload: isLoggedIn };
};
