import { Button, Modal, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export default function ModalQRCode({
	modalQRCode,
	handleCloseModalQRCode,
	qrCode,
	qrCodeExpire,
	event,
	getQRCodeFN,
}) {
	const [timeLeft, setTimeLeft] = useState(qrCodeExpire - Date.now());

	useEffect(() => {
		const countDown = setInterval(() => {
			setTimeLeft(timeLeft - 1000);
		}, 1000);
		return () => clearInterval(countDown);
	}, [timeLeft]);

	useEffect(() => {
		const timeOut = setInterval(() => {
			getQRCodeFN();
			handleCloseModalQRCode();
		}, qrCodeExpire - Date.now());
		return () => clearInterval(timeOut);
	}, [handleCloseModalQRCode, qrCodeExpire, getQRCodeFN]);

	return (
		<Modal
			open={modalQRCode}
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
				<Box
					width="100%"
					display="flex"
					justifyContent="center"
					alignItems="center"
					height="82%"
				>
					<Box component="img" src={qrCode} alt="QR Code" height="100%" />
				</Box>
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
							<b style={{ color: '#1976d2' }}>Tên sự kiện: </b>
							{event.name}
						</Typography>
						<Typography variant="h6">
							<b style={{ color: '#1976d2' }}>Địa điểm: </b>
							{event.location}
						</Typography>
						<Typography variant="h6">
							<b style={{ color: '#1976d2' }}>Thời gian: </b>
							{format(new Date(event.dateEvent), 'dd/MM/yyyy')}
						</Typography>
					</div>
					<div>
						<Typography variant="h6">
							<b style={{ color: 'black' }}>Hết hạn trong:</b>
						</Typography>
						<Typography variant="h4">
							<b style={{ color: 'red' }}>
								{Math.floor(timeLeft / 60000)}:
								{(((timeLeft % 60000) / 1000).toFixed(0) < 10 ? '0' : '') +
									((timeLeft % 60000) / 1000).toFixed(0)}
							</b>
						</Typography>
						<Button
							color="error"
							variant="contained"
							sx={{ mt: 1 }}
							onClick={handleCloseModalQRCode}
						>
							KẾT THÚC CHECK-IN
						</Button>
					</div>
				</Paper>
			</Box>
		</Modal>
	);
}
