import { Button, TableCell, TableRow, TextField } from '@mui/material';
import { useState } from 'react';
import { getQRCode } from '../../../../api/eventApi';
import ModalQRCode from './ModalQRCode';
import Swal from 'sweetalert2';
import ModalSetAgent from './ModalSetAgent';
export default function RowAgent({ event, users, handleSetAgent, handleRemoveAgent, isAgent }) {
	const [modalQRCode, setModalQRCode] = useState(false);
	const [modalSetAgent, setModalSetAgent] = useState(false);
	const [qrCode, setQrCode] = useState('');
	const [qrCodeExpire, setQrCodeExpire] = useState(0);
	const [expire, setExpire] = useState(10);
	const handleOpenModalQRCode = () => {
		getQRCodeFN();
	};
	const handleCloseModalQRCode = () => {
		setModalQRCode(false);
	};
	const getQRCodeFN = () => {
		getQRCode(event._id, expire)
			.then((res) => {
				setQrCode(res.message.qrcode);
				setQrCodeExpire(res.message.expireIn * 1);
				setModalQRCode(true);
			})
			.catch((err) => {
				setModalQRCode(false);
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: `Sự kiện ${event.name} chưa bắt đầu!`,
					showConfirmButton: false,
					timer: 2000,
					target: 'body',
				});
			});
	};

	const handleOpenModalSetAgent = () => {
		setModalSetAgent(true);
	};
	const handleCloseModalSetAgent = () => {
		setModalSetAgent(false);
	};
	return (
		<TableRow hover role="checkbox" tabIndex={-1}>
			<TableCell align="left">{event.name}</TableCell>
			<TableCell align="left">{event.location}</TableCell>
			<TableCell align="center">
				{new Date(event.dateEvent).toLocaleTimeString('vi-VN').split(':')[0] +
					':' +
					new Date(event.dateEvent).toLocaleTimeString('vi-VN').split(':')[1] +
					'\n' +
					new Date(event.dateEvent).toLocaleDateString('vi-VN')}
			</TableCell>
			<TableCell align="center">
				<TextField
					sx={{ width: '100px' }}
					type="number"
					variant="standard"
					value={expire}
					onChange={(e) => {
						if (e.target.value >= 0) {
							setExpire(e.target.value);
						}
						e.preventDefault();
					}}
				/>
				<i>Minute(s)</i>
			</TableCell>
			<TableCell align="center">
				{!isAgent && (
					<>
						<Button
							variant="contained"
							color="success"
							sx={{ ml: 2 }}
							size="medium"
							onClick={handleOpenModalSetAgent}
						>
							SET AGENT
						</Button>
						{modalSetAgent && (
							<ModalSetAgent
								isOpenSetAgent={modalSetAgent}
								handleCloseSetAgent={handleCloseModalSetAgent}
								event={event}
								users={users}
								handleSetAgent={handleSetAgent}
								handleRemoveAgent={handleRemoveAgent}
							/>
						)}
					</>
				)}
				<Button
					variant="contained"
					sx={{ ml: 2 }}
					size="medium"
					onClick={handleOpenModalQRCode}
					disabled={new Date(event.dateEvent) > new Date() ? true : false}
				>
					BẮT ĐẦU CHECK-IN
				</Button>
				{modalQRCode && (
					<ModalQRCode
						modalQRCode={modalQRCode}
						handleCloseModalQRCode={handleCloseModalQRCode}
						event={event}
						qrCode={qrCode}
						qrCodeExpire={qrCodeExpire}
						getQRCodeFN={getQRCodeFN}
					/>
				)}
			</TableCell>
		</TableRow>
	);
}
