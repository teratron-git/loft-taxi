import React from 'react';
import { Header } from '../Header';
import PropTypes from 'prop-types';

export class ProfilePage extends React.Component {
	getPage = (page) => {
		this.props.getPage(page);
	};
	render() {
		return (
			<div className="app">
				<Header getPage={this.getPage} />
				<div className="profile-page">Содержимое профиля</div>
			</div>
		);
	}
}

ProfilePage.propTypes = {
	getPage: PropTypes.func,
};
