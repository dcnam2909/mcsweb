import { Button, TableCell, TableRow } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
export default function RowEvent({ event, handleDeleteEventAdmin }) {
	return (
		<TableRow hover role="checkbox" tabIndex={-1}>
			<TableCell align="left">{event.name}</TableCell>
			<TableCell align="left">{event.location}</TableCell>
			<TableCell align="center">
				{new Date(event.dateEvent).getDate() +
					'/' +
					(new Date(event.dateEvent).getMonth() + 1) +
					'/' +
					new Date(event.dateEvent).getFullYear()}
			</TableCell>
			<TableCell align="center">
				{event.typeEvent === 'public' && 'Sự kiện công khai'}
				{event.typeEvent === 'private' && 'Sự kiện riêng'}
				{event.typeEvent === 'restricted' && 'Sự kiện hạn chế'}
			</TableCell>
			<TableCell align="center">
				{event.openReg
					? new Date(event.openReg).getDate() +
					  '/' +
					  (new Date(event.openReg).getMonth() + 1) +
					  '/' +
					  new Date(event.openReg).getFullYear()
					: ''}
			</TableCell>
			<TableCell align="center">
				{event.endReg
					? new Date(event.endReg).getDate() +
					  '/' +
					  (new Date(event.endReg).getMonth() + 1) +
					  '/' +
					  new Date(event.endReg).getFullYear()
					: ''}
			</TableCell>
			<TableCell align="center">
				{event.typeEvent !== 'public'
					? event.listVisitersCheckin.filter((el) => el.isCheckin === false).length
					: 'N/A'}
			</TableCell>
			<TableCell align="center">
				{event.owner.find((el) => el.role === 'Manager').username}
			</TableCell>
			<TableCell align="center">
				<Button
					variant="contained"
					color="error"
					sx={{ ml: 2 }}
					size="small"
					onClick={() => {
						handleDeleteEventAdmin(event);
					}}
				>
					<DeleteForeverIcon />
				</Button>
			</TableCell>
		</TableRow>
	);
}
