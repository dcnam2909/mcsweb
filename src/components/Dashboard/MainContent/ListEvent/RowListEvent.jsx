import { Button, TableCell, TableRow } from '@mui/material';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
export default function RowListEvent({ event, user, handleRegisterToEvent, handleRemoveToEvent }) {
	const checkReg = () => {
		let findUser = event.listVisitersCheckin.find((el) => el.visiter === user._id);
		if (findUser && findUser.isCheckin !== true) return true;
		return false;
	};
	console.log('------------');
	console.log('open', Date.now() > new Date(event.openReg).getTime());
	console.log('end', Date.now() < new Date(event.endReg).getTime());

	return (
		<TableRow hover role="checkbox" tabIndex={-1}>
			<TableCell align="left">{event.name}</TableCell>
			<TableCell align="left">{event.location}</TableCell>
			<TableCell align="center">
				{new Date(event.dateEvent).toLocaleTimeString('vi-VN').split(':')[0] +
					':' +
					new Date(event.dateEvent).toLocaleTimeString('vi-VN').split(':')[1] +
					'\n' +
					new Date(event.dateEvent).toLocaleDateString('vi-VN')}
			</TableCell>
			<TableCell align="center">
				{event.typeEvent === 'public' && 'Sự kiện công khai'}
				{event.typeEvent === 'restricted' && 'Sự kiện hạn chế'}
			</TableCell>
			<TableCell align="center">
				{event.openReg
					? new Date(event.openReg).toLocaleTimeString('vi-VN').split(':')[0] +
					  ':' +
					  new Date(event.openReg).toLocaleTimeString('vi-VN').split(':')[1] +
					  '\n' +
					  new Date(event.openReg).toLocaleDateString('vi-VN')
					: ''}
			</TableCell>
			<TableCell align="center">
				{event.endReg
					? new Date(event.endReg).toLocaleTimeString('vi-VN').split(':')[0] +
					  ':' +
					  new Date(event.endReg).toLocaleTimeString('vi-VN').split(':')[1] +
					  '\n' +
					  new Date(event.endReg).toLocaleDateString('vi-VN')
					: ''}
			</TableCell>
			<TableCell align="center">
				{event.listVisitersCheckin.filter((el) => el.isCheckin === false).length || 'N/A'}
			</TableCell>
			<TableCell align="center">
				{event.typeEvent === 'restricted' &&
				Date.now() < new Date(event.dateEvent).getTime() ? (
					<>
						{!checkReg() && (
							<Button
								variant="contained"
								color="success"
								sx={{ ml: 2 }}
								size="small"
								disabled={
									Date.now() > new Date(event.openReg).getTime() &&
									Date.now() < new Date(event.endReg).getTime()
										? false
										: true
								}
								onClick={() => handleRegisterToEvent(event)}
							>
								<EventAvailableIcon />
							</Button>
						)}
						{checkReg() && (
							<Button
								variant="contained"
								color="error"
								sx={{ ml: 2 }}
								size="small"
								onClick={() => handleRemoveToEvent(event)}
							>
								<EventBusyIcon />
							</Button>
						)}
					</>
				) : (
					'Sự kiện đã kết thúc'
				)}
			</TableCell>
		</TableRow>
	);
}
