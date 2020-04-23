import React from 'react';
import { Redirect, Switch, Route, withRouter } from 'react-router-dom';
import Header from '../../components/Dashboard/Header';
import { Dashboard } from '../../components/Dashboard';

const AppRouter = () => {
	return (
			<div className="app">
				<Header />
				<Switch>
					<Route path="/dashboard" component={Dashboard}></Route>
					<Redirect path="/dashboard/*" to="/dashboard/map"></Redirect>
				</Switch>
			</div>
	);
};

export default withRouter(AppRouter);
