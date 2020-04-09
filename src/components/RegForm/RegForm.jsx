import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

export class RegForm extends React.Component {
	state = { email: '', name: '', surname: '', password: '' };

	clickHandler = (page) => {
		this.props.getPage(page);
	};

	changeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	submitHandler = (e) => {
		e.preventDefault();
		this.clickHandler('map');
	};

	render() {
		return (
			<div className="login-page__loginForm">
				<div className="login-page__loginForm-item">
					<div className="header-form">Регистрация</div>
					<div className="header-form__add">
						Уже зарегистрированы?
						<span onClick={() => this.clickHandler('login')}>Войти</span>
					</div>
					<form onSubmit={this.submitHandler}>
						<label htmlFor="email">Адрес эл. почты*:</label>
						<Input
							type="text"
							id="email"
							name="email"
							className="input"
							value={this.state.email}
							onChange={this.changeHandler}
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
								value={this.state.name}
								onChange={this.changeHandler}
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
								value={this.state.surname}
								onChange={this.changeHandler}
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
							value={this.state.password}
							onChange={this.changeHandler}
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
	}
}

RegForm.propTypes = {
	getPage: PropTypes.func,
};
