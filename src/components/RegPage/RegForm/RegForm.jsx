import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Field, reduxForm } from 'redux-form'
import styles from './RegForm.module.css';
import { Preloader } from '../../shared/Preloader';
import { actions } from '../../../store/register/actions';
import { getIsReg, getError, getIsRegistrating } from '../../../store/register/selectors'

const st = classNames.bind(styles);

let { reg, regErrorReset } = actions;

const emailCheck = value => {
	return !value
		? ('Поле не должно быть пустым')
		: value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
			? 'Введите корректный email'
			: undefined
}

const passwordCheck = value => {
	return !value
		? ('Поле не должно быть пустым')
		: value && value.length < 6
			? 'Введите пароль не менее 6 символов'
			: undefined
}

const namesCheck = value => {
	return !value
		? ('Поле не должно быть пустым')
		: (/^.*[^A-zА-яЁё].*$/i.test(value)
			? 'Используйте только буквы без пробелов'
			: undefined)
}

const customField = ({ input, type, label, placeholder, id, className, fullWidth, inputProps, meta: { touched, error }, ...rest }) => {
	return (
		<>
			<TextField {...input} label={label} placeholder={placeholder} type={type} id={id} className={className} fullWidth={fullWidth} inputProps={inputProps} />
			<span className={st('validateError')}>{touched && error}</span>
		</>
	)
}

const RegForm = (props) => {
	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');
	let [name, setName] = useState('');
	let [surname, setSurname] = useState('');

	let { reg, isReg, serverError, isRegistrating } = props;
	let { valid } = props;

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
					<Field
						type="text"
						id="email"
						name="email"
						label="Адрес эл. почты*:"
						className={st('input')}
						value={email}
						onChange={changeEmailHandler}
						required
						fullWidth
						autoComplete="off"
						autoFocus
						component={customField}
						validate={emailCheck}
						inputProps={{ className: st('input') }}
					/>
					<div id="name-div" className={st('name-div')}>
						<Field
							type="text"
							id="name"
							name="name"
							label="Имя*:"
							className={st('input')}
							value={name}
							onChange={changeNameHandler}
							required
							fullWidth
							autoComplete="off"
							component={customField}
							validate={namesCheck}
							inputProps={{ className: st('input') }}
						/>
					</div>
					<div id="surname-div" className={st('surname-div')}>
						<Field
							type="text"
							id="surname"
							name="surname"
							label="Фамилия*:"
							className={st('input')}
							value={surname}
							onChange={changeSurnameHandler}
							required
							fullWidth
							autoComplete="off"
							component={customField}
							validate={namesCheck}
							inputProps={{ className: st('input') }}
						/>
					</div>
					<div className={st('password')}>
						<Field
							type="password"
							id="password"
							name="password"
							label="Пароль*:"
							className={st('input')}
							value={password}
							onChange={changePasswordHandler}
							required
							fullWidth
							autoComplete="off"
							component={customField}
							validate={passwordCheck}
							inputProps={{ className: st('input') }}
						/>
					</div>
					<span className={st({ 'error': !isReg, 'no-error': isReg })}>{serverError}</span>
					{isRegistrating ? (<Preloader />)
						: (
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className={st('button')}
								disabled={!email || !password || !name || !surname || !valid}
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
	reg: PropTypes.func,
	isRegistrating: PropTypes.bool,
};

export const mapStateToProps = (state) => {
	return {
		isReg: getIsReg(state),
		serverError: getError(state),
		isRegistrating: getIsRegistrating(state),
	};
};

export const mapDispatchToProps = (dispatch) => {
	return {
		reg: bindActionCreators(reg, dispatch),
		regErrorReset: bindActionCreators(regErrorReset, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'RegForm'
})(RegForm));
