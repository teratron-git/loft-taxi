import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './RegForm.module.css';
import { Preloader } from '../../shared/Preloader';
import { actions } from '../../../store/register/actions';

const st = classNames.bind(styles);

let { reg, regErrorReset } = actions;

const RegForm = (props) => {
	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');
	let [name, setName] = useState('');
	let [surname, setSurname] = useState('');

	let { reg, isReg, error, isRegistrating } = props;

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

		reg({ email, password, name, surname });
	};

	useEffect(() => {
		return () => { regErrorReset() }
	}, [])

	return (
		<div className={st('login-page__loginForm')}>
			<div className={st('login-page__loginForm-item')}>
				<div className={st('header-form')}>Регистрация</div>
				<div className={st('header-form__add')}>
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
						className={st('input')}
						value={email}
						onChange={changeEmailHandler}
						required
						autoComplete="off"
						autoFocus
					/>
					<div id="name-div" className={st('name-div')}>
						<label htmlFor="name">Имя*:</label>
						<Input
							type="text"
							id="name"
							name="name"
							className={st('input')}
							value={name}
							onChange={changeNameHandler}
							required
							autoComplete="off"
						/>
					</div>
					<div id="surname-div" className={st('surname-div')}>
						<label htmlFor="surname">Фамилия*:</label>
						<Input
							type="text"
							id="surname"
							name="surname"
							className={st('input')}
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
						className={st('input')}
						value={password}
						onChange={changePasswordHandler}
						required
						autoComplete="off"
					/>
					<span className={st({ 'error': !isReg, 'no-error': isReg })}>{error}</span>
					{isRegistrating ? (<Preloader />)
						: (
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className={st('button')}
								disabled={!email || !password || !name || !surname}
							>
								Зарегистрироваться
							</Button>
						)}
				</form>
			</div>
		</div>
	);
};

RegForm.propTypes = {
	isReg: PropTypes.bool,
	Reg: PropTypes.func,
};

export const mapStateToProps = (state) => {
	return {
		isReg: state.register.isReg,
		error: state.register.error,
		isRegistrating: state.register.isRegistrating,
	};
};

export const mapDispatchToProps = (dispatch) => {
	return {
		reg: bindActionCreators(reg, dispatch),
		regErrorReset: bindActionCreators(regErrorReset, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RegForm);
