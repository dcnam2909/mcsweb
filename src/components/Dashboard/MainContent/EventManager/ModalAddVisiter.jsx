import {
	Button,
	Checkbox,
	Fab,
	IconButton,
	InputBase,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Modal,
	Paper,
	Radio,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'throttle-debounce';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AddIcon from '@mui/icons-material/Add';
import { addByFile } from '../../../../api/eventApi';
export default function ModalAddVisiter({
	event,
	users,
	groupVisiter,
	isOpenAddVisiter,
	handleCloseAddVisiter,
	handleAddVisiter,
	handleAddByGroup,
}) {
	const [checked, setChecked] = useState(
		event.listVisitersCheckin.reduce((prevUser, curUser) => {
			prevUser.push(curUser.visiter._id);
			return prevUser;
		}, []),
	);
	const [checkedGroup, setCheckedGroup] = useState();
	const [tabChange, setTabChange] = useState('1');
	const [searchFillter, setSearchFillter] = useState('');
	const [searchFillterGroup, setSearchFillterGroup] = useState('');
	const [file, setFile] = useState();
	const handleFillter = (e) => setSearchFillter(e.target.value);
	const handleFillterDebounce = debounce(500, handleFillter);
	const handleFillterGroup = (e) => setSearchFillterGroup(e.target.value);
	const handleFillterGroupDebounce = debounce(500, handleFillterGroup);
	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};
	const handleGroupToggle = (value) => () => {
		setCheckedGroup(value);
	};

	const handleTabChange = (event, newValue) => {
		setTabChange(newValue);
	};
	const handleChangeFile = (e) => {
		const file = e.target.files[0];
		setFile(file);
	};

	const handleAddByFile = (event, file) => {
		const formData = new FormData();
		formData.append('file', file);
		addByFile(event._id, formData);
	};
	return (
		<Modal
			open={isOpenAddVisiter}
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
					height: 'calc(100vh - 250px)',
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
						Thêm Người Tham Dự
					</Typography>
				</Box>
				<Box sx={{ width: '100%' }}>
					<TabContext value={tabChange} sx={{ width: '100%' }}>
						<Box>
							<TabList onChange={handleTabChange} centered>
								<Tab label="Thêm bằng username" value="1" sx={{ width: '50%' }} />
								<Tab label="Thêm bằng danh sách" value="2" sx={{ width: '50%' }} />
							</TabList>
						</Box>
						<TabPanel value="1">
							<Box>
								<Paper
									component="form"
									sx={{
										p: '2px 4px',
										display: 'flex',
										alignItems: 'center',
										width: '100%',
									}}
								>
									<InputBase
										sx={{ ml: 1, flex: 1 }}
										placeholder="Tìm kiếm người dùng"
										inputProps={{ 'aria-label': 'Tìm kiếm người dùng' }}
										onChange={handleFillterDebounce}
									/>
									<IconButton
										type="button"
										sx={{ p: '10px' }}
										aria-label="search"
									>
										<SearchIcon />
									</IconButton>
								</Paper>
								<List
									sx={{
										width: '100%',
										height: 'calc(100vh - 550px)',
										overflow: 'scroll',
										marginTop: 2,
									}}
								>
									{users
										.filter((user) => user.username.match(searchFillter))
										.map((user) => {
											const labelId = `checkbox-list-label-${user._id}`;
											return (
												<ListItem key={user._id} disablePadding>
													<ListItemButton
														role={undefined}
														onClick={handleToggle(user._id)}
														dense
													>
														<ListItemIcon>
															<Checkbox
																edge="start"
																checked={
																	checked.indexOf(user._id) !== -1
																}
																tabIndex={-1}
																disableRipple
																inputProps={{
																	'aria-labelledby': labelId,
																}}
															/>
														</ListItemIcon>
														<ListItemText
															id={labelId}
															primary={
																<>
																	<Typography>
																		{user.username}
																	</Typography>
																	<Typography>
																		<b
																			style={{
																				color: '#0000FF',
																			}}
																		>
																			Họ và tên:&nbsp;
																		</b>
																		{user.fullName}
																	</Typography>
																	<Typography>
																		<b
																			style={{
																				color: '#2e7d32',
																			}}
																		>
																			Địa chỉ email:&nbsp;
																		</b>
																		{user.email}
																	</Typography>
																</>
															}
														/>
													</ListItemButton>
												</ListItem>
											);
										})}
								</List>
								<Box
									sx={{
										p: 3,
										display: 'flex',
										justifyContent: 'flex-end',
									}}
								>
									<Button
										variant="contained"
										color="success"
										type="button"
										onClick={(e) => {
											if (checked.length > 0) {
												handleCloseAddVisiter();
												handleAddVisiter(event, checked);
											} else e.preventDefault();
										}}
									>
										Thêm
									</Button>
									<Button
										variant="contained"
										color="error"
										onClick={handleCloseAddVisiter}
										sx={{ ml: 3 }}
									>
										Hủy
									</Button>
								</Box>
							</Box>
						</TabPanel>
						<TabPanel value="2">
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<Paper
									component="form"
									sx={{
										p: '2px 4px',
										display: 'flex',
										alignItems: 'center',
										width: '50%',
										mb: 1,
									}}
								>
									<InputBase
										sx={{ ml: 1, flex: 1 }}
										placeholder="Tìm kiếm nhóm người dùng"
										inputProps={{
											'aria-label': 'Tìm kiếm nhóm người dùng',
										}}
										onChange={handleFillterGroupDebounce}
									/>
									<IconButton
										type="button"
										sx={{ p: '10px' }}
										aria-label="search"
									>
										<SearchIcon />
									</IconButton>
								</Paper>
								<Box sx={{ boxShadow: 2, mb: 1, ml: 2 }}>
									<label htmlFor="upload-photo">
										<input
											hidden
											id="upload-photo"
											name="upload-photo"
											type="file"
											accept=".xlsx"
											onChange={handleChangeFile}
										/>
										<Fab
											color="secondary"
											size="small"
											component="span"
											aria-label="add"
											variant="extended"
										>
											<AddIcon /> Upload File
										</Fab>
										<Typography variant="caption" sx={{ ml: 1 }}>
											{file?.name}
										</Typography>
									</label>
								</Box>
							</Box>
							<Box>
								<Box>
									<List
										sx={{
											width: '100%',
											height: 'calc(100vh - 600px)',
											overflow: 'scroll',
										}}
									>
										{groupVisiter
											.filter((group) =>
												group.groupName
													.trim()
													.toLowerCase()
													.match(searchFillterGroup.trim().toLowerCase()),
											)
											.map((group) => {
												const labelId = `checkbox-list-label-${group._id}`;
												return (
													<ListItem key={group._id} disablePadding>
														<ListItemButton
															role={undefined}
															onClick={handleGroupToggle(group._id)}
															dense
														>
															<ListItemIcon>
																<Radio
																	edge="start"
																	checked={
																		checkedGroup === group._id
																			? true
																			: false
																	}
																	tabIndex={-1}
																	disableRipple
																	inputProps={{
																		'aria-labelledby': labelId,
																	}}
																/>
															</ListItemIcon>
															<ListItemText
																id={labelId}
																primary={
																	<>
																		<Typography>
																			<b
																				style={{
																					color: '#0000FF',
																				}}
																			>
																				Tên nhóm:&nbsp;
																			</b>
																			{group.groupName}
																		</Typography>
																		<Typography>
																			<b
																				style={{
																					color: '#2e7d32',
																				}}
																			>
																				Số lượng thành
																				viên:&nbsp;
																			</b>
																			{group.users.length}
																		</Typography>
																	</>
																}
															/>
														</ListItemButton>
													</ListItem>
												);
											})}
									</List>
									<Box
										sx={{
											p: 3,
											display: 'flex',
											justifyContent: 'flex-end',
										}}
									>
										<Button
											variant="contained"
											color="success"
											type="button"
											onClick={() => {
												// handleCloseAddVisiter();
												if (!file) handleAddByGroup(event, checkedGroup);
												else handleAddByFile(event, file);
											}}
										>
											Thêm
										</Button>
										<Button
											variant="contained"
											color="error"
											onClick={handleCloseAddVisiter}
											sx={{ ml: 3 }}
										>
											Hủy
										</Button>
									</Box>
								</Box>
							</Box>
						</TabPanel>
					</TabContext>
				</Box>
			</Box>
		</Modal>
	);
}
