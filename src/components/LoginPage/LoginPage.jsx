import React from 'react';
import { Logo } from '../shared/Logo';
import LoginForm from './LoginForm';
import PropTypes from 'prop-types';

export class LoginPage extends React.Component {
	render() {
		return (
			<div className="app">
				<div className="login-page">
					<Logo />
					<LoginForm />
				</div>
			</div>
		);
	}
}

LoginPage.propTypes = {
	getPage: PropTypes.func,
};
