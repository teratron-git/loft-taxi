import { actions } from './actions';

let { logIn, logOut, logInSuccess, logInFailure, checkIsLogin, logInErrorReset } = actions;

const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

const initialState = {
	email: '',
	password: '',
	isLoggedIn: false,
	error: '',
};

export const authReducer = (state = initialState, action) => {
	console.log('весь стейт', state)

	switch (action.type) {
		case logIn.toString():
			return {
				...state,
				email: action.payload.email,
				password: action.payload.password,
				error: ''
			};

		case logOut.toString():
			localStorage.setItem('isLoggedIn', JSON.stringify(false));
			return {
				...state,
				isLoggedIn: false,
			};

		case checkIsLogin.toString():
			if (isLoggedIn) {
				return {
					...state,
					isLoggedIn: true,
				};
			}
			return state;

		case logInSuccess.toString():
			localStorage.setItem('isLoggedIn', JSON.stringify(true));
			return { ...state, isLoggedIn: action.payload };

		case logInFailure.toString():
			return { ...state, error: action.payload };

		case logInErrorReset.toString():
			return { ...state, error: '' };

		default:
			return state;
	}
};
