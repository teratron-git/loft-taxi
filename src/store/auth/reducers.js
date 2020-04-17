import { changeEmail, changePassword, changeIsLoggedIn, changeIsSubmit } from './actions';

const initialState = {
	email: '',
	password: '',
	isLoggedIn: false,
	isSubmit: false,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case changeEmail.toString():
			return { ...state, email: action.payload };
		case changePassword.toString():
			return { ...state, password: action.payload };
		case changeIsLoggedIn.toString():
			// localStorage.loft = JSON.stringify(state);
			return { ...state, isLoggedIn: action.payload, isSubmit: false };
		case changeIsSubmit.toString():
			return { ...state, isSubmit: action.payload };

		default:
			return state;
	}
};
