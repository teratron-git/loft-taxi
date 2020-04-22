import React from 'react';
import { connect } from 'react-redux';

export const ProfilePage = () => {
	return <div className="profile-page">Содержимое профиля</div>;
};

export default connect(null, null)(ProfilePage);
