import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField/';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actions } from '../../../store/auth/actions';
import { getError, getIsLoggedIn, getIsLogging } from '../../../store/auth/selectors';
import { Preloader } from '../../shared/Preloader';
import styles from './LoginForm.module.css';

const st = classNames.bind(styles);
let { logIn, logInErrorReset } = actions;

const LoginForm = (props) => {
	let { handleSubmit, control, formState, errors } = useForm();

	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');
	let { isLoggedIn, logIn, logInErrorReset, isLogging, serverError } = props;

	const changeEmailHandler = (e) => {
		setEmail(e.target.value);
	};

	const changePasswordHandler = (e) => {
		setPassword(e.target.value);
	};

	const submitHandler = (e) => {
		logIn({ email: e.email, password: e.password });
	};

	useEffect(() => {
		return () => {
			logInErrorReset();
		};
	}, [logInErrorReset]);

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
				<form onSubmit={handleSubmit(submitHandler)}>
					<Controller
						as={TextField}
						control={control}
						defaultValue={email}
						type="text"
						id="email"
						name="email"
						label="Адрес эл. почты*:"
						inputProps={{ className: st('input') }}
						value={email}
						onChange={changeEmailHandler}
						autoComplete="off"
						autoFocus
						fullWidth
						rules={{
							required: 'Введите адрес эл. почты',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
								message: 'Введите корректный адрес эл. почты',
							},
						}}
					/>
					<span className={st('validateError')}>{errors.email && errors.email.message}</span>

					<Controller
						as={TextField}
						control={control}
						defaultValue={password}
						type="password"
						id="password"
						name="password"
						label="Пароль*:"
						inputProps={{ className: st('input') }}
						value={password}
						onChange={changePasswordHandler}
						autoComplete="off"
						fullWidth
						rules={{
							required: 'Введите пароль',
							minLength: {
								value: 6,
								message: 'Введите пароль не менее 6 символов',
							},
						}}
					/>
					<span className={st('validateError')}>{errors.password && errors.password.message}</span>
					<span className={st('error')}>{serverError}</span>
					{isLogging ? (
						<Preloader />
					) : (
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={st('button')}
							style={{ width: '100px' }}
							disabled={
								!(formState.dirtyFields.email && formState.dirtyFields.password) ||
								(formState.isSubmitted && !formState.isValid)
							}
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
	serverError: PropTypes.string,
	isLogging: PropTypes.bool,
};

export const mapStateToProps = (state) => {
	return {
		isLoggedIn: getIsLoggedIn(state),
		serverError: getError(state),
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
