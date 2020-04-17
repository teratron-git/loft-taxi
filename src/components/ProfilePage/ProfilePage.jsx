import React from 'react';
import Header from '../Header';
import { Logo } from '../shared/Logo';
import LoginForm from '../LoginPage/LoginForm';
import PropTypes from 'prop-types';
import {
	changeEmail,
	changePassword,
	changeIsLoggedIn,
	changeIsSubmit,
} from '../../store/auth/actions';
import { connect } from 'react-redux';

export const ProfilePage = (props) => {
	let {
		email,
		password,
		isLoggedIn,
		isSubmit,
		changeEmail,
		changePassword,
		changeIsLoggedIn,
		changeIsSubmit,
	} = props;
	return (
		<>
			{isLoggedIn ? (
				<div className="app">
					<Header />
					<div className="profile-page">Содержимое профиля</div>
				</div>
			) : (
				<div className="app">
					<Header />
					<div className="login-page">
						<Logo />
						<LoginForm />
					</div>
				</div>
			)}
		</>
	);
};

ProfilePage.propTypes = {
	getPage: PropTypes.func,
};

export const mapStateToProps = (state) => {
	return {
		email: state.auth.email,
		password: state.auth.password,
		isLoggedIn: state.auth.isLoggedIn,
		isSubmit: state.auth.isSubmit,
	};
};

export const mapDispatchToProps = {
	changeEmail,
	changePassword,
	changeIsLoggedIn,
	changeIsSubmit,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
