import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from '../../store/auth/actions';
import { bindActionCreators } from 'redux';

let { logIn, logInSuccess, logInFailure } = actions;

const list = [
	{ id: 'map', name: 'Карта' },
	{ id: 'profile', name: 'Профиль' },
	{ id: 'logout', name: 'Выйти' },
];

const Header = (props) => {
	let { logIn, isLoggedIn } = props;

	const clickHandler = (e) => {
		if (e.currentTarget.id === 'logout') {
			console.log('Я внутри', window.location.pathname);
			// localStorage.isLoggedIn = JSON.stringify(false);
			isLoggedIn = false;
			logIn({ isLoggedIn });
			window.history.pushState({}, '', '/logout');
		}
		console.log('Я ', window.location);
		console.log(e.currentTarget.id);
	};

	console.log('Хэдер', props);

	return (
		<div className="header">
			<div className="header-logo"></div>
			{list.map((item) => (
				<Link to={item.id} key={item.id} id={item.id} onClick={(e) => clickHandler(e)}>
					<Button className="header-item">{item.name}</Button>
				</Link>
			))}
		</div>
	);
};

Header.propTypes = {
	getPage: PropTypes.func,
};

export const mapStateToProps = (state) => {
	return {
		email: state.auth.email,
		password: state.auth.password,
		isLoggedIn: state.auth.isLoggedIn,
	};
};

export const mapDispatchToProps = (dispatch) => {
	return {
		logIn: bindActionCreators(logIn, dispatch),
		logInSuccess: bindActionCreators(logInSuccess, dispatch),
		logInFailure: bindActionCreators(logInFailure, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
