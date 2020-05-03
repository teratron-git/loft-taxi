import { actions } from './actions';
let { route, addressList, routeReset, routeSuccess, routeFailure, addressListSuccess, addressListFailure } = actions;

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
				isRouteLoading: false
			};

		case routeReset.toString():
			return {
				...state,
				isRoute: false,
				myRouteList: [],
				from: '',
				to: ''
			};

		default:
			return state;
	}
};
