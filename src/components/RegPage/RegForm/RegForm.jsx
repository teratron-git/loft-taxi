import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../../AuthContext';
import { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { sendDataToServer } from '../../shared/sendData';

export const RegForm = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const authContext = useContext(AuthContext);

	const dataRegister = { email, password, name, surname };
	const urlRegister = 'https://loft-taxi.glitch.me/register';

	const changeEmailHandler = (e) => {
		setEmail(e.target.value);
	};

	const changePasswordHandler = (e) => {
		setPassword(e.target.value);
	};

	const changeNameHandler = (e) => {
		setName(e.target.value);
	};

	const changeSurnameHandler = (e) => {
		setSurname(e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		sendDataToServer(urlRegister, dataRegister);
	};

	return (
		<div className="login-page__loginForm">
			<div className="login-page__loginForm-item">
				<div className="header-form">Регистрация</div>
				<div className="header-form__add">
					Уже зарегистрированы?
					<Link to="/logout">
						<span>Войти</span>
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
					<div id="name-div">
						<label htmlFor="name">Имя*:</label>
						<Input
							type="text"
							id="name"
							name="name"
							className="input"
							value={name}
							onChange={changeNameHandler}
							required
							autoComplete="off"
						/>
					</div>
					<div id="surname-div">
						<label htmlFor="surname">Фамилия*:</label>
						<Input
							type="text"
							id="surname"
							name="surname"
							className="input"
							value={surname}
							onChange={changeSurnameHandler}
							required
							autoComplete="off"
						/>
					</div>
					<label htmlFor="password">Пароль*:</label>
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
					<Button type="submit" variant="contained" color="primary" className="button">
						Зарегистрироваться
					</Button>
				</form>
			</div>
		</div>
	);
};

RegForm.propTypes = {
	getPage: PropTypes.func,
};
