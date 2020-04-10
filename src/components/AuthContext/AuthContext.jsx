import React from 'react';

export const AuthContext = React.createContext();

export class AuthProvider extends React.Component {
	state = { isLoggedIn: false };

	login = () => {
		this.setState({ isLoggedIn: true });
	};

	logout = () => {
		this.setState({ isLoggedIn: true });
	};

	render() {
		return (
			<AuthContext.Provider
				value={{ isLoggedIn: this.state.isLoggedIn, login: this.login, logout: this.logout }}
			>
				{this.props.children}
			</AuthContext.Provider>
		);
	}
}
