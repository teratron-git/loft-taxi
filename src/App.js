import React from 'react';
import './index.css';

class LoginForm extends React.Component {
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

class RegForm extends React.Component {
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

function Logo() {
	return (
		<div className="login-page__logo">
			<div className="login-page__logo-item"></div>
		</div>
	);
}

class Header extends React.Component {
	clickHandler = (e) => {
		let page = e.target.getAttribute('page');
		this.props.getPage(page);
		console.log(page);
	};
	render() {
		return (
			<div className="header">
				<div className="header-logo"></div>
				<div className="header-item" page="map" onClick={this.clickHandler}>
					Карта
				</div>
				<div className="header-item" page="profile" onClick={this.clickHandler}>
					Профиль
				</div>
				<div className="header-item" page="login" onClick={this.clickHandler}>
					Выйти
				</div>
			</div>
		);
	}
}

class LoginPage extends React.Component {
	getPage = (page) => {
		this.props.getPage(page);
	};
	render() {
		return (
			<div className="app">
				<Header getPage={this.getPage} />
				<div className="login-page">
					<Logo />
					<LoginForm getPage={this.getPage} />
				</div>
			</div>
		);
	}
}

class RegPage extends React.Component {
	getPage = (page) => {
		this.props.getPage(page);
	};
	render() {
		return (
			<div className="app">
				<Header getPage={this.getPage} />
				<div className="login-page">
					<Logo />
					<RegForm getPage={this.getPage} />
				</div>
			</div>
		);
	}
}

class MapPage extends React.Component {
	getPage = (page) => {
		this.props.getPage(page);
	};
	render() {
		return (
			<div className="app">
				<Header getPage={this.getPage} />
				<div className="map-page">Содержимое карты</div>
			</div>
		);
	}
}

class ProfilePage extends React.Component {
	getPage = (page) => {
		this.props.getPage(page);
	};
	render() {
		return (
			<div className="app">
				<Header getPage={this.getPage} />
				<div className="profile-page">Содержимое профиля</div>
			</div>
		);
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 'reg',
		};
	}
	getPage = (page) => {
		this.setState({ page: page });
	};
	render() {
		const { page } = this.state;
		return (
			<>
				{page === 'login' && <LoginPage getPage={this.getPage} />}
				{page === 'reg' && <RegPage getPage={this.getPage} />}
				{page === 'map' && <MapPage getPage={this.getPage} />}
				{page === 'profile' && <ProfilePage getPage={this.getPage} />}
			</>
		);
	}
}

export default App;
