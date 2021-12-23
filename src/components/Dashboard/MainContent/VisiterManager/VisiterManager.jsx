import {
	Card,
	CardContent,
	Container,
	Grid,
	IconButton,
	InputBase,
	Paper,
	Toolbar,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../../../api/userApi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import RowVisiter from './RowVisiter';
import Swal from 'sweetalert2';
import { debounce } from 'throttle-debounce';
import SearchIcon from '@mui/icons-material/Search';
import { setAgent, setManager, setVisiter } from '../../../../api/userApi';
export default function VisiterManager({ isAdmin }) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [listUsers, setListUsers] = useState([]);
	const [searchFillter, setSearchFillter] = useState('');
	const handleFillter = (e) => {
		setSearchFillter(e.target.value);
		setPage(0);
	};
	const handleFillterDebounce = debounce(500, handleFillter);
	useEffect(() => {
		document.title = 'Quản lý người dùng';
		getAllUsers().then((res) => setListUsers(res.users));
		return () => {
			setListUsers([]);
		};
	}, []);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	const handleSetAgent = (idUser) => {
		setAgent(idUser).then(() => {
			getAllUsers()
				.then((res) => {
					setListUsers(res.users);
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: `Cấp quyền thành công cho tài khoản`,
						showConfirmButton: false,
						timer: 2000,
						target: 'body',
					});
				})
				.catch((err) => {
					Swal.fire({
						position: 'center',
						icon: 'error',
						title: `Có lỗi xảy ra khi cấp quyền cho tài khoản`,
						showConfirmButton: false,
						timer: 2000,
						target: 'body',
					});
				});
		});
	};
	const handleSetManager = (idUser) => {
		setManager(idUser).then(() => {
			getAllUsers()
				.then((res) => {
					setListUsers(res.users);
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: `Set manager success`,
						showConfirmButton: false,
						timer: 2000,
						target: 'body',
					});
				})
				.catch((err) => {
					Swal.fire({
						position: 'center',
						icon: 'error',
						title: `Có lỗi xảy ra khi cấp quyền cho tài khoản`,
						showConfirmButton: false,
						timer: 2000,
						target: 'body',
					});
				});
		});
	};
	const handleSetVisiter = (idUser) => {
		setVisiter(idUser).then(() => {
			getAllUsers()
				.then((res) => {
					setListUsers(res.users);
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: `Set visiter success`,
						showConfirmButton: false,
						timer: 2000,
						target: 'body',
					});
				})
				.catch((err) => {
					Swal.fire({
						position: 'center',
						icon: 'error',
						title: `Có lỗi xảy ra khi cấp quyền cho tài khoản`,
						showConfirmButton: false,
						timer: 2000,
						target: 'body',
					});
				});
		});
	};

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
			<Card
				sx={{
					minWidth: 100,
					position: 'relative',
					top: '15px',
					ml: 4,
					mr: 4,
					boxShadow: 3,
					backgroundColor: '#1976d2',
				}}
			>
				<CardContent>
					<Typography variant="h5" component="div" sx={{ color: 'white' }}>
						Quản lý người dùng
					</Typography>
					<Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
						Tìm kiếm, cấp quyền, xóa tài khoản người dùng
					</Typography>
				</CardContent>
			</Card>
			<Container maxWidth="xxl" sx={{ mb: 4 }}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={12} lg={12}>
						<Paper
							sx={{
								p: 4,
								pt: 3,
								pb: 0,
								display: 'flex',
								flexDirection: 'column',
								height: '100%',
							}}
						>
							<Paper
								sx={{
									mt: '30px',
									mb: '30px',
									p: '2px 4px',
									display: 'flex',
									alignItems: 'center',
									width: '50%',
								}}
							>
								<InputBase
									sx={{ ml: 1, flex: 1 }}
									placeholder="Tìm kiếm người dùng"
									inputProps={{ 'aria-label': 'Tìm kiếm người dùng' }}
									onChange={handleFillterDebounce}
								/>
								<IconButton type="button" sx={{ p: '10px' }} aria-label="search">
									<SearchIcon />
								</IconButton>
							</Paper>
							<TableContainer sx={{ maxHeight: '100vh' }}>
								<Table stickyHeader aria-label="sticky table">
									<TableHead>
										<TableRow>
											<TableCell
												align="center"
												style={{
													minWidth: '50px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Username</b>
											</TableCell>
											<TableCell
												align="center"
												style={{
													minWidth: '150px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Họ và tên</b>
											</TableCell>
											<TableCell
												align="center"
												style={{
													minWidth: '150px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Email</b>
											</TableCell>
											<TableCell
												align="center"
												style={{
													minWidth: '130px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Số điện thoại</b>
											</TableCell>
											<TableCell
												align="center"
												style={{
													minWidth: '200px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Địa chỉ</b>
											</TableCell>
											<TableCell
												align="center"
												style={{
													minWidth: '200px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Đơn vị công tác</b>
											</TableCell>
											<TableCell
												align="center"
												style={{
													minWidth: '200px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Địa chỉ đơn vị công tác </b>
											</TableCell>
											<TableCell
												align="center"
												style={{
													minWidth: '110px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Mã cán bộ</b>
											</TableCell>
											<TableCell
												align="center"
												style={{
													minWidth: '120px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Mã sinh viên</b>
											</TableCell>
											<TableCell
												align="center"
												style={{
													minWidth: '120px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>ROLE</b>
											</TableCell>
											<TableCell
												align="center"
												style={{
													minWidth: '400px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Hành động</b>
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{listUsers
											.filter((user) => user.username.match(searchFillter))
											.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage,
											)
											?.map((user) => {
												return (
													<RowVisiter
														user={user}
														key={user._id}
														isAdmin={isAdmin}
														handleSetAgent={handleSetAgent}
														handleSetManager={handleSetManager}
														handleSetVisiter={handleSetVisiter}
													/>
												);
											})}
									</TableBody>
								</Table>
							</TableContainer>
							<TablePagination
								rowsPerPageOptions={[10, 25, 100]}
								component="div"
								count={listUsers?.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
							/>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}
