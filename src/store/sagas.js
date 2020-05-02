import { takeEvery, call, put, select } from 'redux-saga/effects'
import { actions as logInActions } from './auth/actions';
import { actions as registerActions } from './register/actions';
import { actions as profileActions } from './profile/actions';
import { actions as routeActions } from './route/actions';
import * as authConstants from './auth/constants'
import * as regConstants from './register/constants'
import * as profileConstants from './profile/constants'
import * as routeConstants from './route/constants'

let { logInSuccess, logInFailure } = logInActions;
let { regSuccess, regFailure, regErrorReset } = registerActions;
let { cardSuccess, cardFailure, cardSuccessUpdate } = profileActions;
let { addressList, addressListSuccess, addressListFailure, routeList,
	routeSuccess, routeFailure, } = routeActions;

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
	yield takeEvery(authConstants.LOGIN, logInSaga)
	yield takeEvery(authConstants.LOGIN_SUCCESS, getCardSaga)
	yield takeEvery(authConstants.CHECK_IS_LOGIN, getCardSaga)
	yield takeEvery(profileConstants.CARD_SUCCESS, getCardSaga)
	yield takeEvery(regConstants.REG, regSaga)
	yield takeEvery(profileConstants.CARD, cardSaga)
	yield takeEvery(routeConstants.ADDRESS_LIST, getAddressListSaga)
	yield takeEvery(routeConstants.ROUTE, getRouteSaga)

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
		} else {
			throw new Error(result.error);
		}
	} catch (error) {
		console.log('ОШИБКА saga', error.message)
		yield put(cardFailure(error.message))
	}
}

function* getCardSaga() {
	const data = yield select(stateData)
	console.log('data', data)
	const url = `https://loft-taxi.glitch.me/card?token=${data.auth.token}`;

	try {
		const result = yield call(getDataFromServer, url);
		console.log('res', result)
		if (!result.success === false || result.success === undefined) {
			yield put(cardSuccessUpdate(result))
		} else {
			throw new Error(result.error);
		}
	} catch (error) {
		console.log('ОШИБКА saga', error.message)
		yield put(cardFailure(error.message))
	}
}
function* getAddressListSaga() {
	const data = yield select(stateData)
	console.log('data', data)
	const url = `https://loft-taxi.glitch.me/addressList`;

	try {
		const result = yield call(getDataFromServer, url);
		console.log('res', result)
		if (!result.success === false || result.success === undefined) {
			yield put(addressListSuccess(result))
		} else {
			throw new Error(result.error);
		}
	} catch (error) {
		console.log('ОШИБКА saga', error.message)
		yield put(addressListFailure(error.message))
	}
}

function* getRouteSaga() {
	const data = yield select(stateData)
	console.log('data', data)
	const url = `https://loft-taxi.glitch.me/route?address1=${data.route.from}&address2=${data.route.to}`;

	try {
		const result = yield call(getDataFromServer, url);
		console.log('res', result)
		if (!result.success === false || result.success === undefined) {
			yield put(routeSuccess(result))
		} else {
			throw new Error(result.error);
		}
	} catch (error) {
		console.log('ОШИБКА saga', error.message)
		yield put(routeFailure(error.message))
	}
}