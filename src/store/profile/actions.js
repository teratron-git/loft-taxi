import { createAction } from 'redux-actions';
import * as constants from './constants';

export const actions = {
	card: createAction(constants.CARD),
	cardSuccess: createAction(constants.CARD_SUCCESS),
	cardFailure: createAction(constants.CARD_FAILURE),
	cardSuccessUpdate: createAction(constants.CARD_SUCCESS_UPDATE),
	cardFailureUpdate: createAction(constants.CARD_FAILURE_UPDATE),
	checkIsCard: createAction(constants.CHECK_IS_CARD),
};
