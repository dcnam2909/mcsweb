import { Box } from '@mui/system';
import { Button, Container, Grid, Paper, Toolbar } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { updateInfo, updatePassword } from '../../../api/userApi';
import { UserContext } from '../../../config/UserContext';
import Swal from 'sweetalert2';
function AccountComponent({ children }) {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm();
	const [user, setUser] = useContext(UserContext);
	const submitForm = (data) => {
		const { currentPassword, newPassword, ...newInfo } = data;
		updateInfo(newInfo).then((res) => {
			setUser(res.user);
			Swal.fire({
				position: 'middle',
				icon: 'success',
				title: 'Thay đổi thông tin thành công',
				showConfirmButton: false,
				timer: 2000,
			});
		});
	};

	const changePassword = (data) => {
		const { currentPassword, newPassword } = data;
		updatePassword({ currentPassword, newPassword })
			.then(() => {
				Swal.fire({
					position: 'middle',
					icon: 'success',
					title: 'Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại.',
					showConfirmButton: false,
					timer: 2000,
				});
				setTimeout(() => {
					window.location = '/';
				}, 2000);
			})
			.catch((err) => err.status === 401 && setError('currentPassword'));
	};
	useEffect(() => {
		document.title = 'Thông tin tài khoản';
	}, []);
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
				<Card
					sx={{
						minWidth: 100,
						position: 'relative',
						top: '15px',
						ml: 2,
						mr: 2,
						boxShadow: 3,
						backgroundColor: '#1976d2',
					}}
				>
					<CardContent>
						<Typography variant="h5" component="div" sx={{ color: 'white' }}>
							Thông tin người dùng
						</Typography>
						<Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
							Hoàn thiện hoặc thay đổi thông tin
						</Typography>
					</CardContent>
				</Card>
				<Grid container spacing={3}>
					<Grid item xs={12} md={12} sm={12} lg={12}>
						<Paper
							sx={{
								p: 4,
								pt: 3,
								pb: 0,
								height: '100vh',
							}}
						>
							<Box
								component="form"
								sx={{ mr: 10, ml: 10, mt: 2 }}
								onSubmit={handleSubmit(submitForm)}
							>
								<Grid container spacing={3}>
									<Grid item xs={4} md={12} sm={12} lg={4}>
										<TextField
											type="text"
											label="Họ và tên"
											variant="standard"
											{...register('fullName')}
											defaultValue={user?.fullName}
										/>
									</Grid>
									<Grid item xs={4} md={12} sm={12} lg={4}>
										<TextField
											label="Số điện thoại"
											variant="standard"
											{...register('phone')}
											defaultValue={user?.phone}
										/>
									</Grid>
									<Grid item xs={12} md={12} sm={12} lg={12}>
										<TextField
											sx={{ width: '100%' }}
											label="Địa chỉ"
											variant="standard"
											{...register('address')}
											defaultValue={user?.address}
										/>
									</Grid>
									<Grid item xs={4} md={12} sm={12} lg={4}>
										<TextField
											sx={{ width: '100%' }}
											label="Đơn vị công tác"
											variant="standard"
											{...register('workUnit')}
											defaultValue={user?.workUnit}
										/>
									</Grid>
									<Grid item xs={8} md={8} lg={8}>
										<TextField
											sx={{ width: '100%' }}
											label="Địa chỉ đơn vị công tác"
											variant="standard"
											{...register('addressUnit')}
											defaultValue={user?.addressUnit}
										/>
									</Grid>
									<Grid item xs={6} md={12} sm={12} lg={6}>
										<TextField
											label="Mã số cán bộ"
											variant="standard"
											{...register('idCB')}
											defaultValue={user?.idCB}
										/>
									</Grid>
									<Grid item xs={6} md={12} sm={12} lg={6}>
										<TextField
											label="Mã số sinh viên"
											variant="standard"
											{...register('idSV')}
											defaultValue={user?.idSV}
										/>
									</Grid>
									<Grid item xs={4} md={12} sm={12} lg={4}>
										<TextField
											label="Username"
											variant="standard"
											defaultValue={user?.username}
											disabled
										/>
									</Grid>
								</Grid>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 6, mb: 2 }}
								>
									Lưu thông tin
								</Button>
							</Box>
							<Box
								component="form"
								sx={{ mr: 10, ml: 10, mt: 5 }}
								onSubmit={handleSubmit(changePassword)}
							>
								<Grid container spacing={3} display="flex" height="150px">
									<Grid item xs={4} md={12} sm={12} lg={4}>
										<TextField
											label="Password hiện tại"
											variant="standard"
											type="password"
											{...register('currentPassword')}
											error={errors.currentPassword ? true : false}
											helperText={
												errors.currentPassword &&
												'Password hiện tại không chính xác'
											}
										/>
									</Grid>
									<Grid item xs={4} md={12} sm={12} lg={4}>
										<TextField
											label="Password mới"
											variant="standard"
											type="password"
											{...register('newPassword')}
										/>
									</Grid>
									<Grid item xs={4} md={12} sm={12} lg={4}>
										<Button type="submit" fullWidth variant="contained">
											Thay đổi password
										</Button>
									</Grid>
								</Grid>
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</Container>
			{children}
		</Box>
	);
}

export default AccountComponent;
