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

export const LoginForm = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const authContext = useContext(AuthContext);

	const changeEmailHandler = (e) => {
		setEmail(e.target.value);
	};

	const changePasswordHandler = (e) => {
		setPassword(e.target.value);
	};

	const submitHandler = (e) => {
		authContext.login(email, password);
	};

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
				<form>
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
					<Link type="submit" to="map" onClick={submitHandler}>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className="button"
							style={{ width: '100px' }}
						>
							Войти
						</Button>
					</Link>
				</form>
			</div>
		</div>
	);
};

LoginForm.propTypes = {
	getPage: PropTypes.func,
};
