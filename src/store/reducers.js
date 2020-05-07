import { combineReducers } from 'redux';
import { authReducer } from './auth/reducers';
import { registerReducer } from './register/reducers';
import { profileReducer } from './profile/reducers';
import { routeReducer } from './route/reducers';
import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
	auth: authReducer,
	register: registerReducer,
	profile: profileReducer,
	route: routeReducer,
	form: reduxFormReducer
});
