import { createAction } from 'redux-actions';
import * as constants from './constants';

export const actions = {
	route: createAction(constants.ROUTE),
	addressList: createAction(constants.ADDRESS_LIST),
	isRoute: createAction(constants.IS_ROUTE),
	isAddressList: createAction(constants.IS_ADDRESS_LIST),
	routeSuccess: createAction(constants.ROUTE_SUCCESS),
	routeFailure: createAction(constants.ROUTE_FAILURE),
	addressListSuccess: createAction(constants.ADDRESS_LIST_SUCCESS),
	addressListFailure: createAction(constants.ADDRESS_LIST_FAILURE),
};
