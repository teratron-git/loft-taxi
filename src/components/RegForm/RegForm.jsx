import React from 'react';

export class RegForm extends React.Component {
	clickHandler = (e) => {
		let page = e.target.getAttribute('page');
		this.props.getPage(page);
		console.log(page);
	};
	getPage = (page) => {
		this.props.getPage(page);
	};
	render() {
		return (
			<div className="login-page__loginForm">
				<div className="login-page__loginForm-item">
					<div className="header-form">Регистрация</div>
					<div className="header-form__add">
						Уже зарегистрированы?
						<span page="login" onClick={this.clickHandler}>
							Войти
						</span>
					</div>
					<label for="email">Адрес эл. почты*:</label>
					<input type="text" id="email" name="email" required autocomplete="off" autoFocus />
					<div id="name-div">
						<label for="name" if>
							Имя*:
						</label>
						<input type="text" id="name" name="name" required autocomplete="off" />
					</div>
					<div id="surname-div">
						<label for="surname" if>
							Фамилия*:
						</label>
						<input type="text" id="surname" name="surname" required autocomplete="off" />
					</div>
					<label for="password">Пароль*:</label>
					<input type="password" id="password" name="password" required autocomplete="off" />
					<button class="popup-form__btn button" page="map" onClick={this.clickHandler}>
						Зарегистрироваться
					</button>
				</div>
			</div>
		);
	}
}
