import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { actions } from '../../../store/auth/actions';
import styles from './LoginForm.module.css';
import { Preloader } from '../../shared/Preloader';
import { getIsLoggedIn, getError, getIsLogging } from '../../../store/auth/selectors'

const st = classNames.bind(styles);

let { logIn, logInErrorReset } = actions;

const LoginForm = (props) => {
	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');
	let { isLoggedIn, logIn, logInErrorReset, isLogging, error } = props;

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
					{isLogging ? <Preloader />
						: (
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className={st('button')}
								style={{ width: '100px' }}
								disabled={!email || !password}
							>
								Войти
							</Button>
						)}
				</form>
			</div>
		</div>
	);
};

LoginForm.propTypes = {
	isLoggedIn: PropTypes.bool,
	error: PropTypes.string,
	isLogging: PropTypes.bool,
};

export const mapStateToProps = (state) => {
	return {
		isLoggedIn: getIsLoggedIn(state),
		error: getError(state),
		isLogging: getIsLogging(state),
	};
};

export const mapDispatchToProps = (dispatch) => {
	return {
		logIn: bindActionCreators(logIn, dispatch),
		logInErrorReset: bindActionCreators(logInErrorReset, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
