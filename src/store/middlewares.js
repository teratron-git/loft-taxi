import { actions as logInActions } from '../store/auth/actions';
import { actions as registerActions } from '../store/register/actions';

let { logIn, logInSuccess, logInFailure } = logInActions;
let { reg, regSuccess, regFailure } = registerActions;

export const serverRequestMiddleware = (store) => (next) => (action) => {
	const sendDataToServer = async (url, data) => {
		data = JSON.stringify(data);
		let response = await fetch(url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: data,
		});
		console.log('Послыем: ', data);
		let result = await response.json();
		if (response.ok) {
			console.log('Ответ сервера: ', result);
		}
		return result;
	};

	let result = next(action);

	if (action.type === logIn.toString()) {
		console.log('---LOG', store.getState());

		const dataAuth = {
			email: store.getState().auth.email,
			password: store.getState().auth.password,
		};
		const urlAuth = 'https://loft-taxi.glitch.me/auth';

		let result = sendDataToServer(urlAuth, dataAuth);

		result.then((data) => {
			console.log('Авторизация успешна?', data.success);
			store.dispatch(logInSuccess(data.success));
			if (!data.success) console.log('ОШИБКА', data.error);
		});
	}

	if (action.type === reg.toString()) {
		console.log('---REG', store.getState());

		const dataRegister = {
			email: store.getState().register.email,
			password: store.getState().register.password,
			name: store.getState().register.name,
			surname: store.getState().register.surname,
		};
		const urlRegister = 'https://loft-taxi.glitch.me/register';

		let result = sendDataToServer(urlRegister, dataRegister);

		result.then((data) => {
			console.log('Регистрация успешна?', data.success);
			store.dispatch(regSuccess(data.success));
			if (!data.success) console.log('ОШИБКА', data.error);
		});
	}

	return result;
};
