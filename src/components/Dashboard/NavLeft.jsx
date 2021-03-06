import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LeftList from './LeftList';
import { Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { useContext, useState } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../config/UserContext';
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,

		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		'& .MuiDrawer-paper': {
			position: 'relative',
			whiteSpace: 'nowrap',
			width: drawerWidth,
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
			boxSizing: 'border-box',
			...(!open && {
				overflowX: 'hidden',
				transition: theme.transitions.create('width', {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen,
				}),
				width: theme.spacing(7),
				[theme.breakpoints.up('sm')]: {
					width: theme.spacing(9),
				},
			}),
		},
	}),
);

function NavLeft() {
	const [open, setOpen] = useState(true);
	const toggleDrawer = () => {
		setOpen(!open);
	};

	const [user] = useContext(UserContext);
	const logoutHandle = () => {
		localStorage.removeItem('token');
		window.location = '/';
	};
	return (
		<>
			<AppBar position="absolute" open={open}>
				<Toolbar
					sx={{
						pr: '24px',
						minHeight: '64px',
					}}
				>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={toggleDrawer}
						sx={{
							marginRight: '36px',
							...(open && { display: 'none' }),
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						component="h1"
						variant="h6"
						color="inherit"
						noWrap
						sx={{ flexGrow: 1 }}
					>
						Xin ch??o, {user.fullName}!
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<Toolbar
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'flex-end',
						px: [1],
					}}
				>
					<IconButton onClick={toggleDrawer}>
						<ChevronLeftIcon />
					</IconButton>
				</Toolbar>
				<List sx={{ backgroundColor: 'rgb(25 118 210)' }}>
					<NavLink to="/account" style={{ textDecoration: 'none' }}>
						<ListItemButton>
							<ListItemIcon>
								<AccountBoxIcon sx={{ color: 'white' }} />
							</ListItemIcon>
							<ListItemText
								primary={'Th??ng tin ' + user.role}
								sx={{ fontWeight: 'bolder', color: 'white' }}
							/>
						</ListItemButton>
					</NavLink>
					<ListItemButton onClick={logoutHandle}>
						<ListItemIcon>
							<LogoutIcon sx={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText
							primary="????ng xu???t"
							sx={{ fontWeight: 'bolder', color: 'white' }}
						/>
					</ListItemButton>
				</List>
				<Divider />
				<List>
					<LeftList />
				</List>
			</Drawer>
		</>
	);
}

export default NavLeft;
