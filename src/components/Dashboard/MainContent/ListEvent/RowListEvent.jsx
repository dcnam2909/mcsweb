import { Button, TableCell, TableRow } from '@mui/material';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { format } from 'date-fns';
export default function RowListEvent({ event, user, handleRegisterToEvent, handleRemoveToEvent }) {
	const checkReg = () => {
		let findUser = event.listVisitersCheckin.find((el) => el.visiter === user._id);
		if (findUser && findUser.isCheckin !== true) return true;
		return false;
	};
	return (
		<TableRow hover role="checkbox" tabIndex={-1}>
			<TableCell align="left">{event.name}</TableCell>
			<TableCell align="left">{event.location}</TableCell>
			<TableCell align="center">{format(new Date(event.dateEvent), 'dd/MM/yyyy')}</TableCell>
			<TableCell align="center">
				{event.typeEvent === 'public' && 'Sự kiện công khai'}
				{event.typeEvent === 'restricted' && 'Sự kiện hạn chế'}
			</TableCell>
			<TableCell align="center">
				{event.openReg ? format(new Date(event.openReg), 'dd/MM/yyyy') : ''}
			</TableCell>
			<TableCell align="center">
				{event.endReg ? format(new Date(event.endReg), 'dd/MM/yyyy') : ''}
			</TableCell>
			<TableCell align="center">
				{event.listVisitersCheckin.filter((el) => el.isCheckin === false).length || 'N/A'}
			</TableCell>
			<TableCell align="center">
				{event.typeEvent === 'restricted' && (
					<>
						{!checkReg() && (
							<Button
								variant="contained"
								color="success"
								sx={{ ml: 2 }}
								size="small"
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
				)}
			</TableCell>
		</TableRow>
	);
}
