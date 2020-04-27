import { actions } from './actions';

let { reg, regSuccess, regFailure, regErrorReset } = actions;

const initialState = {
	email: '',
	password: '',
	name: '',
	surname: '',
	isReg: false,
	error: '',
};

export const registerReducer = (state = initialState, action) => {
	console.log('весь стейт', state)

	switch (action.type) {
		case reg.toString():
			return {
				...state,
				email: action.payload.email,
				password: action.payload.password,
				name: action.payload.name,
				surname: action.payload.surname,
				error: ''
			};

		case regSuccess.toString():
			return { ...state, isReg: action.payload };

		case regFailure.toString():
			return { ...state, error: action.payload };

		case regErrorReset.toString():
			return {
				...state,
				error: '',
				isReg: false
			};

		default:
			return state;
	}
};
