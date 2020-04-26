import { takeEvery, call, put, select, delay } from 'redux-saga/effects'
import { actions as logInActions } from './auth/actions';
import { actions as registerActions } from './register/actions';

let { logIn, logInSuccess, logInFailure, logInErrorReset } = logInActions;
let { reg, regSuccess, regFailure, regErrorReset } = registerActions;

const stateData = state => state

export const sendDataToServer = async (url, data) => {
	try {
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
	} catch (error) {
		console.log('Ошибка сервера, пробрасываем дальше', error);
		throw new Error('Нет соединения с сервером!')
	}
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
			console.log('res', result)
			if (result.success) {
				yield put(logInSuccess(result.success))
			} else {
				throw new Error(result.error);
			}
		} catch (error) {
			console.log('ОШИБКА saga', error.message)
			yield put(logInFailure(error.message))
			yield delay(3000)
			yield put(logInErrorReset())
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
			if (result.success) {
				yield put(regSuccess(result.success))
				yield put(regErrorReset())
			} else {
				throw new Error(result.error);
			}
		} catch (error) {
			console.log('ОШИБКА saga', error.message)
			yield put(regFailure(error.message))
			yield delay(3000)
			yield put(regErrorReset())
		}
	})
}