import { Container, Toolbar } from '@mui/material';
import { Box } from '@mui/system';

export default function ReportComponent() {
	return (
		<Box
			component="main"
			sx={{
				backgroundColor: '#f5f5f5',
				flexGrow: 1,
				height: '100vh',
				overflow: 'auto',
			}}
		>
			<Toolbar />
			<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
				<h1>Report</h1>
			</Container>
		</Box>
	);
}
