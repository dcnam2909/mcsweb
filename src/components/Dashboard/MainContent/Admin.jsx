import { Box } from "@mui/system";

export default function AdminComponent() {
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
			<h1>Admin</h1>;
		</Box>
	);
}
