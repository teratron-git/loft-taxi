import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

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
						<label htmlFor="password" style={{ marginTop: '50px' }}>
							Пароль*:
						</label>
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
	}
}

LoginForm.propTypes = {
	getPage: PropTypes.func,
};
