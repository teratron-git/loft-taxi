import React from 'react';

export class RegForm extends React.Component {
	clickHandler = (page) => {
		this.props.getPage(page);
	};
	render() {
		return (
			<div className="login-page__loginForm">
				<div className="login-page__loginForm-item">
					<div className="header-form">Регистрация</div>
					<div className="header-form__add">
						Уже зарегистрированы?
						<span page="login" onClick={() => this.clickHandler('login')}>
							Войти
						</span>
					</div>
					<form action="#">
						<label htmlFor="email">Адрес эл. почты*:</label>
						<input type="text" id="email" name="email" required autoComplete="off" autoFocus />
						<div id="name-div">
							<label htmlFor="name">Имя*:</label>
							<input type="text" id="name" name="name" required autoComplete="off" />
						</div>
						<div id="surname-div">
							<label htmlFor="surname">Фамилия*:</label>
							<input type="text" id="surname" name="surname" required autoComplete="off" />
						</div>
						<label htmlFor="password">Пароль*:</label>
						<input type="password" id="password" name="password" required autoComplete="off" />
						<button
							className="popup-form__btn button"
							type="button"
							onClick={() => this.clickHandler('map')}
						>
							Зарегистрироваться
						</button>
					</form>
				</div>
			</div>
		);
	}
}
