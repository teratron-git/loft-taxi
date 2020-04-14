import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const list = [
	{ id: 'map', name: 'Карта' },
	{ id: 'profile', name: 'Профиль' },
	{ id: 'logout', name: 'Выйти' },
];

export const Header = (props) => {
	const authContext = useContext(AuthContext);

	const clickHandler = () => {
		if (window.location.pathname === '/logout') authContext.logout();
	};

	return (
		<div className="header">
			<div className="header-logo"></div>
			{list.map((item) => (
				<Link to={item.id} className="header-item" key={item.id} onClick={() => clickHandler()}>
					{item.name}
				</Link>
			))}
		</div>
	);
};

Header.propTypes = {
	getPage: PropTypes.func,
};
