import React from 'react';
import { LoginPage } from './components/LoginPage';
import { RegPage } from './components/RegPage';
import MapPage from './components/Dashboard/MapPage';
import ProfilePage from './components/Dashboard/ProfilePage';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from './store/auth/actions';
import AppRouter from './components/AppRouter';
import { useEffect } from 'react';
import './index.css';

let { logIn, logInSuccess, logInFailure, checkIsLogin } = actions;

const App = (props) => {
	let { isLoggedIn, checkIsLogin } = props;
	console.log('App', props);

	useEffect(() => {
		checkIsLogin();
	}, []);

	return (
		<>
			<Switch>
				<PrivateRoute path="/dashboard" permited={isLoggedIn} component={AppRouter} />
				<Route path="/" component={LoginPage} exact />
				<Route path="/reg" component={RegPage} exact />
				<Redirect to="/" />
			</Switch>
		</>
	);
};

const PrivateRoute = ({ component: Component, permited, ...rest }) => (
	<Route
		{...rest}
		render={(props) => (permited ? <Component {...props} /> : <Redirect to="/" />)}
	/>
);

export const mapStateToProps = (state) => {
	return {
		email: state.auth.email,
		password: state.auth.password,
		isLoggedIn: state.auth.isLoggedIn,
	};
};

export const mapDispatchToProps = (dispatch) => ({
	logIn: () => dispatch(actions.logIn()),
	logInSuccess: () => dispatch(actions.logInSuccess()),
	logInFailure: () => dispatch(actions.logInFailure()),
	checkIsLogin: () => dispatch(actions.checkIsLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
