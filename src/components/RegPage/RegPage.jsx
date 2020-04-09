import React from 'react';
import { Header } from '../Header';
import { Logo } from '../Logo';
import { RegForm } from '../RegForm';

export class RegPage extends React.Component {
	getPage = (page) => {
		this.props.getPage(page);
	};
	render() {
		return (
			<div className="app">
				<Header getPage={this.getPage} />
				<div className="login-page">
					<Logo />
					<RegForm getPage={this.getPage} />
				</div>
			</div>
		);
	}
}
