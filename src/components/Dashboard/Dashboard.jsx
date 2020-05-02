import React from 'react';
import MapPage from './MapPage';
import ProfilePage from './ProfilePage';
import { Switch, Route } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export const Dashboard = () => {
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Switch>
				<Route path="/dashboard/profile" component={ProfilePage}></Route>
				<Route path="/dashboard/map" component={MapPage}></Route>
			</Switch>
		</MuiPickersUtilsProvider>
	);
};
