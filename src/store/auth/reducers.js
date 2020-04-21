import { actions } from './actions';

let { logIn, logOut, logInSuccess, logInFailure, checkIsLogin } = actions;
const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

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
			return { ...state, isError: action.payload };

		default:
			return state;
	}
};
