import {
	REGISTER_CHANGE_EMAIL,
	REGISTER_CHANGE_PASSWORD,
	REGISTER_CHANGE_NAME,
	REGISTER_CHANGE_SURNAME,
} from './actions';

const initialState = {
	email: '',
	password: '',
	name: '',
	surname: '',
};

export const registerReducer = (state = initialState, action) => {
	switch (action.type) {
		case REGISTER_CHANGE_EMAIL:
			return { ...state, email: action.payload };
		case REGISTER_CHANGE_PASSWORD:
			return { ...state, password: action.payload };
		case REGISTER_CHANGE_NAME:
			return { ...state, name: action.payload };
		case REGISTER_CHANGE_SURNAME:
			return { ...state, surname: action.payload };

		default:
			return state;
	}
};
