import { actions } from './actions';

let { logIn, logOut, logInSuccess, logInFailure } = actions;

const initialState = {
	email: '',
	password: '',
	isLoggedIn: false,
	isError: false,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case logIn.toString():
			return {
				...state,
				email: action.payload.email,
				password: action.payload.password,
				isLoggedIn: action.payload.isLoggedIn,
			};

		case logOut.toString():
			return {
				...state,
				isLoggedIn: false,
			};

		case logInSuccess.toString():
			return { ...state, isLoggedIn: action.payload };

		case logInFailure.toString():
			return { ...state, isError: action.payload };

		default:
			return state;
	}
};
