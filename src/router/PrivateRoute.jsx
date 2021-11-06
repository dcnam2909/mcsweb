import { Route, Redirect } from 'react-router-dom';

import DashBoard from '../pages/Dashboard';
import Footer from '../components/Footer';

function PrivateRoute({ auth, component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			component={(props) => {
				return auth !== null ? (
					<DashBoard>
						<Component {...props}>
							<Footer />
						</Component>
					</DashBoard>
				) : (
					<Redirect to="/" />
				);
			}}
		/>
	);
}

export default PrivateRoute;
