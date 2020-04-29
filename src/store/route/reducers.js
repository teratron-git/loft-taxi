import { actions } from './actions';
let temp;
let { route, addressList, isRoute, isAddress, routeSuccess, routeFailure, addressListSuccess, addressListFailure } = actions;

// const sData = JSON.parse(localStorage.getItem('loft-taxi-state')) || {};
// console.log('1', sData)

const initialState = {
	myAddressList: [],
	myRouteList: [],
	from: '',
	to: '',
	isRouteLoading: false,
	isAddressListLoading: false,
	isRoute: false,
	isAddress: false,
	error: ''
};

export const routeReducer = (state = initialState, action) => {
	// console.log('2', sData)
	console.log('весь стейт', state)

	switch (action.type) {
		case route.toString():
			return {
				...state,
				isRouteLoading: true,
				from: action.payload.from,
				to: action.payload.to,
				error: ''
			};

		case routeSuccess.toString():
			return {
				...state,
				myRouteList: action.payload,
				isRouteLoading: false,
				isRoute: true,
				error: ''
			};

		case routeFailure.toString():
			return {
				...state,
				error: action.payload,
				isRoute: false,
				isRouteLoading: false
			};

		case addressList.toString():
			return {
				...state,
				isAddressListLoading: true,
				error: ''
			};


		case addressListSuccess.toString():
			return {
				...state,
				isAddress: true,
				myAddressList: action.payload.addresses,
				isAddressListLoading: false,
				error: ''
			};

		case addressListFailure.toString():
			return {
				...state,
				isAddress: false,
				error: action.payload,
				isRouteLoading: false,
			};

		default:
			return state;
	}
};
