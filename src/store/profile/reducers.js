import { actions } from './actions';
let temp;
let { card, cardSuccess, cardFailure, cardSuccessUpdate, cardFailureUpdate, checkIsCard, cardResetAll, cardErrorReset } = actions;

const sData = JSON.parse(localStorage.getItem('loft-taxi-state')) || {};

const initialState = {
	cardName: '',
	cardNumber: '',
	cardExpiry: '',
	cardCvv: '',
	isCard: false,
	isCardLoading: true,
	error: ''
};

export const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case card.toString():
			return {
				...state,
				cardName: action.payload.cardName,
				cardNumber: action.payload.cardNumber,
				cardExpiry: action.payload.cardExpiry,
				cardCvv: action.payload.cardCvv,
				isCardLoading: true,
				error: '',
			};

		case checkIsCard.toString():
			if (sData.profile.isCard) {
				return {
					...state,
					isCard: true,
				};
			}
			return state;

		case cardSuccess.toString():
			temp = JSON.parse(localStorage.getItem('loft-taxi-state'));
			console.log('temp!', temp)
			console.log('state!', state)
			localStorage.setItem('loft-taxi-state', JSON.stringify({
				...temp, profile: {
					cardName: action.payload.cardName,
					cardNumber: action.payload.cardNumber,
					cardExpiry: action.payload.expiryDate,
					cardCvv: action.payload.cvc,
					error: '',
					isCard: true,
					isCardLoading: false
				}
			}));

			return {
				...state,
				cardName: action.payload.cardName,
				cardNumber: action.payload.cardNumber,
				cardExpiry: action.payload.expiryDate,
				cardCvv: action.payload.cvc,
				error: '',
				isCard: true,
				isCardLoading: false
			};

		case cardSuccessUpdate.toString():
			temp = JSON.parse(localStorage.getItem('loft-taxi-state'));
			console.log('temp!', temp)
			console.log('state!', state)
			localStorage.setItem('loft-taxi-state', JSON.stringify({
				...temp, profile: {
					cardName: action.payload.cardName,
					cardNumber: action.payload.cardNumber,
					cardExpiry: action.payload.expiryDate,
					cardCvv: action.payload.cvc,
					error: 'Данные успешно сохранены',
					isCard: true,
					isCardLoading: false
				}
			}));

			return {
				...state,
				cardName: action.payload.cardName,
				cardNumber: action.payload.cardNumber,
				cardExpiry: action.payload.expiryDate,
				cardCvv: action.payload.cvc,
				error: 'Данные успешно сохранены',
				isCard: true,
				isCardLoading: false
			};

		case cardFailure.toString():
			return {
				...state, error: action.payload,
				isCardLoading: false
			};

		case cardFailureUpdate.toString():
			return {
				...state, error: action.payload,
				isCardLoading: false
			};

		case cardResetAll.toString():
			return {
				cardName: '',
				cardNumber: '',
				cardExpiry: '',
				cardCvv: '',
				isCard: false,
				isCardLoading: true,
				error: ''
			}

		case cardErrorReset.toString():
			return { ...state, error: '' };

		default:
			return state;
	}
};
