import React from 'react';
import styles from './Logo.module.css';
import classNames from 'classnames/bind';

const st = classNames.bind(styles);

export function Logo() {
	return (
		<div className={st('login-page__logo')}>
			<div className={st('login-page__logo-item')}></div>
		</div>
	);
}
