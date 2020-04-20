import React from 'react';
import { LoginPage } from './components/LoginPage';
import { RegPage } from './components/RegPage';
import MapPage from './components/MapPage';
import ProfilePage from './components/ProfilePage';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from './store/auth/actions';
import './index.css';
let { logIn, logInSuccess, logInFailure } = actions;

const App = (props) => {
	let { isLoggedIn } = props;
	console.log('App', props);

	return (
		<>
			<Switch>
				<Route path="/" component={LoginPage} exact />
				<Route path="/logout" component={LoginPage} exact />
				<Route path="/reg" component={RegPage} exact />
				{/* {!isLoggedIn && <Redirect from="/map" to="/reg" />}
				{!isLoggedIn && <Redirect from="/profile" to="/reg" />} */}
				{/* {isLoggedIn ? (
					<Route path="/map" component={MapPage} exact />
				) : (
					window.history.pushState({}, '', '/test')
				)} */}
				<Route path="/map" component={MapPage} exact />
				<Route path="/profile" component={ProfilePage} exact />
			</Switch>
		</>
	);
};

export const mapStateToProps = (state) => {
	return {
		email: state.auth.email,
		password: state.auth.password,
		isLoggedIn: state.auth.isLoggedIn,
	};
};

export const mapDispatchToProps = {
	logIn,
	logInSuccess,
	logInFailure,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
