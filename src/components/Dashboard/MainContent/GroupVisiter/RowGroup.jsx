import { Button, TableCell, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAllVisisters } from '../../../../api/userApi';
import ModalAddToGroup from './ModalAddToGroup';
export default function RowGroup({ group, handleDeleteGroup, handleAddToGroup }) {
	const [modalAddToGroup, setModalAddToGroup] = useState(false);
	const [visiters, setVisiters] = useState([]);

	useEffect(() => {
		getAllVisisters().then((res) => setVisiters(res.users));
		return () => {
			setVisiters([]);
		};
	}, []);

	const handleOpenModalAddToGroup = () => setModalAddToGroup(true);
	const handleCloseModalAddToGroup = () => {
		setModalAddToGroup(false);
	};

	return (
		<TableRow hover tabIndex={-1}>
			<TableCell align="center">{group.groupName}</TableCell>
			<TableCell align="center">{group.users.length}</TableCell>
			<TableCell align="center">
				<Button
					variant="contained"
					color="primary"
					sx={{ ml: 2 }}
					size="medium"
					onClick={handleOpenModalAddToGroup}
				>
					Thêm thành viên
				</Button>
				{modalAddToGroup && (
					<ModalAddToGroup
						modalAddToGroup={modalAddToGroup}
						handleCloseAddToGroup={handleCloseModalAddToGroup}
						handleAddToGroup={handleAddToGroup}
						group={group}
						visiters={visiters}
					/>
				)}
				<Button
					variant="contained"
					color="error"
					sx={{ ml: 2 }}
					size="medium"
					onClick={() => handleDeleteGroup(group._id)}
				>
					Xóa nhóm
				</Button>
			</TableCell>
		</TableRow>
	);
}
