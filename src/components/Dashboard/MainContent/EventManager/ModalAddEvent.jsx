import { Button, Grid, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import enLocale from 'date-fns/locale/en-US';
import { useState } from 'react';
import { addNewEvent } from '../../../../api/eventApi';

export default function ModalAddEvent({ isOpen, handleClose, addNewEventState }) {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();
	const [dateModal, setDateModal] = useState(Date.now());
	const [dateOpenRegModal, setDateOpenRegModal] = useState(Date.now());
	const [dateEndRegModal, setDateEndRegModal] = useState(Date.now());
	const [typeEvent, setTypeEvent] = useState('');
	const handleAddNewEvent = (data) => {
		addNewEvent(data)
			.then((res) => {
				addNewEventState(res.event);
				handleClose();
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Thêm sự kiện mới thành công',
					showConfirmButton: false,
					timer: 2000,
					target: 'body',
				});
			})
			.catch((err) => {
				handleClose();
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Có lỗi xảy ra vui lòng thử lại',
					showConfirmButton: false,
					timer: 2000,
					target: 'body',
				});
			});
	};
	return (
		<Modal
			open={isOpen}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 600,
					height: 'calc(100vh - 300px)',
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
						Thêm Sự Kiện Mới
					</Typography>
				</Box>
				<Box
					component="form"
					onSubmit={handleSubmit(handleAddNewEvent)}
					sx={{
						p: 3,
					}}
				>
					<Grid container spacing={3}>
						<Grid item xs={12} md={12} sm={12} lg={12}>
							<TextField
								fullWidth
								error={errors.name ? true : false}
								helperText={errors.name && 'Vui lòng nhập tên sự kiện'}
								type="text"
								label="Tên sự kiện*"
								variant="standard"
								{...register('name', { required: true })}
							/>
						</Grid>
						<Grid item xs={12} md={12} sm={12} lg={12}>
							<TextField
								fullWidth
								error={errors.location ? true : false}
								helperText={
									errors.location && 'Vui lòng nhập địa điểm tổ chức sự kiện'
								}
								type="text"
								label="Địa điểm tổ chức*"
								variant="standard"
								{...register('location', { required: true })}
							/>
						</Grid>
						<Grid item xs={12} md={12} sm={12} lg={12}>
							<LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
								<DatePicker
									label="Chọn ngày tổ chức sự kiện*"
									mask="__/__/____"
									value={dateModal}
									defaultCalendarMonth
									onChange={(newDate) => {
										setDateModal(newDate);
										setValue('dateEvent', newDate);
									}}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</Grid>
						<Grid item xs={12} md={12} sm={12} lg={12}>
							<TextField
								fullWidth
								error={errors.typeEvent ? true : false}
								helperText={errors.typeEvent && 'Vui lòng chọn loại sự kiện'}
								select
								label="Loại sự kiện*"
								value={typeEvent}
								{...register('typeEvent', { required: true })}
								onChange={(event) => {
									setTypeEvent(event.target.value);
								}}
							>
								<MenuItem value={'public'}>Sự Kiện Công Khai</MenuItem>
								<MenuItem value={'private'}>Sự Kiện Riêng</MenuItem>
								<MenuItem value={'restricted'}>Sự Kiện Hạn Chế</MenuItem>
							</TextField>
						</Grid>

						{typeEvent === 'restricted' && (
							<>
								<Grid item xs={12} md={12} sm={12} lg={12}>
									<LocalizationProvider
										dateAdapter={AdapterDateFns}
										locale={enLocale}
									>
										<DatePicker
											label="Chọn ngày mở đăng ký*"
											mask="__/__/____"
											value={dateOpenRegModal}
											onChange={(newDate) => {
												setDateOpenRegModal(newDate);
												setValue('openReg', newDate);
											}}
											renderInput={(params) => <TextField {...params} />}
										/>
									</LocalizationProvider>
								</Grid>
								<Grid item xs={12} md={12} sm={12} lg={12}>
									<LocalizationProvider
										dateAdapter={AdapterDateFns}
										locale={enLocale}
									>
										<DatePicker
											label="Chọn ngày kết thúc đăng ký*"
											mask="__/__/____"
											value={dateEndRegModal}
											onChange={(newDate) => {
												setDateEndRegModal(newDate);
												setValue('endReg', newDate);
											}}
											renderInput={(params) => <TextField {...params} />}
										/>
									</LocalizationProvider>
								</Grid>
							</>
						)}
					</Grid>
					<Box
						sx={{
							p: 3,
							display: 'flex',
							justifyContent: 'flex-end',
						}}
					>
						<Button variant="contained" color="success" type="submit">
							Thêm
						</Button>

						<Button
							variant="contained"
							color="error"
							onClick={handleClose}
							sx={{ ml: 3 }}
						>
							Hủy
						</Button>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
}
