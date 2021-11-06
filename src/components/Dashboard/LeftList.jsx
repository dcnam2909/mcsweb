import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EventIcon from '@mui/icons-material/Event';
import QrCodeIcon from '@mui/icons-material/QrCode';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { NavLink, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../config/UserContext';

function LeftList() {
	const [user] = useContext(UserContext);
	const location = useLocation();
	const checkRoles = (...role) => {
		return role.includes(user.role) ? true : false;
	};
	return (
		<>
			{checkRoles('Manager') && (
				<NavLink to="/event" style={{ textDecoration: 'none', color: '#000000DE' }}>
					<ListItem button selected={location.pathname === '/event'}>
						<ListItemIcon>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText primary="Quản lý sự kiện" />
					</ListItem>
				</NavLink>
			)}

			{checkRoles('Manager', 'Agent') && (
				<NavLink to="/agent" style={{ textDecoration: 'none', color: '#000000DE' }}>
					<ListItem button selected={location.pathname === '/agent'}>
						<ListItemIcon>
							<QrCodeIcon />
						</ListItemIcon>
						<ListItemText primary="MCS Agent" />
					</ListItem>
				</NavLink>
			)}

			{checkRoles('Manager') && (
				<NavLink to="/report" style={{ textDecoration: 'none', color: '#000000DE' }}>
					<ListItem button selected={location.pathname === '/report'}>
						<ListItemIcon>
							<AnalyticsIcon />
						</ListItemIcon>
						<ListItemText primary="Báo cáo sự kiện" />
					</ListItem>
				</NavLink>
			)}

			{checkRoles('Visiter') && (
				<NavLink to="/list-event" style={{ textDecoration: 'none', color: '#000000DE' }}>
					<ListItem button selected={location.pathname === '/list-event'}>
						<ListItemIcon>
							<EventIcon />
						</ListItemIcon>
						<ListItemText primary="Danh sách sự kiện" />
					</ListItem>
				</NavLink>
			)}

			{checkRoles('Admin') && (
				<NavLink to="/admin">
					<ListItem button selected={location.pathname === '/admin'}>
						<ListItemIcon>
							<AdminPanelSettingsIcon />
						</ListItemIcon>
						<ListItemText primary="Admin" />
					</ListItem>
				</NavLink>
			)}
		</>
	);
}

export default LeftList;
