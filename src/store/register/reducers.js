import { changeEmail, changePassword, changeName, changeSurname } from './actions';

const initialState = {
	email: '',
	password: '',
	name: '',
	surname: '',
};

export const registerReducer = (state = initialState, action) => {
	switch (action.type) {
		case changeEmail.toString():
			return { ...state, email: action.payload };
		case changePassword.toString():
			return { ...state, password: action.payload };
		case changeName.toString():
			return { ...state, name: action.payload };
		case changeSurname.toString():
			return { ...state, surname: action.payload };

		default:
			return state;
	}
};
