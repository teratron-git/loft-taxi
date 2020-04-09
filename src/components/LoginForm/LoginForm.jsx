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
