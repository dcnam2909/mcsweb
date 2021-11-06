import { Button, Modal, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
export default function ModalReport({ modalReport, handleCloseModalReport }) {
	return (
		<Modal
			open={modalReport}
			aria-labelledby="modal-modal-title-edit"
			aria-describedby="modal-modal-description-edit"
		>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: '60%',
					height: '100%',
					bgcolor: 'white',
					boxShadow: 24,
					p: 2,
				}}
			>
				<Paper
					elevation={4}
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-around',
						p: 2,
						mt: 1,
						ml: 10,
						mr: 10,
					}}
				>
					<div>
						<Typography variant="h6">
							<b style={{ color: 'black' }}>Hết hạn trong:</b>
						</Typography>

						<Button
							color="error"
							variant="contained"
							sx={{ mt: 1 }}
							onClick={handleCloseModalReport}
						>
							KẾT THÚC CHECK-IN
						</Button>
					</div>
				</Paper>
			</Box>
		</Modal>
	);
}
