import { CssBaseline } from '@mui/material';
import UserContextProvider from './config/UserContext';
import AppRoute from './router/AppRoute';

function App() {
	return (
		<UserContextProvider>
			<CssBaseline />
			<AppRoute />
		</UserContextProvider>
	);
}

export default App;
