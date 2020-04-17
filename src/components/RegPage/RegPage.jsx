import React from 'react';
import Header from '../Header';
import { Logo } from '../shared/Logo';
import RegForm from './RegForm';
import PropTypes from 'prop-types';

export const RegPage = () => {
	return (
		<div className="app">
			<Header />
			<div className="login-page">
				<Logo />
				<RegForm />
			</div>
		</div>
	);
};

RegPage.propTypes = {
	getPage: PropTypes.func,
};
