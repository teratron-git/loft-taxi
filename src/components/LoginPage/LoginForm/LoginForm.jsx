import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../../AuthContext';
import { useState } from 'react';
import { useContext } from 'react';

export const LoginForm = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const authContext = useContext(AuthContext);

	const clickHandler = (page) => {
		props.getPage(page);
	};

	const changeEmailHandler = (e) => {
		setEmail(e.target.value);
	};

	const changePasswordHandler = (e) => {
		setPassword(e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		authContext.login(email, password);
		clickHandler('map');
	};

	return (
		<div className="login-page__loginForm">
			<div className="login-page__loginForm-item" style={{ height: '400px' }}>
				<div className="header-form">Вход</div>
				<div className="header-form__add">
					Новый пользователь?
					<span onClick={() => clickHandler('reg')}>Зарегистрироваться</span>
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