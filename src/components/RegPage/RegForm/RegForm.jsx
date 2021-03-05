import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actions } from '../../../store/register/actions';
import { getError, getIsReg, getIsRegistrating } from '../../../store/register/selectors';
import { Preloader } from '../../shared/Preloader';
import styles from './RegForm.module.css';

const st = classNames.bind(styles);
let { reg, regErrorReset } = actions;

const RegForm = (props) => {
	let { handleSubmit, control, formState, errors } = useForm();

	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');
	let [name, setName] = useState('');
	let [surname, setSurname] = useState('');

	let { reg, isReg, serverError, isRegistrating } = props;

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
		reg({ email: e.email, password: e.password, name: e.name, surname: e.surname });
	};

	useEffect(() => {
		return () => {
			regErrorReset();
		};
	}, []);

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
				<form onSubmit={handleSubmit(submitHandler)}>
					<Controller
						as={TextField}
						control={control}
						defaultValue={email}
						type="text"
						id="email"
						name="email"
						label="Адрес эл. почты*:"
						value={email}
						onChange={changeEmailHandler}
						className={st('input')}
						required
						fullWidth
						autoComplete="off"
						autoFocus
						rules={{
							required: 'Введите адрес эл. почты',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
								message: 'Введите корректный адрес эл. почты',
							},
						}}
						inputProps={{ className: st('input') }}
					/>
					<span className={st('validateError')}>{errors.email && errors.email.message}</span>
					<div id="name-div" className={st('name-div')}>
						<Controller
							as={TextField}
							control={control}
							defaultValue={name}
							type="text"
							id="name"
							name="name"
							label="Имя*:"
							className={st('input')}
							value={name}
							onChange={changeNameHandler}
							fullWidth
							autoComplete="off"
							rules={{
								required: 'Введите имя',
								pattern: {
									value: /^[а-яА-ЯёЁa-zA-Z]+$/i,
									message: 'Используйте только буквы (без пробелов)',
								},
							}}
							inputProps={{ className: st('input') }}
						/>
						<span className={st('validateError')}>{errors.name && errors.name.message}</span>
					</div>
					<div id="surname-div" className={st('surname-div')}>
						<Controller
							as={TextField}
							control={control}
							defaultValue={surname}
							type="text"
							id="surname"
							name="surname"
							label="Фамилия*:"
							className={st('input')}
							value={surname}
							onChange={changeSurnameHandler}
							fullWidth
							autoComplete="off"
							rules={{
								required: 'Введите фамилию',
								pattern: {
									value: /^[а-яА-ЯёЁa-zA-Z]+$/i,
									message: 'Используйте только буквы (без пробелов)',
								},
							}}
							inputProps={{ className: st('input') }}
						/>
						<span className={st('validateError')}>{errors.surname && errors.surname.message}</span>
					</div>
					<div className={st('password')}>
						<Controller
							as={TextField}
							control={control}
							defaultValue={password}
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
							rules={{
								required: 'Введите пароль',
								minLength: {
									value: 6,
									message: 'Введите пароль не менее 6 символов',
								},
							}}
							inputProps={{ className: st('input') }}
						/>
					</div>
					<span className={st('validateError')}>{errors.password && errors.password.message}</span>
					<span className={st({ error: !isReg, 'no-error': isReg })}>{serverError}</span>
					{isRegistrating ? (
						<Preloader />
					) : (
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={st('button')}
							disabled={
								!(
									formState.dirtyFields.email &&
									formState.dirtyFields.password &&
									formState.dirtyFields.name &&
									formState.dirtyFields.surname
								) ||
								(formState.isSubmitted && !formState.isValid)
							}
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

export default connect(mapStateToProps, mapDispatchToProps)(RegForm);
