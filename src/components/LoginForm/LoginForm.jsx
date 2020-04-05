import React from 'react';

export class LoginForm extends React.Component {
	// Пока не удаляю, есть открытый вопрос по этому месту:
	// state = { height: '' };
	// changeSize = (size) => {
	// 	let height = document.querySelector('.login-page__loginForm-item').style.height;
	// 	height = size + 'px';
	// 	this.setState({ height });
	// 	console.log('height', height);
	// 	console.log('state', this.state);
	// };
	clickHandler = (page) => {
		this.props.getPage(page);
	};
	render() {
		return (
			<div className="login-page__loginForm">
				<div
					className="login-page__loginForm-item"
					// onClick={() => this.changeSize(100)}
					style={{ height: '400px' }}
				>
					<div className="header-form">Вход</div>
					<div className="header-form__add">
						Новый пользователь?
						<span onClick={() => this.clickHandler('reg')}>Зарегистрироваться</span>
					</div>
					<form action="#">
						<label htmlFor="email">Адрес эл. почты*:</label>
						<input type="text" id="email" name="email" required autoComplete="off" autoFocus />
						<label htmlFor="password" style={{ marginTop: '50px' }}>
							Пароль*:
						</label>
						<input type="password" id="password" name="password" required autoComplete="off" />
						<button
							className="button"
							type="button"
							style={{ width: '100px' }}
							onClick={() => this.clickHandler('map')}
						>
							Войти
						</button>
					</form>
				</div>
			</div>
		);
	}
}
