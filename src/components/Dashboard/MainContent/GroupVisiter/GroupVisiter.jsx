import {
	Button,
	Card,
	CardContent,
	Container,
	Grid,
	IconButton,
	InputBase,
	Paper,
	TextField,
	Toolbar,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import {
	addToGroup,
	createGroup,
	deleteGroup,
	getGroup,
	addToGroupByFile,
} from '../../../../api/userApi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Swal from 'sweetalert2';
import { debounce } from 'throttle-debounce';
import SearchIcon from '@mui/icons-material/Search';
import RowGroup from './RowGroup';

export default function GroupVisiter({ isAdmin }) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [groups, setGroups] = useState([]);
	const [newGroup, setNewGroup] = useState('');
	const [searchFillter, setSearchFillter] = useState('');
	const [error, setError] = useState('');

	const handleFillter = (e) => {
		setSearchFillter(e.target.value);
		setPage(0);
	};
	const handleFillterDebounce = debounce(500, handleFillter);
	useEffect(() => {
		document.title = 'Quản lý nhóm người dùng';
		getGroup().then((res) => setGroups(res.groups));
		return () => {
			setGroups([]);
		};
	}, []);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const handleNewGroup = (e) => {
		if (newGroup.trim() === '') {
			e.preventDefault();
			setError('Tên nhóm không được để trống');
		} else {
			createGroup({ groupName: newGroup }).then((res) => {
				setGroups([...groups, res.group]);
			});
		}
	};

	const handleDeleteGroup = (id) => {
		Swal.fire({
			title: 'Bạn có chắc muốn xóa nhóm này ?',
			text: 'Hành động này không thể quay lại, bạn có chắc không?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#1976d2',
			cancelButtonColor: '#d32f2f',
			confirmButtonText: 'Đồng ý',
			cancelButtonText: 'Hủy',
		}).then((result) => {
			if (result.isConfirmed) {
				deleteGroup(id).then(() => {
					const newGroups = groups.filter((group) => group._id !== id);
					setGroups(newGroups);
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: `Delete Group success`,
						showConfirmButton: false,
						timer: 2000,
						target: 'body',
					});
				});
			}
		});
	};

	const handleAddToGroup = (group, listVisiter) => {
		addToGroup(group._id, { listVisiter }).then((res) => {
			getGroup().then((res) => setGroups(res.groups));
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: `Thêm thành công visiter vào nhóm ${res.group.groupName}`,
				showConfirmButton: false,
				timer: 2000,
				target: 'body',
			});
		});
	};

	const handleAddToGroupByFile = (group, file) => {
		const formData = new FormData();
		formData.append('file', file);
		addToGroupByFile(group._id, formData)
			.then((res) => {
				getGroup().then((res) => setGroups(res.groups));
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: `Thêm thành công người dùng vào nhóm ${group.groupName}`,
					showConfirmButton: false,
					timer: 2000,
					target: 'body',
				});
			})
			.catch((err) => {
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: `Có lỗi xảy ra khi thêm người dùng vào nhóm ${group.groupName}! Vui lòng thử lại`,
					showConfirmButton: false,
					timer: 2000,
					target: 'body',
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
							<Box sx={{ mt: 5, display: 'flex', alignItems: 'center' }}>
								<TextField
									label="Nhập tên nhóm mới"
									onChange={(e) => setNewGroup(e.target.value)}
									error={error}
									helperText={error ? error : ''}
								/>
								<Button
									variant="contained"
									color="primary"
									sx={{ ml: '10px', height: '56px' }}
									onClick={(e) => handleNewGroup(e)}
								>
									Thêm nhóm mới
								</Button>
							</Box>
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
									placeholder="Tìm kiếm nhóm"
									inputProps={{ 'aria-label': 'Tìm kiếm nhóm' }}
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
													minWidth: '30%',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Tên nhóm</b>
											</TableCell>
											<TableCell
												align="center"
												style={{
													minWidth: '30%',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Số lượng thành viên</b>
											</TableCell>
											<TableCell
												align="center"
												style={{
													minWidth: '40%',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Hành động</b>
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{groups
											.filter((group) =>
												group.groupName
													.toLowerCase()
													.match(searchFillter.toLowerCase()),
											)
											.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage,
											)
											?.map((group) => {
												return (
													<RowGroup
														group={group}
														key={group._id}
														handleDeleteGroup={handleDeleteGroup}
														handleAddToGroup={handleAddToGroup}
														handleAddToGroupByFile={
															handleAddToGroupByFile
														}
													/>
												);
											})}
									</TableBody>
								</Table>
							</TableContainer>
							<TablePagination
								rowsPerPageOptions={[10, 25, 100]}
								component="div"
								count={groups?.length}
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
