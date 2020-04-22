import React from 'react';
import { Logo } from '../shared/Logo';
import LoginForm from './LoginForm';

export const LoginPage = () => {
	return (
		<div className="app">
			<div className="login-page">
				<Logo />
				<LoginForm />
			</div>
		</div>
	);
};
