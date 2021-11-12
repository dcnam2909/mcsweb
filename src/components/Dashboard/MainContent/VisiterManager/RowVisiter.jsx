import { Button, TableCell, TableRow } from '@mui/material';

export default function RowVisiter({
	user,
	isAdmin,
	handleSetAgent,
	handleSetManager,
	handleSetVisiter,
}) {
	const checkDisabled = () => {
		return user.role === 'Manager' && !isAdmin;
	};
	return (
		<TableRow hover tabIndex={-1}>
			<TableCell align="left">{user.username}</TableCell>
			<TableCell align="left">{user.fullName}</TableCell>
			<TableCell align="left">{user.email}</TableCell>
			<TableCell align="left">{user.phone}</TableCell>
			<TableCell align="left">{user.address}</TableCell>
			<TableCell align="left">{user.workUnit}</TableCell>
			<TableCell align="left">{user.addressUnit}</TableCell>
			<TableCell align="center">{user.idCB || 'X'}</TableCell>
			<TableCell align="center">{user.idSV || 'X'}</TableCell>
			<TableCell align="center">{user.role}</TableCell>
			<TableCell
				align="center"
				sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
			>
				{user.role !== 'Admin' ? (
					<>
						{' '}
						<Button
							disabled={checkDisabled() || user.role === 'Agent'}
							width="20%"
							variant="contained"
							color="primary"
							onClick={() => {
								handleSetAgent(user._id);
							}}
						>
							AGENT
						</Button>
						{isAdmin && (
							<Button
								width="20%"
								disabled={!isAdmin || user.role === 'Manager'}
								variant="contained"
								color="success"
								onClick={() => {
									handleSetManager(user._id);
								}}
							>
								MANAGER
							</Button>
						)}
						<Button
							disabled={checkDisabled() || user.role === 'Visiter'}
							width="20%"
							variant="contained"
							color="warning"
							onClick={() => {
								handleSetVisiter(user._id);
							}}
						>
							VISITER
						</Button>
					</>
				) : (
					<Button disabled fullWidth variant="contained">
						ADMIN
					</Button>
				)}
			</TableCell>
		</TableRow>
	);
}
