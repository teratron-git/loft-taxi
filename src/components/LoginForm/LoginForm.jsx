import React from 'react';

export class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			height: '',
		};
	}

	changeSize = () => {
		let height = document.querySelector('.login-page__loginForm-item').style.height;
		height = 300 + 'px';
		console.log(height);
		this.setState({ height: height });
	};

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
				<div
					className="login-page__loginForm-item"
					onClick={this.changeSize}
					style={{ height: '400px' }}
				>
					<div className="header-form">Вход</div>
					<div className="header-form__add">
						Новый пользователь?
						<span page="reg" onClick={this.clickHandler}>
							Зарегистрироваться
						</span>
					</div>
					<label for="email">Адрес эл. почты*:</label>
					<input type="text" id="email" name="email" required autocomplete="off" autoFocus />
					<label for="password" style={{ marginTop: '50px' }}>
						Пароль*:
					</label>
					<input type="password" id="password" name="password" required autocomplete="off" />
					<button class="button" style={{ width: '100px' }} page="map" onClick={this.clickHandler}>
						Войти
					</button>
				</div>
			</div>
		);
	}
}
