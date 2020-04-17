import {
	changeEmail,
	changePassword,
	changeIsLoggedIn,
	changeIsSubmit,
} from '../store/auth/actions';

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

	if (action.type === changeIsSubmit.toString()) {
		console.log(store.getState());

		const dataAuth = {
			email: store.getState().auth.email,
			password: store.getState().auth.password,
		};
		const urlAuth = 'https://loft-taxi.glitch.me/auth';
		let result = sendDataToServer(urlAuth, dataAuth);
		result.then((data) => {
			console.log(data.success);
			store.dispatch(changeIsLoggedIn(data.success));
			// let sData = localStorage.isLoggedIn ? JSON.parse(localStorage.isLoggedIn) : {};
			// isLoggedIn(isLoggedIn);
			let sData = data.success;
		});
	}

	return next(action);
};
