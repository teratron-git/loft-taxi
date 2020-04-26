import { takeEvery, call, put, select } from 'redux-saga/effects'
import { actions as logInActions } from './auth/actions';
import { actions as registerActions } from './register/actions';

let { logIn, logInSuccess, logInFailure } = logInActions;
let { reg, regSuccess, regFailure } = registerActions;

const stateData = state => state

export const sendDataToServer = async (url, data) => {
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

export function* rootSaga() {
	yield takeEvery(logIn, function* () {
		const data = yield select(stateData)
		console.log('data', data)
		const dataAuth = {
			email: data.auth.email,
			password: data.auth.password,
		};
		const urlAuth = 'https://loft-taxi.glitch.me/auth';
		try {
			const result = yield call(sendDataToServer, urlAuth, dataAuth);
			console.log('res', result.success)
			yield put(logInSuccess(result.success))
			if (!result.success) {
				throw new Error(result.error);
			}
		} catch (error) {
			console.log('ОШИБКА', error.message)
		}
	})

	yield takeEvery(reg, function* () {
		const data = yield select(stateData)
		console.log('data', data)
		const dataRegister = {
			email: data.register.email,
			password: data.register.password,
			name: data.register.name,
			surname: data.register.surname,
		};
		const urlRegister = 'https://loft-taxi.glitch.me/register';
		try {
			const result = yield call(sendDataToServer, urlRegister, dataRegister);
			console.log('res', result.success)
			yield put(regSuccess(result.success))
			if (!result.success) {
				throw new Error(result.error);
			}
		} catch (error) {
			console.log('ОШИБКА', error.message)
		}
	})
}