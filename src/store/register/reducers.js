import { actions } from './actions';

let { reg, regSuccess, regFailure, regErrorReset } = actions;

const initialState = {
	email: '',
	password: '',
	name: '',
	surname: '',
	isReg: false,
	isRegistrating: false,
	error: '',
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
				error: '',
				isRegistrating: true
			};

		case regSuccess.toString():
			return {
				...state,
				isReg: action.payload,
				isRegistrating: false,
				error: 'Пользователь успешно зарегистрирован!'
			};

		case regFailure.toString():
			return {
				...state,
				error: action.payload,
				isRegistrating: false
			};

		case regErrorReset.toString():
			return {
				...state,
				error: '',
				isReg: false,
				isRegistrating: false
			};

		default:
			return state;
	}
};
