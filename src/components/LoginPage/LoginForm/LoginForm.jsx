import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import { actions } from '../../../store/auth/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import styles from './LoginForm.module.css';
import classNames from 'classnames/bind';

const st = classNames.bind(styles);

let { logIn, logInErrorReset } = actions;

const LoginForm = (props) => {
	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');
	let { isLoggedIn, logIn, logInErrorReset, error } = props;

	const changeEmailHandler = (e) => {
		setEmail(e.target.value);
	};

	const changePasswordHandler = (e) => {
		setPassword(e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		logIn({ email, password });
	};

	useEffect(() => {
		return () => { logInErrorReset() }
	}, [])

	console.log('Пропс из логинки', props);

	if (isLoggedIn) {
		return <Redirect to="/dashboard/map" />;
	}

	return (
		<div className={st('login-page__loginForm')}>
			<div className={st('login-page__loginForm-item')} style={{ height: '400px' }}>
				<div className={st('header-form')}>Вход</div>
				<div className={st('header-form__add')}>
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
						className={st('input')}
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
						className={st('input')}
						value={password}
						onChange={changePasswordHandler}
						required
						autoComplete="off"
					/>
					<span className={st('error')}>{error}</span>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						className={st('button')}
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
	isLoggedIn: PropTypes.bool,
	logIn: PropTypes.func,
};

export const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
		error: state.auth.error,
	};
};

export const mapDispatchToProps = (dispatch) => {
	return {
		logIn: bindActionCreators(logIn, dispatch),
		logInErrorReset: bindActionCreators(logInErrorReset, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
