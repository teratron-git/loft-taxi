import React from 'react';
import { LoginPage } from './components/LoginPage';
import { RegPage } from './components/RegPage';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from './store/auth/actions';
import AppRouter from './components/AppRouter';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import './index.css';

const App = (props) => {
	let { isLoggedIn, checkIsLogin } = props;

	useEffect(() => {
		checkIsLogin();
	}, []);

	return (
		<Switch>
			<PrivateRoute path="/dashboard" permited={isLoggedIn} component={AppRouter} />
			<Route path="/" component={LoginPage} exact />
			<Route path="/reg" component={RegPage} exact />
			<Redirect to="/" />
		</Switch>
	);
};

const PrivateRoute = ({ component: Component, permited, ...rest }) => (
	<Route
		{...rest}
		render={(props) => (permited ? <Component {...props} /> : <Redirect to="/" />)}
	/>
);

App.propTypes = {
	isLoggedIn: PropTypes.bool,
	checkIsLogin: PropTypes.func,
};

export const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
	};
};

export const mapDispatchToProps = (dispatch) => ({
	checkIsLogin: () => dispatch(actions.checkIsLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
