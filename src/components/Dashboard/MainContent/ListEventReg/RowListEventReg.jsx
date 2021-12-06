import { TableCell, TableRow } from '@mui/material';

export default function RowListEventReg({ event, user }) {
	console.log(event);
	return (
		<TableRow hover role="checkbox" tabIndex={-1}>
			<TableCell align="left">{event.name}</TableCell>
			<TableCell align="left">{event.location}</TableCell>
			<TableCell align="center">
				{' '}
				{new Date(event.dateEvent).toLocaleTimeString('vi-VN').split(':')[0] +
					':' +
					new Date(event.dateEvent).toLocaleTimeString('vi-VN').split(':')[1] +
					'\n' +
					new Date(event.dateEvent).toLocaleDateString('vi-VN')}
			</TableCell>
			<TableCell align="center">
				{event.typeEvent === 'public' && 'Sự kiện công khai'}
				{event.typeEvent === 'private' && 'Sự kiện riêng '}
				{event.typeEvent === 'restricted' && 'Sự kiện hạn chế'}
			</TableCell>
			<TableCell align="center">
				{Date.now() > new Date(event.dateEvent).getTime() && 'Đã kết thúc'}
				{Date.now() < new Date(event.dateEvent).getTime() && 'Sắp diễn ra'}
				{Date.now() === new Date(event.dateEvent).getTime() && 'Đang diễn ra'}
			</TableCell>
		</TableRow>
	);
}
