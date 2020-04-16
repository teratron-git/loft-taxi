import { ACTION_CHANGE_EMAIL, ACTION_CHANGE_PASSWORD, ACTION_CHANGE_ISLOGGEDIN } from './actions';

const initialState = {
	email: '',
	password: '',
	isLoggedIn: false,
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ACTION_CHANGE_EMAIL':
			return { ...state, email: action.payload };
		case 'ACTION_CHANGE_PASSWORD':
			return { ...state, password: action.payload };
		case 'ACTION_CHANGE_ISLOGGEDIN':
			return { ...state, isLoggedIn: action.payload };

		default:
			return state;
	}
};
