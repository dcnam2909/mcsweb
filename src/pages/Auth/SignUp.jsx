import { Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Logo from '../../assets/images/logoSmall.png';
import { useForm } from 'react-hook-form';
import { signUp } from '../../api/authApi';
import { useState, useEffect } from 'react';
function SignUp() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm();
	const [err, setErr] = useState('');
	useEffect(() => (document.title = 'Đăng ký'), []);

	const submitSignUp = async (data) => {
		try {
			const { confirmPassword, ...signUpData } = data;
			if (confirmPassword !== signUpData.password) setError('confirmPassword');
			else {
				const token = await signUp(signUpData);
				if (token) {
					localStorage.setItem('token', token.token);
					window.location = '/event';
				}
			}
		} catch (error) {
			if (error.status === 400 && error.data.message.startsWith('Duplicate fields')) {
				let errStr = error.data.message
					.split(',')[0]
					.replace('Duplicate fields: ', 'Đã có người sử dụng ');
				errStr += ' này!';
				setErr(errStr);
			}
		}
	};
	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<img
					src={Logo}
					alt={'Logo'}
					style={{
						height: '100px',
						width: '100px',
						borderRadius: '50%',
						marginBottom: '30px',
					}}
				/>
				<Typography component="h1" variant="h5">
					Đăng ký
				</Typography>
				<Typography component="h6" color="red" my={2}>
					{err ? err : ''}
				</Typography>
				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit(submitSignUp)}
					sx={{ mt: 3 }}
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								{...register('username', {
									required: true,
									minLength: 4,
									maxLength: 20,
								})}
								error={errors.username ? true : false}
								helperText={
									errors.username &&
									'Username không được để trống và có ít nhất 4 ký tự'
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								{...register('password', {
									required: true,
									minLength: 8,
									maxLength: 32,
								})}
								error={errors.password ? true : false}
								helperText={
									errors.password &&
									'Password không được để trống và có ít nhất 8 ký tự'
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="confirmPassword"
								label="Nhập lại password"
								type="password"
								id="confirmPassword"
								{...register('confirmPassword', {
									required: true,
									minLength: 8,
									maxLength: 32,
								})}
								error={errors.confirmPassword ? true : false}
								helperText={
									errors.confirmPassword &&
									'Password không chính xác vui lòng nhập lại'
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								type="email"
								required
								fullWidth
								id="email"
								label="Địa chỉ email"
								name="email"
								{...register('email', { required: true })}
								error={errors.email ? true : false}
								helperText={errors.email && 'Email không được để trống'}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="fullName"
								label="Họ và tên"
								name="fullName"
								{...register('fullName', { required: true })}
								error={errors.fullName ? true : false}
								helperText={errors.fullName && 'Họ và tên không được để trống'}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								id="phone"
								label="Số điện thoại"
								name="phone"
								{...register('phone')}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								id="address"
								label="Địa Chỉ"
								name="address"
								{...register('address')}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								id="workUnit"
								label="Đơn vị công tác"
								name="workUnit"
								{...register('workUnit')}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								id="addressUnit"
								label="Địa chỉ đơn vị công tác"
								name="addressUnit"
								{...register('addressUnit')}
							/>
						</Grid>
						<Grid item xs={5}>
							<TextField
								fullWidth
								id="idCB"
								name="idCB"
								label="Mã số cán bộ"
								{...register('idCB')}
							/>
						</Grid>
						<Grid
							item
							xs={2}
							textAlign="center"
							justifyContent="center"
							flexDirection="column"
						>
							<Typography variant="body2">Hoặc</Typography>
						</Grid>
						<Grid item xs={5}>
							<TextField
								fullWidth
								id="idSV"
								name="idSV"
								label="Mã số sinh viên"
								{...register('idSV')}
							/>
						</Grid>
					</Grid>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						Đăng ký
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/" variant="body2">
								Bạn đã có tài khoản? Đăng nhập tại đây.
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
export default SignUp;
