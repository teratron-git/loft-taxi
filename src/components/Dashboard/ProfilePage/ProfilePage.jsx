import React from 'react';
import { connect } from 'react-redux';
import styles from './ProfilePage.module.css';
import classNames from 'classnames/bind';

const st = classNames.bind(styles);

export const ProfilePage = () => {
	return <div className={st('profile-page')}>Содержимое профиля</div>;
};

export default connect(null, null)(ProfilePage);
