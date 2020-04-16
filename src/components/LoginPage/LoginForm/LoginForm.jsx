import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../../AuthContext';
import { useState } from 'react';
import { useContext } from 'react';
import { Link, Redirect, Switch } from 'react-router-dom';
import { MapPage } from '../../MapPage';
import { ProfilePage } from '../../ProfilePage';
import { LoginPage } from '../LoginPage';
import { RegPage } from '../../RegPage';
import { sendDataToServer } from '../../shared/sendData';
// import { mapStateToProps, mapDispatchToProps } from '../../../App';
import { changeEmail, changePassword, changeIsLoggedIn } from '../../../store/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const LoginForm = ({
	email,
	password,
	isLoggedIn,
	changeEmail,
	changePassword,
	changeIsLoggedIn,
}) => {
	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');

	// const authContext = useContext(AuthContext);

	const dataAuth = { email, password };
	const urlAuth = 'https://loft-taxi.glitch.me/auth';

	const changeEmailHandler = (e) => {
		// setEmail(e.target.value);
		changeEmail(e.target.value);
		console.log(e.target.value);
	};

	const changePasswordHandler = (e) => {
		// setPassword(e.target.value);
		changePassword(e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		let result = sendDataToServer(urlAuth, dataAuth);
		result.then((data) => {
			console.log(data.success);

			// let sData = localStorage.isLoggedIn ? JSON.parse(localStorage.isLoggedIn) : {};
			changeIsLoggedIn(data.success);

			let sData = data.success;
			localStorage.isLoggedIn = JSON.stringify(sData);
		});
	};

	console.log('Пропс из логинки', email, password, isLoggedIn);

	return (
		<div className="login-page__loginForm">
			<div className="login-page__loginForm-item" style={{ height: '400px' }}>
				<div className="header-form">Вход</div>
				<div className="header-form__add">
					Новый пользователь?
					<Link to="/reg">
						<span>Зарегистрироваться</span>
					</Link>
				</div>
				<form onSubmit={submitHandler}>
					<label htmlFor="email">Адрес эл. почты*:</label>
					<Input
						type="text"
						id="email"
						name="email"
						className="input"
						value={email}
						onChange={changeEmailHandler}
						required
						autoComplete="off"
						autoFocus
					/>
					<label htmlFor="password" style={{ marginTop: '50px' }}>
						Пароль*:
					</label>
					<Input
						type="password"
						id="password"
						name="password"
						className="input"
						value={password}
						onChange={changePasswordHandler}
						required
						autoComplete="off"
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						className="button"
						style={{ width: '100px' }}
					>
						Войти
					</Button>
				</form>
			</div>
		</div>
	);
};

LoginForm.propTypes = {
	getPage: PropTypes.func,
};

const mapStateToProps = (state) => {
	return {
		email: state.email,
		password: state.password,
		isLoggedIn: state.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeEmail: bindActionCreators(changeEmail, dispatch),
		changePassword: bindActionCreators(changePassword, dispatch),
		changeIsLoggedIn: bindActionCreators(changeIsLoggedIn, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
