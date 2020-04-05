import React from 'react';

const list = [
	{ id: 'map', name: 'Карта' },
	{ id: 'profile', name: 'Профиль' },
	{ id: 'login', name: 'Логин' },
];

export class Header extends React.Component {
	clickHandler = (page) => {
		this.props.getPage(page);
		console.log(page);
	};
	render() {
		return (
			<div className="header">
				<div className="header-logo"></div>
				{list.map((item) => (
					<div className="header-item" key={item.id} onClick={() => this.clickHandler(item.id)}>
						{item.name}
					</div>
				))}
			</div>
		);
	}
}
