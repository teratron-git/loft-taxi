import React from 'react';

export class Header extends React.Component {
	clickHandler = (e) => {
		let page = e.target.getAttribute('page');
		this.props.getPage(page);
		console.log(page);
	};
	render() {
		return (
			<div className="header">
				<div className="header-logo"></div>
				<div className="header-item" page="map" onClick={this.clickHandler}>
					Карта
				</div>
				<div className="header-item" page="profile" onClick={this.clickHandler}>
					Профиль
				</div>
				<div className="header-item" page="login" onClick={this.clickHandler}>
					Выйти
				</div>
			</div>
		);
	}
}
