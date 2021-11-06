import { Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Logo from '../../assets/images/logoSmall.png';
import { useForm } from 'react-hook-form';
import { signIn } from '../../api/authApi';
import { useEffect, useState } from 'react';

function SignIn() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [err, setErr] = useState('');

	useEffect(() => (document.title = 'Đăng nhập'), []);
	const signInSubmit = async (data) => {
		try {
			const { username, password } = data;
			setErr('');
			const token = await signIn({username: username.trim(), password});
			if (token) {
				localStorage.setItem('token', token.token);
				window.location = '/event';
			}
		} catch (error) {
			if (error) setErr('Tài khoản hoặc mật khẩu không đúng!');
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
					Đăng nhập
				</Typography>
				<Typography component="h6" color="red" my={2}>
					{err ? err : ''}
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit(signInSubmit)}
					noValidate
					sx={{ mt: 1 }}
				>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						{...register('username', { required: true })}
						error={errors.username ? true : false}
						helperText={errors.username && 'Username không được để trống'}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						{...register('password', { required: true })}
						error={errors.password ? true : false}
						helperText={errors.password && 'Password không được để trống'}
					/>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						Đăng nhập
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/signup" variant="body2">
								{'Bạn chưa có tài khoản? Đăng ký tại đây'}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}

export default SignIn;
