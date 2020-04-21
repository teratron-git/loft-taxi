import React from 'react';
import Header from '../Header';
import { Logo } from '../../shared/Logo';
import LoginForm from '../../LoginPage/LoginForm';
import PropTypes from 'prop-types';
import { actions } from '../../../store/auth/actions';
import { connect } from 'react-redux';

let { logIn, logInSuccess, logInFailure } = actions;

export const ProfilePage = (props) => {
	let { email, password, isLoggedIn, logIn, logInSuccess, logInFailure } = props;
	return <div className="profile-page">Содержимое профиля</div>;
};

ProfilePage.propTypes = {
	getPage: PropTypes.func,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
