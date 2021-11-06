import { Route, Switch } from 'react-router';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import EventManagerComponent from '../components/Dashboard/MainContent/EventManager/EventManager';
import AccountComponent from '../components/Dashboard/MainContent/Account';
import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';
import { useContext } from 'react';
import { UserContext } from '../config/UserContext';
import AdminComponent from '../components/Dashboard/MainContent/Admin';
import EventListComponent from '../components/Dashboard/MainContent/EventList';
import AgentComponent from '../components/Dashboard/MainContent/Agent/Agent';
import ReportComponent from '../components/Dashboard/MainContent/Report/Report';
function AppRoute() {
	const [user] = useContext(UserContext);
	const checkRoles = (user, ...roles) => {
		if (!user) return null;
		return roles.includes(user.role) ? user : null;
	};

	const isAgent = () => {
		return user.role === 'Agent';
	};
	return (
		<Switch>
			<PublicRoute
				exact
				path="/"
				auth={checkRoles(user, 'Manager', 'Agent', 'Visiter', 'Admin')}
				component={SignIn}
			/>
			<PublicRoute
				exact
				path="/signup"
				auth={checkRoles(user, 'Manager', 'Agent', 'Visiter', 'Admin')}
				component={SignUp}
			/>
			<PrivateRoute
				path="/account"
				auth={checkRoles(user, 'Manager', 'Agent', 'Visiter')}
				component={AccountComponent}
			/>
			<PrivateRoute
				path="/event"
				auth={checkRoles(user, 'Manager')}
				component={EventManagerComponent}
			/>
			<PrivateRoute
				path="/agent"
				auth={checkRoles(user, 'Manager', 'Agent')}
				component={() => <AgentComponent isAgent={isAgent()} />}
			/>
			<PrivateRoute
				path="/report"
				auth={checkRoles(user, 'Manager')}
				component={ReportComponent}
			/>
			<PrivateRoute
				path="/list-event"
				auth={checkRoles(user, 'Visiter')}
				component={EventListComponent}
			/>
			<PrivateRoute
				path="/admin"
				auth={checkRoles(user, 'Admin')}
				component={AdminComponent}
			/>
			<Route path="*" render={() => <h1>ERROR 404!</h1>} />
		</Switch>
	);
}

export default AppRoute;
