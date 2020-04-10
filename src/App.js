import React from 'react';
import { LoginPage } from './components/LoginPage';
import { RegPage } from './components/RegPage';
import { MapPage } from './components/MapPage';
import { ProfilePage } from './components/ProfilePage';
import './index.css';

class App extends React.Component {
	state = { page: 'logout' };

	getPage = (page) => {
		this.setState({ page });
	};
	render() {
		const { page } = this.state;
		return (
			<>
				{page === 'logout' && <LoginPage getPage={this.getPage} />}
				{page === 'reg' && <RegPage getPage={this.getPage} />}
				{page === 'map' && <MapPage getPage={this.getPage} />}
				{page === 'profile' && <ProfilePage getPage={this.getPage} />}
			</>
		);
	}
}

export default App;
