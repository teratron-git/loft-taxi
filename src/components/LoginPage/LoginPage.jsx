import React from 'react';
import { Header } from '../Header';
import { Logo } from '../Logo';
import { LoginForm } from '../LoginForm';

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
