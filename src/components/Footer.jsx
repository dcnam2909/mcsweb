import { Typography } from '@mui/material';

function Footer() {
	return (
		<Typography variant="body2" color="text.secondary" align="center" my={5}>
			{'Copyright © '}
			{'Dinh Chung Nam '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

export default Footer;
