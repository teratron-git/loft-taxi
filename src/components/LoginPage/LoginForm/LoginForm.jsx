import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { sendDataToServer } from '../../shared/sendData';
import { changeEmail, changePassword, changeIsLoggedIn } from '../../../store/auth/actions';
import { connect } from 'react-redux';

const LoginForm = (props) => {
	let { email, password, isLoggedIn, changeEmail, changePassword, changeIsLoggedIn } = props;

	const dataAuth = { email, password };
	const urlAuth = 'https://loft-taxi.glitch.me/auth';

	const changeEmailHandler = (e) => {
		changeEmail(e.target.value);
	};

	const changePasswordHandler = (e) => {
		changePassword(e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		let result = sendDataToServer(urlAuth, dataAuth);
		result.then((data) => {
			console.log(data.success);
			isLoggedIn = data.success;

			// let sData = localStorage.isLoggedIn ? JSON.parse(localStorage.isLoggedIn) : {};
			changeIsLoggedIn(isLoggedIn);

			let sData = data.success;
			localStorage.isLoggedIn = JSON.stringify(sData);
		});
	};

	console.log('Пропс из логинки', props);

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
		email: state.auth.email,
		password: state.auth.password,
		isLoggedIn: state.auth.isLoggedIn,
	};
};

const mapDispatchToProps = {
	changeEmail,
	changePassword,
	changeIsLoggedIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
