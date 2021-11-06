import Footer from '../components/Footer';
import { Route, Redirect } from 'react-router-dom';

function PublicRoute({ auth, component: Component, ...rest }) {
	const pathRedirect = (role) => {
		switch (role) {
			case 'Manager':
				return '/event';
			case 'Agent':
				return '/agent';
			case 'Visiter':
				return '/list-event';
			case 'Admin':
				return '/admin';
			default:
				break;
		}
	};
	return (
		<Route
			{...rest}
			component={(props) => {
				return auth !== null ? (
					<Redirect to={pathRedirect(auth.role)} />
				) : (
					<>
						<Component {...props} />
						<Footer />
					</>
				);
			}}
		/>
	);
}

export default PublicRoute;
