import { Button, TableCell, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import ModalEditEvent from './ModalEditEvent';
import { useState } from 'react';
import ModalAddVisiter from './ModalAddVisiter';
export default function RowEvent({
	event,
	users,
	groupVisiter,
	handleDeleteEvent,
	handleUpdateEvent,
	handleAddVisiter,
	handleAddByGroup,
	handleAddByFile,
}) {
	const [modalEditEvent, setModalEditEvent] = useState(false);
	const [modalAddVisiter, setModalAddVisiter] = useState(false);
	const handleOpenModalEditEvent = () => setModalEditEvent(true);
	const handleCloseModalEditEvent = () => {
		setModalEditEvent(false);
	};
	const handleOpenModalAddVisiter = () => setModalAddVisiter(true);
	const handleCloseModalAddVisiter = () => {
		setModalAddVisiter(false);
	};
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
			<TableCell align="right">
				{event.typeEvent !== 'public' && (
					<>
						<Button
							variant="contained"
							size="small"
							onClick={handleOpenModalAddVisiter}
						>
							<AddIcon />
						</Button>
						{modalAddVisiter && (
							<ModalAddVisiter
								event={event}
								users={users}
								groupVisiter={groupVisiter}
								isOpenAddVisiter={modalAddVisiter}
								handleCloseAddVisiter={handleCloseModalAddVisiter}
								handleAddVisiter={handleAddVisiter}
								handleAddByGroup={handleAddByGroup}
								handleAddByFile={handleAddByFile}
							/>
						)}
					</>
				)}
				<Button
					variant="contained"
					color="success"
					sx={{ ml: 2 }}
					size="small"
					onClick={handleOpenModalEditEvent}
				>
					<EditIcon />
				</Button>
				{modalEditEvent && (
					<ModalEditEvent
						event={event}
						isOpenEdit={modalEditEvent}
						handleCloseEdit={handleCloseModalEditEvent}
						handleUpdateEvent={handleUpdateEvent}
					/>
				)}
				<Button
					variant="contained"
					color="error"
					sx={{ ml: 2 }}
					size="small"
					onClick={() => {
						handleDeleteEvent(event);
					}}
				>
					<DeleteForeverIcon />
				</Button>
			</TableCell>
		</TableRow>
	);
}
