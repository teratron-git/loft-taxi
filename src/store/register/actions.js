import { createAction } from 'redux-actions';
import * as constants from './constants';

export const actions = {
	reg: createAction(constants.REG),
	regSuccess: createAction(constants.REG_SUCCESS),
	regFailure: createAction(constants.REG_FAILURE),
	regErrorReset: createAction(constants.REG_ERROR_RESET),
};
