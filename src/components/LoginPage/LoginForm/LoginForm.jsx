import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import { actions } from '../../../store/auth/actions';
import { connect } from 'react-redux';
import { useState } from 'react';

let { logIn, logInSuccess, logInFailure } = actions;

const LoginForm = (props) => {
	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');
	let { isLoggedIn, isError, logIn } = props;

	const changeEmailHandler = (e) => {
		setEmail(e.target.value);
	};

	const changePasswordHandler = (e) => {
		setPassword(e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		let isSubmit = true;
		logIn({ email, password, isSubmit });
		isSubmit = false;
	};

	console.log('Пропс из логинки', props);

	return (
		<>
			<>{isLoggedIn ? <Redirect to="/map" /> : <Redirect to="/" />}</>
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
		</>
	);
};

LoginForm.propTypes = {
	getPage: PropTypes.func,
};

export const mapStateToProps = (state) => {
	return {
		email: state.auth.email,
		password: state.auth.password,
		isLoggedIn: state.auth.isLoggedIn,
	};
};

export const mapDispatchToProps = {
	logIn,
	logInSuccess,
	logInFailure,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
