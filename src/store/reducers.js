import { ACTION_CHANGE_EMAIL, ACTION_CHANGE_PASSWORD, ACTION_CHANGE_ISLOGGEDIN } from './actions';

const initialState = {
	email: '1',
	password: '2',
	isLoggedIn: false,
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ACTION_CHANGE_EMAIL':
			return state;
		case 'ACTION_CHANGE_PASSWORD':
			return state;
		case 'ACTION_CHANGE_ISLOGGEDIN':
			return state;

		default:
			return state;
	}
};
