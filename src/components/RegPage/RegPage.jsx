import React from 'react';
import { Logo } from '../shared/Logo';
import RegForm from './RegForm';
import styles from './RegPage.module.css';
import classNames from 'classnames/bind';

const st = classNames.bind(styles);

export const RegPage = () => {
	return (
		<div className={st('login-page')}>
			<Logo />
			<RegForm />
		</div>
	);
};
