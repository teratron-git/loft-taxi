import { takeEvery, call, put, select, delay } from 'redux-saga/effects'
import { actions as logInActions } from './auth/actions';
import { actions as registerActions } from './register/actions';
import { actions as profileActions } from './profile/actions';
import { actions as routeActions } from './route/actions';
import * as authConstants from './auth/constants'
import * as regConstants from './register/constants'
import * as profileConstants from './profile/constants'
import * as routeConstants from './route/constants'

let { logInSuccess, logInFailure } = logInActions;
let { regSuccess, regFailure } = registerActions;
let { cardSuccess, cardFailure, cardSuccessUpdate, cardErrorReset } = profileActions;
let { addressListSuccess, addressListFailure, routeSuccess, routeFailure } = routeActions;

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
		let result = await response.json();
		if (response.ok) {
		}
		return result;
	} catch (error) {
		throw new Error('Нет соединения с сервером!')
	}
};

export const getDataFromServer = async (url) => {
	try {
		let response = await fetch(url)
		let result = await response.json();
		if (response.ok) {
		}
		return result;
	} catch (error) {
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
	const dataAuth = {
		email: data.auth.email,
		password: data.auth.password,
	};
	const urlAuth = 'https://loft-taxi.glitch.me/auth';

	try {
		const result = yield call(sendDataToServer, urlAuth, dataAuth);
		if (result.success) {
			yield put(logInSuccess(result))
		} else {
			throw new Error(result.error);
		}
	} catch (error) {
		yield put(logInFailure(error.message))
	}
}

function* regSaga() {
	const data = yield select(stateData)
	const dataRegister = {
		email: data.register.email,
		password: data.register.password,
		name: data.register.name,
		surname: data.register.surname,
	};
	const urlRegister = 'https://loft-taxi.glitch.me/register';

	try {
		const result = yield call(sendDataToServer, urlRegister, dataRegister);
		if (result.success) {
			yield put(regSuccess(result.success))
		} else {
			throw new Error(result.error);
		}
	} catch (error) {
		yield put(regFailure(error.message))
	}
}

function* cardSaga() {
	const data = yield select(stateData)

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
		if (result.success) {
			yield put(cardSuccess(result.success))
		} else {
			throw new Error(result.error);
		}
	} catch (error) {
		yield put(cardFailure(error.message))
	}
}

function* getCardSaga() {
	const data = yield select(stateData)

	if (data.auth.isLoggedIn) {
		const url = `https://loft-taxi.glitch.me/card?token=${data.auth.token}`;

		try {
			const result = yield call(getDataFromServer, url);
			if (!result.success === false || result.success === undefined) {
				yield put(cardSuccessUpdate(result))
				yield delay(3000)
				yield put(cardErrorReset())
			} else {
				throw new Error(result.error);
			}
		} catch (error) {
			yield put(cardFailure(error.message))
		}
	}
}

function* getAddressListSaga() {
	const url = `https://loft-taxi.glitch.me/addressList`;

	try {
		const result = yield call(getDataFromServer, url);
		if (!result.success === false || result.success === undefined) {
			yield put(addressListSuccess(result))
		} else {
			throw new Error(result.error);
		}
	} catch (error) {
		yield put(addressListFailure(error.message))
	}
}

function* getRouteSaga(action) {
	const { payload: { from, to } } = action;
	const url = `https://loft-taxi.glitch.me/route?address1=${from}&address2=${to}`;

	try {
		const result = yield call(getDataFromServer, url);
		if (!result.success === false || result.success === undefined) {
			yield put(routeSuccess(result))
		} else {
			throw new Error(result.error);
		}
	} catch (error) {
		yield put(routeFailure(error.message))
	}
}