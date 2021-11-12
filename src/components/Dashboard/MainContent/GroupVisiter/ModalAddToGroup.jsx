import {
	Button,
	Checkbox,
	IconButton,
	InputBase,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Modal,
	Paper,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'throttle-debounce';

export default function ModalAddToGroup({
	visiters,
	group,
	modalAddToGroup,
	handleCloseAddToGroup,
	handleAddToGroup,
}) {
	const [checked, setChecked] = useState(
		group.users.reduce((prevUser, curUser) => {
			prevUser.push(curUser);
			return prevUser;
		}, []),
	);
	const [searchFillter, setSearchFillter] = useState('');
	const handleFillter = (e) => setSearchFillter(e.target.value);
	const handleFillterDebounce = debounce(500, handleFillter);
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
	return (
		<Modal
			open={modalAddToGroup}
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
						Thêm Vào Nhóm
					</Typography>
				</Box>
				<Box sx={{ width: '100%', p: 2 }}>
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
						<IconButton type="button" sx={{ p: '10px' }} aria-label="search">
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
						{visiters
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
													checked={checked.indexOf(user._id) !== -1}
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
														<Typography>{user.username}</Typography>
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
							onClick={() => {
								handleCloseAddToGroup();
								handleAddToGroup(group, checked);
							}}
						>
							Thêm
						</Button>
						<Button
							variant="contained"
							color="error"
							onClick={handleCloseAddToGroup}
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
