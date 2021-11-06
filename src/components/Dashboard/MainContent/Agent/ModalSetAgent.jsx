import {
	Button,
	IconButton,
	InputBase,
	List,
	ListItem,
	ListItemText,
	Modal,
	Paper,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { debounce } from 'throttle-debounce';
export default function ModalSetAgent({
	event,
	users,
	isOpenSetAgent,
	handleCloseSetAgent,
	handleSetAgent,
	handleRemoveAgent,
}) {
	const [searchFillter, setSearchFillter] = useState('');
	const handleFillter = (e) => setSearchFillter(e.target.value);
	const handleFillterDebounce = debounce(500, handleFillter);

	return (
		<Modal
			open={isOpenSetAgent}
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
					height: 'calc(100vh - 300px)',
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
						Thêm Agent cho sự kiện
					</Typography>
				</Box>
				<Box
					sx={{
						p: 3,
					}}
				>
					<Paper
						component="form"
						sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
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
						{users
							.filter((user) => user.username.match(searchFillter))
							.map((user) => {
								return (
									<ListItem
										key={user._id}
										secondaryAction={
											<>
												{!event.owner.includes(user._id) && (
													<Button
														edge="end"
														aria-label="delete"
														variant="contained"
														color="success"
														sx={{
															borderRadius: '50%',
															height: '50px',
														}}
														onClick={() =>
															handleSetAgent(event._id, user._id)
														}
													>
														<CheckIcon />
													</Button>
												)}
												{event.owner.includes(user._id) && (
													<Button
														edge="end"
														aria-label="delete"
														variant="contained"
														color="error"
														sx={{
															borderRadius: '50%',
															height: '50px',
														}}
														onClick={() =>
															handleRemoveAgent(event._id, user._id)
														}
													>
														<CloseIcon />
													</Button>
												)}
											</>
										}
									>
										<ListItemText
											primary={
												<>
													<Typography>{user.username}</Typography>
													<Typography>
														<b style={{ color: '#0000FF' }}>
															Họ và tên:&nbsp;
														</b>
														{user.fullName}
													</Typography>
													<Typography>
														<b style={{ color: '#2e7d32' }}>
															Địa chỉ email:&nbsp;
														</b>
														{user.email}
													</Typography>
												</>
											}
										/>
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
							color="error"
							onClick={handleCloseSetAgent}
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
