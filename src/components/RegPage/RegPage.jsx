import React from 'react';
import { Header } from '../Header';
import { Logo } from '../shared/Logo';
import { RegForm } from './RegForm';
import PropTypes from 'prop-types';

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

RegPage.propTypes = {
	getPage: PropTypes.func,
};
