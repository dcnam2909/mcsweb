import {
	Card,
	CardContent,
	Container,
	Grid,
	Paper,
	Toolbar,
	Typography,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TablePagination,
	TableBody,
	TextField,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import enLocale from 'date-fns/locale/en-US';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { getOwnerEvent } from '../../../../api/eventApi';
import RowReport from './RowReport';
export default function ReportComponent() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [date, setDate] = useState(null);
	const [events, setEvents] = useState([]);
	const [eventsFilter, setEventsFilter] = useState([]);
	useEffect(() => {
		document.title = 'Report';
		getOwnerEvent().then((res) => setEvents(res.event));
		return () => {
			setEvents([]);
			setEventsFilter([]);
		};
	}, []);
	useEffect(() => {
		if (date === null) setEventsFilter(events);
		else
			setEventsFilter(
				events.filter(
					(event) =>
						new Date(event.dateEvent).toDateString() === new Date(date).toDateString(),
				),
			);
	}, [date, events]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
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
						Report
					</Typography>
				</CardContent>
			</Card>
			<Container maxWidth="xl" sx={{ mb: 1}}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={12} lg={12}>
						<Paper
							sx={{
								p: 2,
								pt: 3,
								pb: 0,
								display: 'flex',
								flexDirection: 'column',
								height: '100%',
							}}
						>
							<TableContainer sx={{ maxHeight: '100vh', marginTop: 5 }}>
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
													minWidth: '200px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Số lượng đăng ký tham gia</b>
											</TableCell>
											<TableCell
												align="center"
												style={{
													minWidth: '200px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Số lượng đã check-in</b>
											</TableCell>
											<TableCell
												align="center"
												style={{
													minWidth: '200px',
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
												return <RowReport event={event} key={event._id} />;
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
