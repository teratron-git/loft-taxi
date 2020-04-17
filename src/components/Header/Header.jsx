import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const list = [
	{ id: 'map', name: 'Карта' },
	{ id: 'profile', name: 'Профиль' },
	{ id: 'logout', name: 'Выйти' },
];

export const Header = (props) => {
	const clickHandler = () => {
		if (window.location.pathname === '/logout') {
			localStorage.isLoggedIn = JSON.stringify(false);
		}
	};

	return (
		<div className="header">
			<div className="header-logo"></div>
			{list.map((item) => (
				<Link to={item.id} key={item.id} onClick={() => clickHandler()}>
					<Button className="header-item">{item.name}</Button>
				</Link>
			))}
		</div>
	);
};

Header.propTypes = {
	getPage: PropTypes.func,
};
