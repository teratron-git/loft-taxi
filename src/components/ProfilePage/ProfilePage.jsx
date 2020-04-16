import React from 'react';
import { Header } from '../Header';
import { Logo } from '../shared/Logo';
import LoginForm from '../LoginPage/LoginForm';
import PropTypes from 'prop-types';
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';

export const ProfilePage = (props) => {
	const authContext = useContext(AuthContext);

	const getPage = (page) => {
		props.getPage(page);
	};

	return (
		<>
			{localStorage.isLoggedIn ? (
				<div className="app">
					<Header getPage={getPage} />
					<div className="profile-page">Содержимое профиля</div>
				</div>
			) : (
				<div className="app">
					<Header getPage={getPage} />
					<div className="login-page">
						<Logo />
						<LoginForm getPage={getPage} />
					</div>
				</div>
			)}
		</>
	);
};

ProfilePage.propTypes = {
	getPage: PropTypes.func,
};
