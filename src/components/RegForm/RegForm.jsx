import React from 'react';

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
						<div id="name-div">
							<label htmlFor="name">Имя*:</label>
							<input
								type="text"
								id="name"
								name="name"
								value={this.state.name}
								onChange={this.changeHandler}
								required
								autoComplete="off"
							/>
						</div>
						<div id="surname-div">
							<label htmlFor="surname">Фамилия*:</label>
							<input
								type="text"
								id="surname"
								name="surname"
								value={this.state.surname}
								onChange={this.changeHandler}
								required
								autoComplete="off"
							/>
						</div>
						<label htmlFor="password">Пароль*:</label>
						<input
							type="password"
							id="password"
							name="password"
							value={this.state.password}
							onChange={this.changeHandler}
							required
							autoComplete="off"
						/>
						<button className="popup-form__btn button">Зарегистрироваться</button>
					</form>
				</div>
			</div>
		);
	}
}
