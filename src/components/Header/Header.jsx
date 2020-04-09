import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const list = [
	{ id: 'map', name: 'Карта' },
	{ id: 'profile', name: 'Профиль' },
	{ id: 'login', name: 'Логин' },
];

export class Header extends React.Component {
	clickHandler = (page) => {
		this.props.getPage(page);
	};

	render() {
		return (
			<div className="header">
				<div className="header-logo"></div>
				{list.map((item) => (
					<Button className="header-item" key={item.id} onClick={() => this.clickHandler(item.id)}>
						{item.name}
					</Button>
				))}
			</div>
		);
	}
}

Header.propTypes = {
	getPage: PropTypes.func,
};
