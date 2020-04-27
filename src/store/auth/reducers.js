import { actions } from './actions';

let { logIn, logOut, logInSuccess, logInFailure, checkIsLogin, logInErrorReset } = actions;

const sData = JSON.parse(localStorage.getItem('loft-taxi-state'));
console.log('1', sData)

const initialState = {
	email: '',
	password: '',
	isLoggedIn: false,
	error: '',
};

export const authReducer = (state = initialState, action) => {
	console.log('2', sData)
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
			console.log('3', sData)
			localStorage.setItem('loft-taxi-state', JSON.stringify({ isLoggedIn: false }));

			return {
				...state,
				isLoggedIn: false,
			};

		case checkIsLogin.toString():
			if (sData.isLoggedIn) {
				return {
					...state,
					isLoggedIn: true,
				};
			}
			return state;

		case logInSuccess.toString():
			localStorage.setItem('loft-taxi-state', JSON.stringify({ isLoggedIn: true }));
			// profile: { cardName: null, cardNumber: null, cardExpire: null, cardCvv: null, } }));
			return { ...state, isLoggedIn: action.payload };

		case logInFailure.toString():
			return { ...state, error: action.payload };

		case logInErrorReset.toString():
			return { ...state, error: '' };

		default:
			return state;
	}
};
