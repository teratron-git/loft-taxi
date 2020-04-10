import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';

const list = [
	{ id: 'map', name: 'Карта' },
	{ id: 'profile', name: 'Профиль' },
	{ id: 'logout', name: 'Выйти' },
];

export const Header = (props) => {
	const authContext = useContext(AuthContext);

	const clickHandler = (page) => {
		page = authContext.isLoggedIn ? page : 'logout';

		if (page === 'logout') {
			authContext.logout();
		}

		props.getPage(page);
	};

	return (
		<div className="header">
			<div className="header-logo"></div>
			{list.map((item) => (
				<Button className="header-item" key={item.id} onClick={() => clickHandler(item.id)}>
					{item.name}
				</Button>
			))}
		</div>
	);
};

Header.propTypes = {
	getPage: PropTypes.func,
};
