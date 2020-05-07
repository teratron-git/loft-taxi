import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames/bind';
import styles from './Header.module.css';
import { actions as authActions } from '../../../store/auth/actions';
import { actions as profileActions } from '../../../store/profile/actions';

const st = classNames.bind(styles);

let { logOut } = authActions;
let { cardResetAll } = profileActions;

const list = [
	{ id: 'map', name: 'Карта' },
	{ id: 'profile', name: 'Профиль' },
	{ id: 'logout', name: 'Выйти' },
];

const Header = (props) => {
	let { logOut, cardResetAll } = props;

	const clickHandler = (e) => {
		if (e.currentTarget.id === 'logout') {
			logOut();
			cardResetAll();
		}
	};

	return (
		<div className={st('header')}>
			<div className={st('header-logo')}></div>
			{list.map((item) => (
				<Link to={item.id} key={item.id} id={item.id} onClick={(e) => clickHandler(e)}>
					<Button className={st('header-item')}>{item.name}</Button>
				</Link>
			))}
		</div>
	);
};

Header.propTypes = {
	logOut: PropTypes.func,
};

export const mapDispatchToProps = (dispatch) => {
	return {
		logOut: bindActionCreators(logOut, dispatch),
		cardResetAll: bindActionCreators(cardResetAll, dispatch)
	};
};

export default connect(null, mapDispatchToProps)(Header);
