import { takeEvery, fork, call, put, select, delay, all } from 'redux-saga/effects'
import { actions as logInActions } from './auth/actions';
import { actions as registerActions } from './register/actions';
import { actions as profileActions } from './profile/actions';

let { logIn, logInSuccess, logInFailure, logInErrorReset, checkIsLogin } = logInActions;
let { reg, regSuccess, regFailure, regErrorReset } = registerActions;
let { card, cardSuccess, cardFailure, cardSuccessUpdate, cardFailureUpdate } = profileActions;

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

export const getDataFromServer = async (url) => {
	try {
		let response = await fetch(url)
		let result = await response.json();
		console.log('responseSt', response)
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
	yield takeEvery(logIn, logInSaga)
	yield takeEvery(logInSuccess, getCardSaga)
	// yield takeEvery(checkIsLogin, getCardSaga)
	yield takeEvery(cardSuccess, getCardSaga)
	yield takeEvery(reg, regSaga)
	yield takeEvery(card, cardSaga)
}

function* logInSaga() {
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
			yield put(logInSuccess(result))
		} else {
			throw new Error(result.error);
		}
	} catch (error) {
		console.log('ОШИБКА saga', error.message)
		yield put(logInFailure(error.message))
		yield delay(3000)
		yield put(logInErrorReset())
	}
}

function* regSaga() {
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
}

function* cardSaga() {
	const data = yield select(stateData)
	console.log('data', data)

	const dataProfile = {
		cardName: data.profile.cardName,
		cardNumber: data.profile.cardNumber,
		expiryDate: data.profile.cardExpiry,
		cvc: data.profile.cardCvv,
		token: data.auth.token
	};
	const urlProfile = 'https://loft-taxi.glitch.me/card';

	try {
		const result = yield call(sendDataToServer, urlProfile, dataProfile);
		console.log('res', result.success)
		if (result.success) {
			yield put(cardSuccess(result.success))
			// yield put(regErrorReset())
		} else {
			throw new Error(result.error);
		}
	} catch (error) {
		console.log('ОШИБКА saga', error.message)
		yield put(cardFailure(error.message))
		yield delay(3000)
		// yield put(regErrorReset())
	}
}

function* getCardSaga() {
	const data = yield select(stateData)
	console.log('data', data)
	const url = `https://loft-taxi.glitch.me/card?token=${data.auth.token}`;

	try {
		const result = yield call(getDataFromServer, url);
		console.log('res', result)
		if (result) {
			yield put(cardSuccessUpdate(result))
			// yield put(regErrorReset())
		} else {
			throw new Error(result.error);
		}
	} catch (error) {
		console.log('ОШИБКА saga', error.message)
		yield put(cardFailure(error.message))
		yield delay(3000)
		// yield put(regErrorReset())
	}
}