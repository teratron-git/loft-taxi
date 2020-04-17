import { combineReducers } from 'redux';
import { authReducer } from './auth/reducers';
import { registerReducer } from './register/reducers';

export default combineReducers({
	auth: authReducer,
	register: registerReducer,
});
