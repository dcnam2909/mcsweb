import { Route, Switch } from 'react-router';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import EventManagerComponent from '../components/Dashboard/MainContent/EventManager/EventManager';
import AccountComponent from '../components/Dashboard/MainContent/Account';
import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';
import { useContext } from 'react';
import { UserContext } from '../config/UserContext';
import ListEvent from '../components/Dashboard/MainContent/ListEvent/ListEvent';
import AgentComponent from '../components/Dashboard/MainContent/Agent/Agent';
import ReportComponent from '../components/Dashboard/MainContent/Report/Report';
import VisiterManager from '../components/Dashboard/MainContent/VisiterManager/VisiterManager';
import NotFoundPage from '../pages/NotFoundPage';
import GroupVisiter from '../components/Dashboard/MainContent/GroupVisiter/GroupVisiter';
import ListEventReg from '../components/Dashboard/MainContent/ListEventReg/ListEventReg';
function AppRoute() {
	const [user] = useContext(UserContext);
	const checkRoles = (user, ...roles) => {
		if (!user) return null;
		return roles.includes(user.role) ? user : null;
	};

	const isAgent = () => {
		return user.role === 'Agent';
	};
	const isAdmin = () => {
		return user.role === 'Admin';
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
				component={ListEvent}
			/>
			<PrivateRoute
				path="/list-reg-event"
				auth={checkRoles(user, 'Visiter')}
				component={ListEventReg}
			/>
			<PrivateRoute
				path="/visiter-manager"
				auth={checkRoles(user, 'Admin', 'Manager')}
				component={() => <VisiterManager isAdmin={isAdmin()} />}
			/>
			<PrivateRoute
				path="/group-visiter"
				auth={checkRoles(user, 'Manager')}
				component={() => <GroupVisiter />}
			/>
			<Route path="*" render={() => <NotFoundPage />} />
		</Switch>
	);
}

export default AppRoute;
