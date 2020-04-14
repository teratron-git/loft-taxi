import React from 'react';
import { LoginPage } from './components/LoginPage';
import { RegPage } from './components/RegPage';
import { MapPage } from './components/MapPage';
import { ProfilePage } from './components/ProfilePage';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from './components/AuthContext';
import { useContext } from 'react';
import './index.css';

const App = () => {
	const authContext = useContext(AuthContext);
	return (
		<>
			<Switch>
				<Route path="/" component={LoginPage} exact />
				<Route path="/logout" component={LoginPage} exact />
				<Route path="/reg" component={RegPage} exact />
				{!authContext.isLoggedIn && <Redirect from="/map" to="/reg" />}
				{!authContext.isLoggedIn && <Redirect from="/profile" to="/reg" />}
				<Route path="/map" component={MapPage} exact />
				<Route path="/profile" component={ProfilePage} exact />
			</Switch>
		</>
	);
};

export default App;
