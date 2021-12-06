import { Button, Grid, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import enLocale from 'date-fns/locale/en-US';
import { useState } from 'react';

export default function ModalEditEvent({ event, isOpenEdit, handleCloseEdit, handleUpdateEvent }) {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();
	const [dateModal, setDateModal] = useState(event.dateEvent);
	const [typeEvent, setTypeEvent] = useState(event.typeEvent);
	const [dateOpenRegModal, setDateOpenRegModal] = useState(event.openReg);
	const [dateEndRegModal, setDateEndRegModal] = useState(event.endReg);
	const update = (data) => {
		handleCloseEdit();
		handleUpdateEvent(event, data);
	};
	return (
		<Modal
			open={isOpenEdit}
			aria-labelledby="modal-modal-title-edit"
			aria-describedby="modal-modal-description-edit"
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
						id="modal-modal-title-edit"
						variant="h5"
						component="h2"
						align="center"
						sx={{ fontWeight: 'bolder' }}
					>
						Thay đổi sự kiện
					</Typography>
				</Box>
				<Box
					component="form"
					onSubmit={handleSubmit(update)}
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
								defaultValue={event.name}
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
								defaultValue={event.location}
								{...register('location', { required: true })}
							/>
						</Grid>
						<Grid item xs={12} md={12} sm={12} lg={12}>
							<LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
								<DateTimePicker
									label="Chọn ngày*"
									mask="__/__/____"
									value={dateModal}
									onChange={(newDate) => {
										setDateModal(new Date(newDate.setSeconds(0)));
										setValue('dateEvent', new Date(newDate.setSeconds(0)));
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
										<DateTimePicker
											label="Chọn ngày mở đăng ký*"
											mask="__/__/____"
											value={dateOpenRegModal}
											onChange={(newDate) => {
												setDateOpenRegModal(
													new Date(newDate.setSeconds(0)),
												);
												setValue(
													'openReg',
													new Date(newDate.setSeconds(0)),
												);
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
										<DateTimePicker
											label="Chọn ngày kết thúc đăng ký*"
											mask="__/__/____"
											value={dateEndRegModal}
											onChange={(newDate) => {
												setDateEndRegModal(new Date(newDate.setSeconds(0)));
												setValue('endReg', new Date(newDate.setSeconds(0)));
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
							Thay đổi
						</Button>

						<Button
							variant="contained"
							color="error"
							onClick={handleCloseEdit}
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
