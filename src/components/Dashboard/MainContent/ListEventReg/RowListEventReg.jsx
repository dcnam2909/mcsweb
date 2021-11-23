import { TableCell, TableRow } from '@mui/material';

import { format } from 'date-fns';
export default function RowListEventReg({ event }) {
	return (
		<TableRow hover role="checkbox" tabIndex={-1}>
			<TableCell align="left">{event.name}</TableCell>
			<TableCell align="left">{event.location}</TableCell>
			<TableCell align="center">{format(new Date(event.dateEvent), 'dd/MM/yyyy')}</TableCell>
			<TableCell align="center">
				{event.typeEvent === 'private' && 'Sự kiện công khai'}
				{event.typeEvent === 'restricted' && 'Sự kiện hạn chế'}
			</TableCell>
			<TableCell align="center">
				{event.openReg ? format(new Date(event.openReg), 'dd/MM/yyyy') : ''}
			</TableCell>
			<TableCell align="center">
				{event.endReg ? format(new Date(event.endReg), 'dd/MM/yyyy') : ''}
			</TableCell>
		</TableRow>
	);
}
