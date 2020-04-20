import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { sendDataToServer } from '../../shared/sendData';
import { actions } from '../../../store/register/actions';
import { connect } from 'react-redux';
import { useState } from 'react';

let { reg, regSuccess, regFailure } = actions;

const RegForm = (props) => {
	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');
	let [name, setName] = useState('');
	let [surname, setSurname] = useState('');

	let { reg, regSuccess, regFailure } = props;

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

		let isSubmit = true;
		reg({ email, password, name, surname, isSubmit });
		isSubmit = false;
	};

	console.log('Пропс из регистрации', props);

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

const mapStateToProps = (state) => {
	return {
		email: state.register.email,
		password: state.register.password,
		name: state.register.name,
		surname: state.register.surname,
	};
};

const mapDispatchToProps = {
	reg,
	regSuccess,
	regFailure,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegForm);
