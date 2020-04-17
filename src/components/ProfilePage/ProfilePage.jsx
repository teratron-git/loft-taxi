import React from 'react';
import { Header } from '../Header';
import { Logo } from '../shared/Logo';
import LoginForm from '../LoginPage/LoginForm';
import PropTypes from 'prop-types';

export const ProfilePage = (props) => {
	return (
		<>
			{localStorage.isLoggedIn ? (
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
