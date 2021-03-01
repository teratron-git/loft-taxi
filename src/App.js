import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { LoginPage } from './components/LoginPage';
import { RegPage } from './components/RegPage';
import AppRouter from './components/AppRouter';
import styles from './App.module.css';
import { actions } from './store/auth/actions';
import { getIsLoggedIn } from './store/auth/selectors';

const st = classNames.bind(styles);

const App = (props) => {
	let { isLoggedIn, checkIsLogin } = props;

	useEffect(() => {
		checkIsLogin();
	}, []);

	return (
		<div className={st('app')}>
			<Switch>
				<PrivateRoute path="/dashboard" permited={isLoggedIn} component={AppRouter} />
				<Route path="/" component={LoginPage} exact />
				<Route path="/reg" component={RegPage} exact />
				<Redirect to="/" />
			</Switch>
		</div>
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
		isLoggedIn: getIsLoggedIn(state),
	};
};

export const mapDispatchToProps = (dispatch) => ({
	checkIsLogin: () => dispatch(actions.checkIsLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
