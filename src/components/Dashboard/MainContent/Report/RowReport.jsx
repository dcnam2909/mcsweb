import { Button, TableCell, TableRow, TextField } from '@mui/material';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { getReport } from '../../../../api/eventApi';
import ModalReport from './ModalReport';
export default function RowReport({ event, user }) {
	const [modalReport, setModalReport] = useState(false);
	const [report, setReport] = useState(null);
	const handleOpenModalReport = () => {
		setModalReport(true);
	};
	const handleCloseModalReport = () => {
		setModalReport(false);
	};

	useEffect(() => {
		getReport(event._id).then((res) => setReport(res.result));
	}, [event._id]);
	return (
		<TableRow hover role="checkbox" tabIndex={-1}>
			<TableCell align="left">{event.name}</TableCell>
			<TableCell align="left">{event.location}</TableCell>
			<TableCell align="center">{format(new Date(event.dateEvent), 'dd/MM/yyyy')}</TableCell>
			<TableCell align="center">
				{event.typeEvent !== 'public'
					? event.listVisitersCheckin.filter((el) => el.isCheckin === false).length
					: 'N/A'}
			</TableCell>
			<TableCell align="center">
				{event.listVisitersCheckin.filter((el) => el.isCheckin === true).length}
			</TableCell>
			<TableCell align="center">
				<Button
					variant="contained"
					color="warning"
					sx={{ ml: 2 }}
					size="medium"
					onClick={handleOpenModalReport}
				>
					GET REPORT
				</Button>
				{modalReport && (
					<ModalReport
						report={report}
						modalReport={modalReport}
						handleCloseModalReport={handleCloseModalReport}
					/>
				)}
			</TableCell>
		</TableRow>
	);
}
