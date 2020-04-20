import { actions } from './actions';

let { reg, regSuccess, regFailure } = actions;

const initialState = {
	email: '',
	password: '',
	name: '',
	surname: '',
	isReg: false,
	isError: false,
};

export const registerReducer = (state = initialState, action) => {
	switch (action.type) {
		case reg.toString():
			return {
				...state,
				email: action.payload.email,
				password: action.payload.password,
				name: action.payload.name,
				surname: action.payload.surname,
				isReg: action.payload.isReg,
			};

		case regSuccess.toString():
			return { ...state, isReg: action.payload };

		case regFailure.toString():
			return { ...state, isError: action.payload };

		default:
			return state;
	}
};
