import { Button, TableCell, TableRow } from '@mui/material';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { getReport, getReportFile } from '../../../../api/eventApi';
import ModalReport from './ModalReport';
import { saveAs } from 'file-saver';
export default function RowReport({ event, user }) {
	const [modalReport, setModalReport] = useState(false);
	const [report, setReport] = useState(null);
	const handleOpenModalReport = () => {
		setModalReport(true);
	};
	const handleCloseModalReport = () => {
		setModalReport(false);
	};

	const handleGetReportFile = async () => {
		const file = await getReportFile(event._id);
		var blob = new Blob([file], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		});
		saveAs(blob, `report-${event.name}.xlsx`);
	};

	useEffect(() => {
		getReport(event._id).then((res) => setReport(res.result));
		return () => setReport(null);
	}, [event._id]);
	return (
		<TableRow hover role="checkbox" tabIndex={-1}>
			<TableCell align="left">{event.name}</TableCell>
			<TableCell align="left">{event.location}</TableCell>
			<TableCell align="center">{format(new Date(event.dateEvent), 'dd/MM/yyyy')}</TableCell>
			<TableCell align="center">
				<b style={{ color: 'red', fontSize: '18px' }}>
					{event.typeEvent !== 'public'
						? event.listVisitersCheckin.filter((el) => el.isCheckin === false).length
						: 'N/A'}
				</b>
			</TableCell>
			<TableCell align="center">
				<b style={{ color: 'red', fontSize: '18px' }}>
					{event.listVisitersCheckin.filter((el) => el.isCheckin === true).length}
				</b>
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
						handleGetReportFile={handleGetReportFile}
					/>
				)}
			</TableCell>
		</TableRow>
	);
}
