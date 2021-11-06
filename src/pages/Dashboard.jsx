import Box from '@mui/material/Box';
import NavLeft from '../components/Dashboard/NavLeft';

export default function Dashboard({ children }) {
	return (
		<Box sx={{ display: 'flex' }}>
			<NavLeft />
			{children}
		</Box>
	);
}
