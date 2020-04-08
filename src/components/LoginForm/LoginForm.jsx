import React from 'react';
import PropTypes from 'prop-types';

export class LoginForm extends React.Component {
	state = { email: '', password: '' };
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
				<div className="login-page__loginForm-item" style={{ height: '400px' }}>
					<div className="header-form">Вход</div>
					<div className="header-form__add">
						Новый пользователь?
						<span onClick={() => this.clickHandler('reg')}>Зарегистрироваться</span>
					</div>
					<form onSubmit={this.submitHandler}>
						<label htmlFor="email">Адрес эл. почты*:</label>
						<input
							type="text"
							id="email"
							name="email"
							value={this.state.email}
							onChange={this.changeHandler}
							required
							autoComplete="off"
							autoFocus
						/>
						<label htmlFor="password" style={{ marginTop: '50px' }}>
							Пароль*:
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={this.state.password}
							onChange={this.changeHandler}
							required
							autoComplete="off"
						/>
						<button className="button" style={{ width: '100px' }}>
							Войти
						</button>
					</form>
				</div>
			</div>
		);
	}
}

LoginForm.propTypes = {
	getPage: PropTypes.func,
};
