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
import RowAgent from './RowAgent';
import { getAllAgents } from '../../../../api/userApi';
import { setAgent, removeAgent } from '../../../../api/eventApi';
export default function AgentComponent({ isAgent }) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [date, setDate] = useState(null);
	const [events, setEvents] = useState([]);
	const [listAgents, setListAgents] = useState([]);
	const [eventsFilter, setEventsFilter] = useState([]);
	useEffect(() => {
		document.title = 'Agent';
		getOwnerEvent().then((res) => setEvents(res.event));
		if (!isAgent) {
			getAllAgents().then((res) => setListAgents(res.users));
		}
		return () => {
			setEvents([]);
			setListAgents([]);
			setEventsFilter([]);
		};
	}, [isAgent]);
	useEffect(() => {
		if (date === null) setEventsFilter(events);
		else {
			setEventsFilter(
				events.filter(
					(event) =>
						new Date(event.dateEvent).toDateString() === new Date(date).toDateString(),
				),
			);
			setPage(0);
		}
	}, [date, events]);

	const handleSetAgent = (idEvent, idAgent) => {
		setAgent(idEvent, idAgent).then((res) => {
			let eventsCopy = [...events];
			const index = events.findIndex((event) => event._id === idEvent);
			eventsCopy[index] = Object.assign(eventsCopy[index], res.event);
			setEvents(eventsCopy);
		});
	};
	const handleRemoveAgent = (idEvent, idAgent) => {
		removeAgent(idEvent, idAgent).then((res) => {
			let eventsCopy = [...events];
			const index = events.findIndex((event) => event._id === idEvent);
			eventsCopy[index] = Object.assign(eventsCopy[index], res.event);
			setEvents(eventsCopy);
		});
	};
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
						Agent
					</Typography>
					<Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
						Phát QR Code cho sự kiện
					</Typography>
				</CardContent>
			</Card>
			<Container maxWidth="xl" sx={{ mb: 4 }}>
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
												style={{
													minWidth: '200px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Tên sự kiện</b>
											</TableCell>
											<TableCell
												style={{
													minWidth: '200px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Địa điểm tổ chức</b>
											</TableCell>
											<TableCell
												style={{
													minWidth: '100px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Ngày tổ chức</b>
											</TableCell>
											<TableCell
												style={{
													minWidth: '200px',
													backgroundColor: '#1976d2',
													color: 'white',
												}}
											>
												<b>Đặt thời gian hết hạn</b>
											</TableCell>
											<TableCell
												style={{
													minWidth: '420px',
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
													<RowAgent
														event={event}
														users={listAgents}
														key={event._id}
														handleSetAgent={handleSetAgent}
														handleRemoveAgent={handleRemoveAgent}
														isAgent={isAgent}
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
