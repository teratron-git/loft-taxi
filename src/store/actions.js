export const ACTION_CHANGE_EMAIL = 'ACTION_CHANGE_EMAIL';
export const ACTION_CHANGE_PASSWORD = 'ACTION_CHANGE_PASSWORD';
export const ACTION_CHANGE_ISLOGGEDIN = 'ACTION_CHANGE_ISLOGGEDIN';

export const changeEmail = (email) => {
	return { type: 'ACTION_CHANGE_EMAIL', payload: email };
};

export const changePassword = (password) => {
	return { type: 'ACTION_CHANGE_PASSWORD', payload: password };
};

export const changeIsLoggedIn = (isLoggedIn) => {
	return { type: 'ACTION_CHANGE_ISLOGGEDIN', payload: isLoggedIn };
};
