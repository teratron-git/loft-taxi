import { actions } from './actions';

let { logIn, logOut, logInSuccess, logInFailure, checkIsLogin, logInErrorReset } = actions;

const sData = JSON.parse(localStorage.getItem('loft-taxi-state')) || { isLoggedIn: false };
console.log('1', sData)

const initialState = {
	email: '',
	password: '',
	isLoggedIn: false,
	error: '',
	token: ''
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
				token: ''
			};

		case checkIsLogin.toString():
			console.log('4', action)
			if (sData.isLoggedIn) {
				return {
					...state,
					isLoggedIn: sData.isLoggedIn,
					token: sData.token
				};
			}
			return state;

		case logInSuccess.toString():
			localStorage.setItem('loft-taxi-state', JSON.stringify({ isLoggedIn: action.payload.success, token: action.payload.token }))
			// profile: { cardName: null, cardNumber: null, cardExpire: null, cardCvv: null, } }));
			return {
				...state,
				isLoggedIn: action.payload.success,
				token: action.payload.token
			};

		case logInFailure.toString():
			return { ...state, error: action.payload };

		case logInErrorReset.toString():
			return { ...state, error: '' };

		default:
			return state;
	}
};
