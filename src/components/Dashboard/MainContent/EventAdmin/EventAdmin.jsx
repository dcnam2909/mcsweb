import {
	Card,
	CardContent,
	Container,
	Grid,
	Paper,
	TextField,
	Toolbar,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { getAllEventAdmin, deleteEventAdmin } from '../../../../api/eventApi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import RowEvent from './RowEvent';
import enLocale from 'date-fns/locale/en-US';
import Swal from 'sweetalert2';
function EventAdmin() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [date, setDate] = useState(null);
	const [events, setEvents] = useState([]);
	const [eventsFilter, setEventsFilter] = useState([]);

	useEffect(() => {
		document.title = 'Quản lý sự kiện';
		getAllEventAdmin().then((res) => setEvents(res.events));
		return () => {
			setEvents([]);
			setEventsFilter([]);
		};
	}, []);
	useEffect(() => {
		if (date === null) setEventsFilter(events);
		else {
			setEventsFilter(
				events.filter((event) => {
					return (
						new Date(event.dateEvent).toDateString() === new Date(date).toDateString()
					);
				}),
			);
			setPage(0);
		}
	}, [date, events]);
	console.log(eventsFilter);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const handleDeleteEventAdmin = (eventDelete) => {
		Swal.fire({
			title: 'Bạn có chắc muốn xóa sự kiện này ?',
			text: 'Hành động này không thể quay lại, bạn có chắc không?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#1976d2',
			cancelButtonColor: '#d32f2f',
			confirmButtonText: 'Đồng ý',
			cancelButtonText: 'Hủy',
		}).then((result) => {
			if (result.isConfirmed) {
				deleteEventAdmin(eventDelete._id)
					.then((res) => {
						getAllEventAdmin().then((res) => setEvents(res.events));
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: `Đã xóa sự kiện ${eventDelete.name}`,
							showConfirmButton: false,
							timer: 2000,
							target: 'body',
						});
					})
					.catch((err) => {
						Swal.fire({
							position: 'center',
							icon: 'error',
							title: `Có lỗi xảy ra khi xóa sự kiện ${eventDelete.name}! Vui lòng thử lại`,
							showConfirmButton: false,
							timer: 2000,
							target: 'body',
						});
					});
			}
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
						Quản lý sự kiện
					</Typography>
					<Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
						Tìm kiếm, thay đổi, thêm mới, xóa sự kiện
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
							<TableContainer sx={{ maxHeight: '100vh' }}>
								<Table stickyHeader aria-label="sticky table">
									<TableHead>
										<TableRow>
											<TableCell colSpan={7}>
												<LocalizationProvider
													dateAdapter={AdapterDateFns}
													locale={enLocale}
												>
													<DatePicker
														label="Chọn ngày"
														mask="__/__/____"
														value={date}
														onChange={(newValue) => {
															setDate(newValue);
														}}
														renderInput={(params) => (
															<TextField {...params} />
														)}
													/>
												</LocalizationProvider>
											</TableCell>
										</TableRow>
									</TableHead>
									<TableHead>
										<TableRow>
											<TableCell
												align="center"
												style={{
													minWidth: '200px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Tên sự kiện</b>
											</TableCell>
											<TableCell
												align="center"
												style={{
													minWidth: '200px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Địa điểm tổ chức</b>
											</TableCell>
											<TableCell
												align="center"
												style={{
													minWidth: '100px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Ngày tổ chức</b>
											</TableCell>
											<TableCell
												align="center"
												style={{
													minWidth: '150px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Loại sự kiện</b>
											</TableCell>
											<TableCell
												align="center"
												style={{
													minWidth: '100px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Mở đăng ký</b>
											</TableCell>
											<TableCell
												align="center"
												style={{
													minWidth: '100px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Kết thúc đăng ký</b>
											</TableCell>
											<TableCell
												align="center"
												style={{
													minWidth: '100px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Số lượng tham gia</b>
											</TableCell>
											<TableCell
												align="center"
												style={{
													minWidth: '200px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Người tạo sự kiện</b>
											</TableCell>
											<TableCell
												align="center"
												style={{
													minWidth: '150px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Hành động</b>
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{eventsFilter
											.sort(
												(eventA, eventB) =>
													new Date(eventB.dateEvent) -
													new Date(eventA.dateEvent),
											)
											.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage,
											)
											?.map((event) => {
												return (
													<RowEvent
														event={event}
														key={event._id}
														handleDeleteEventAdmin={
															handleDeleteEventAdmin
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
								count={eventsFilter?.length}
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

export default EventAdmin;
