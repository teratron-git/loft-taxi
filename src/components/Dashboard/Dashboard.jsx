import MapPage from './MapPage';
import ProfilePage from './ProfilePage';
import { Switch, Route } from 'react-router-dom';

export const Dashboard = () => {
	return (
		<Switch>
			<Route path="/dashboard/profile" component={ProfilePage}></Route>
			<Route path="/dashboard/map" component={MapPage}></Route>
		</Switch>
	);
};
