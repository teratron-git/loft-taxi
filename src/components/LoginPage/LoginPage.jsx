import React from 'react';
import { Logo } from '../shared/Logo';
import LoginForm from './LoginForm';
import styles from './LoginPage.module.css';
import classNames from 'classnames/bind';

const st = classNames.bind(styles);

export const LoginPage = () => {
	return (
		<div className={st('login-page')}>
			<Logo />
			<LoginForm />
		</div>
	);
};
