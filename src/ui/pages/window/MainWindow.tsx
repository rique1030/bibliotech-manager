import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import { Toolbar as MuiToolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import DrawerPanel from "./DrawerPanel";
import TableContextProvider from "../context/TableContextProvider";
import ConfirmBorrow from "../components/BorrowingModal";
import LogoIcon from "../components/LogoIcon";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LogoutIcon from "@mui/icons-material/Logout";
import lightTheme from "../themes/LightTheme";
import ContrastIcon from "@mui/icons-material/Contrast";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { convertProfile } from "../../utils/ImageHelper";
import { AppContext } from "../../App";
import { PermissionContextProvider } from "../context/PermissionContext";
import useRequestModal from "../hooks/useRequestModal";
import handlekebab from "../helper/HandleKebab";
import useGetBreadCrumbs from "../hooks/useGetBreadCrumbs";
import IncomingRequest from "../components/IncomingRequestBar";
import { AuthProvider, useAuth } from "../context/AuthProvider";
import { styled } from "@mui/system";
// const sound = require("../../assets/sounds/notification-18-270129.mp3");

const MainWindowContainer = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	justifyContent: "end",
	width: "100vw",
	height: "100vh",
	backgroundColor: theme.palette.background.default,
}));

const StyledAppbar = styled(AppBar)(() => ({
	backgroundColor: "primary.main",
	zIndex: 110,
	boxSizing: "border-box",
	background: "none",
	padding: "0.5rem !important",
}));

const ToolbarStyle = {
	border: "1px solid",
	borderColor: "divider",
	display: "flex",
	alignItems: "center",
	padding: "0 !important",
	minHeight: "3rem",
};

function MainWindow() {
	const requestModal = useRequestModal();
	const AppbarLogo = (
		<Box sx={{ display: "flex", alignItems: "center", width: "300px" }}>
			<LogoIcon
				sx={{ color: "primary.main", fontSize: "3rem", width: "70px" }}
			/>
			<Typography
				variant="h5"
				sx={{ fontFamily: "Inter", color: "text.primary", fontWeight: "bold" }}>
				Bibliotech
			</Typography>
		</Box>
	);

	return (
		<AuthProvider>
			<MainWindowContainer>
				<IncomingRequest requestHook={requestModal} />
				<ConfirmBorrow requestHook={requestModal} />
				<StyledAppbar position="sticky" elevation={0}>
					<MuiToolbar sx={ToolbarStyle} component={Paper} elevation={0}>
						{AppbarLogo}
						<CustomBreadCrumbs />
						<ProfileAvatar />
					</MuiToolbar>
				</StyledAppbar>
				<PermissionContextProvider>
					<TableContextProvider>
						<Box
							sx={{
								width: "100%",
								height: "100%",
								maxHeight: "100%",
								display: "flex",
							}}>
							<DrawerPanel />
							<Outlet />
						</Box>
					</TableContextProvider>
				</PermissionContextProvider>
			</MainWindowContainer>
		</AuthProvider>
	);
}

function CustomBreadCrumbs() {
	const { bread } = useGetBreadCrumbs();

	const StyledTypography = styled(Typography)(() => ({
		color: "primary.main",
		fontStyle: "italic",
		fontWeight: "bold",
		cursor: "pointer",
		userSelect: "none",
		"&:hover": {
			textDecoration: "underline",
		},
	}));

	const StyledLink = styled(Link)(() => ({
		textDecoration: "none",
		color: "primary.main",
		cursor: "pointer",
		userSelect: "none",
		fontStyle: "italic",
		fontWeight: "bold !important",
		"&:hover": { textDecoration: "underline" },
	}));

	const getLink = (i: number) => {
		const linkpath = [...bread]; // Clone the bread array
		linkpath.length = i + 1;
		linkpath.unshift("main");
		return `/${linkpath.join("/")}`;
	};

	return (
		<Breadcrumbs
			aria-label="breadcrumb"
			separator={<NavigateNextIcon fontSize="medium" />}
			sx={{ ml: 2, color: "primary.main" }}>
			{bread.map((x: string, i: number) => {
				return i === 0 || i === bread.length - 1 ? (
					<StyledTypography
						sx={{
							fontWeight: i === 0 ? "bold" : "normal",
							"&:hover": {
								textDecoration: i === 0 ? "none" : "underline",
							},
						}}
						key={`key${i}`}>
						{i == 0 ? x.toUpperCase() : handlekebab(x)}
					</StyledTypography>
				) : (
					<StyledLink key={`key${i}`} to={getLink(i)}>
						<Typography sx={{ color: "primary.main" }}>
							{handlekebab(x)}
						</Typography>
					</StyledLink>
				);
			})}
		</Breadcrumbs>
	);
}

function ProfileAvatar() {
	const { user } = useAuth();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box
			sx={{
				margin: "0rem 1rem",
				ml: "auto",
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
			}}>
			<Badge
				overlap="circular"
				sx={(theme) => ({
					"& .MuiBadge-badge": {
						backgroundColor: "#44b700",
						color: "#44b700",
						boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
					},
				})}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				variant="dot">
				<Avatar
					onClick={handleClick}
					src={
						user?.profile_pic === "default"
							? convertProfile("default")
							: convertProfile(user?.profile_pic)
					}
					sx={{
						width: "2rem",
						height: "2rem",
						border: "1px solid",
						borderColor: "background.default",
						backgroundColor: "primary.main",
						"&:hover": {
							cursor: "pointer",
							outline: "3px solid",
							outlineColor: "primary.main",
						},
					}}>
					{user?.profile_pic === "default"
						? user.first_name?.charAt(0).toUpperCase()
						: ""}
				</Avatar>
			</Badge>
			<AvatarMenu open={open} anchorEl={anchorEl} onClose={handleClose} />
		</Box>
	);
}

function AvatarMenu({
	open,
	onClose,
	anchorEl,
}: {
	open: boolean;
	onClose: any;
	anchorEl: any;
}) {
	const navigate = useNavigate();
	const { theme, toggleTheme } = useContext(AppContext);
	const { logout, user } = useAuth();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<Menu
			id="basic-menu"
			MenuListProps={{ "aria-labelledby": "basic-button" }}
			sx={{ mt: 1 }}
			open={open}
			onClose={onClose}
			anchorEl={anchorEl}>
			<MenuItem>
				<Typography sx={{ color: "text.secondary", fontWeight: "bold" }}>
					{`Welcome, ${user?.first_name || "User"}`}
				</Typography>
			</MenuItem>
			<MenuItem onClick={toggleTheme}>
				<ListItemIcon>
					<ContrastIcon sx={{ color: "text.secondary" }} />
				</ListItemIcon>
				<Typography sx={{ color: "text.secondary", fontWeight: "bold" }}>
					{theme === lightTheme ? "Dark Mode " : "Light Mode"}
				</Typography>
			</MenuItem>
			<MenuItem onClick={handleLogout}>
				<ListItemIcon>
					<LogoutIcon sx={{ color: "error.main" }} />
				</ListItemIcon>
				<Typography sx={{ color: "error.main", fontWeight: "bold" }}>
					Logout
				</Typography>
			</MenuItem>
		</Menu>
	);
}

export default MainWindow;
