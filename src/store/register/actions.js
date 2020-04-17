export const REGISTER_CHANGE_EMAIL = 'REGISTER_CHANGE_EMAIL';
export const REGISTER_CHANGE_PASSWORD = 'REGISTER_CHANGE_PASSWORD';
export const REGISTER_CHANGE_NAME = 'REGISTER_CHANGE_EMAIL_NAME';
export const REGISTER_CHANGE_SURNAME = 'REGISTER_CHANGE_EMAIL_SURNAME';

export const changeEmail = (email) => {
	return { type: REGISTER_CHANGE_EMAIL, payload: email };
};

export const changePassword = (password) => {
	return { type: REGISTER_CHANGE_PASSWORD, payload: password };
};

export const changeName = (name) => {
	return { type: REGISTER_CHANGE_NAME, payload: name };
};

export const changeSurname = (surname) => {
	return { type: REGISTER_CHANGE_SURNAME, payload: surname };
};
