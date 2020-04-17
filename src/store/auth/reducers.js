import { AUTH_CHANGE_EMAIL, AUTH_CHANGE_PASSWORD, AUTH_CHANGE_ISLOGGEDIN } from './actions';

const initialState = {
	email: '',
	password: '',
	isLoggedIn: false,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH_CHANGE_EMAIL:
			return { ...state, email: action.payload };
		case AUTH_CHANGE_PASSWORD:
			return { ...state, password: action.payload };
		case AUTH_CHANGE_ISLOGGEDIN:
			return { ...state, isLoggedIn: action.payload };

		default:
			return state;
	}
};
