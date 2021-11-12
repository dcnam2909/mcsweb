import {
	Modal,
	Typography,
	Grid,
	Table,
	TableCell,
	TableRow,
	TableContainer,
	TableHead,
	TableBody,
	Paper,
	// Button,
} from '@mui/material';
import { Box } from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ModalReport({ report, modalReport, handleCloseModalReport }) {
	return (
		<Modal
			open={modalReport}
			onClose={handleCloseModalReport}
			aria-labelledby="modal-modal-title-edit"
			aria-describedby="modal-modal-description-edit"
		>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: '80%',
					height: '90%',
					bgcolor: 'white',
					boxShadow: 24,
				}}
			>
				<Box
					sx={{
						bgcolor: 'blue',
						color: 'white',
						p: 3,
					}}
				>
					<Typography
						id="modal-modal-title"
						variant="h5"
						component="h2"
						align="center"
						sx={{ fontWeight: 'bolder' }}
					>
						Báo cáo sự kiện: {report?.name}
					</Typography>
				</Box>
				<Grid container spacing={3} sx={{ mt: 4, pl: 2, pr: 2 }}>
					<Grid item xs={9}>
						<TableContainer sx={{ height: '650px' }}>
							<Table
								sx={{
									minWidth: 650,
									overflow: 'scroll',
									border: '1px solid rgba(224, 224, 224, 1)',
								}}
								size="small"
								aria-label="a dense table"
							>
								<TableHead sx={{ bgcolor: 'yellow' }}>
									<TableRow>
										<TableCell align="center">Họ và tên</TableCell>
										<TableCell align="center">Username</TableCell>
										<TableCell align="center">Thời gian check in</TableCell>
										<TableCell align="center">Thiết bị check in</TableCell>
										<TableCell align="center">Đã check in</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{report.listCheckin.map((item) => (
										<TableRow
											key={item._id}
											sx={{
												'&:last-child td, &:last-child th': { border: 0 },
											}}
										>
											<TableCell align="left">
												{item.visiter?.fullName}
											</TableCell>
											<TableCell align="left">
												{item.visiter?.username}
											</TableCell>
											<TableCell align="center">
												{item.timeCheckin
													? new Date(item?.timeCheckin).getDate() +
													  '/' +
													  (new Date(item?.timeCheckin).getMonth() + 1) +
													  '/' +
													  new Date(item?.timeCheckin).getFullYear()
													: 'N/A'}
											</TableCell>
											<TableCell align="left">{item.imei}</TableCell>
											<TableCell align="center">
												{item?.isCheckin ? (
													<CheckCircleIcon sx={{ color: 'blue' }} />
												) : (
													<CancelIcon sx={{ color: 'red' }} />
												)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item xs={3}>
						<Paper
							sx={{
								width: '100%',
								p: 4,
							}}
						>
							<Typography>
								<b>Tổng số người tham gia:</b> {report.listCheckin.length}
							</Typography>
							<Typography>
								<b>Tổng số người đã check in:</b>{' '}
								{report.listCheckin.filter((item) => item.isCheckin).length}
							</Typography>
							{/* <Button
								variant="contained"
								color="success"
								sx={{ mt: 4 }}
								onClick={handleCreateExcel}
							>
								DOWNLOAD EXCEL
							</Button> */}
						</Paper>
					</Grid>
				</Grid>
			</Box>
		</Modal>
	);
}
