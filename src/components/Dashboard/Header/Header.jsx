import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from '../../../store/auth/actions';
import { bindActionCreators } from 'redux';
import styles from './Header.module.css';
import classNames from 'classnames/bind';

const st = classNames.bind(styles);

let { logOut } = actions;

const list = [
	{ id: 'map', name: 'Карта' },
	{ id: 'profile', name: 'Профиль' },
	{ id: 'logout', name: 'Выйти' },
];

const Header = (props) => {
	let { logOut } = props;

	const clickHandler = (e) => {
		if (e.currentTarget.id === 'logout') {
			console.log('Я внутри', window.location.pathname);
			logOut();
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

export const mapStateToProps = (state) => {
	return {};
};

export const mapDispatchToProps = (dispatch) => {
	return {
		logOut: bindActionCreators(logOut, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
