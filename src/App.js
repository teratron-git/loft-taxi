import React from 'react';
import { LoginPage } from './components/LoginPage';
import { RegPage } from './components/RegPage';
import { MapPage } from './components/MapPage';
import { ProfilePage } from './components/ProfilePage';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from './components/AuthContext';
import { useContext } from 'react';
import { connect } from 'react-redux';
import { changeEmail, changePassword, changeIsLoggedIn } from './store/actions';
import { bindActionCreators } from 'redux';
import './index.css';

const App = (props) => {
	const authContext = useContext(AuthContext);
	console.log('JSON', JSON.parse(localStorage.isLoggedIn));
	console.log('props', props);
	return (
		<>
			<Switch>
				<Route path="/" component={LoginPage} exact />
				<Route path="/logout" component={LoginPage} exact />
				<Route path="/reg" component={RegPage} exact />
				{!JSON.parse(localStorage.isLoggedIn) && <Redirect from="/map" to="/reg" />}
				{!JSON.parse(localStorage.isLoggedIn) && <Redirect from="/profile" to="/reg" />}
				<Route path="/map" component={MapPage} exact />
				<Route path="/profile" component={ProfilePage} exact />
			</Switch>
		</>
	);
};

export const mapStateToProps = (state) => {
	return {
		email: state.email,
		password: state.password,
		isLoggedIn: state.isLoggedIn,
	};
};

export const mapDispatchToProps = (dispatch) => {
	return {
		changeEmail: bindActionCreators(changeEmail, dispatch),
		changePassword: bindActionCreators(changePassword, dispatch),
		changeIsLoggedIn: bindActionCreators(changeIsLoggedIn, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
