import React from 'react';
import { Header } from '../Header';
import { Logo } from '../shared/Logo';
import { LoginForm } from './LoginForm';
import PropTypes from 'prop-types';

export class LoginPage extends React.Component {
	getPage = (page) => {
		this.props.getPage(page);
	};

	render() {
		return (
			<div className="app">
				<Header getPage={this.getPage} />
				<div className="login-page">
					<Logo />
					<LoginForm getPage={this.getPage} />
				</div>
			</div>
		);
	}
}

LoginPage.propTypes = {
	getPage: PropTypes.func,
};
