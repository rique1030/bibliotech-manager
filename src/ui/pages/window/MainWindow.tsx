import Alert from "@mui/material/Alert";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import styled from "@mui/material/styles/styled";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DrawerPanel from "./DrawerPanel";
import TableContextProvider from "../context/TableContextProvider";
import ConfirmBorrow from "../components/BorrowingModal";
import LogoIcon from "../components/LogoIcon";
import ConverToLetterCase from "../helper/ConvertToLetterCase";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LogoutIcon from "@mui/icons-material/Logout";
import lightTheme from "../themes/LightTheme";
import ContrastIcon from "@mui/icons-material/Contrast";
import { SnackbarCloseReason } from "@mui/material/Snackbar";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { convertProfile } from "../../utils/ImageHelper";
import { AppContext } from "../../App";
import { useQuery } from "@tanstack/react-query";
import { PermissionContextProvider } from "../context/PermissionContext";

const StyledLink = styled(Link)(() => ({}));

function useRequestModal() {
	const [incomingRequestOpen, setIncomingRequestOpen] =
		useState<boolean>(false);
	const [requestModalOpen, setRequestModalOpen] = useState<boolean>(false);
	const [data, setData] = useState<any>({});
	const [error, setError] = useState<boolean>(false);
	const [days, setDays] = useState<number>(1);

	const hideIncomingRequest = (_e: any, reason: SnackbarCloseReason) => {
		if (reason === "clickaway") return;
		setIncomingRequestOpen(false);
		if (!requestModalOpen) {
			setData({});
		}
	};

	const handleBorrowDeny = async () => {
		setRequestModalOpen(false);
		await window.webSocket.denyRequest({ request_id: data.request_id });
		setData({});
	};

	const handleBorrowAccept = async () => {
		const numDays = Number(days);
		if (isNaN(numDays) || numDays < 1) {
			setError(true);
			return;
		}
		await window.webSocket.acceptRequest({
			request_id: data.request_id,
			num_days: numDays,
		});
		setError(false);
		setRequestModalOpen(false);
	};

	const handleReviewRequest = async () => {
		await window.webSocket.reviewRequest({
			request_id: data.request_id,
		});
		setIncomingRequestOpen(false);
		setRequestModalOpen(true);
	};

	useEffect(() => {
		window.electron.on("request_borrow", (_event, data) => {
			setData(data);
			setIncomingRequestOpen(true);
		});
	}, []);

	return {
		data,
		dayState: { days, setDays },
		error,
		incomingRequestOpen,
		requestModalOpen,
		hideIncomingRequest,
		handleReviewRequest,
		handleBorrowDeny,
		handleBorrowAccept,
	};
}

function IncomingRequest({ requestHook }: { requestHook: any }) {
	const { incomingRequestOpen, hideIncomingRequest, handleReviewRequest } =
		requestHook;
	return (
		<Snackbar
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			open={incomingRequestOpen}
			onClose={hideIncomingRequest}
			autoHideDuration={5000}
		>
			<Alert
				severity="info"
				variant="filled"
				action={
					<Button color="inherit" onClick={handleReviewRequest}>
						View
					</Button>
				}
			>
				Incoming request...
			</Alert>
		</Snackbar>
	);
}

function fetchAccount(payload: RequestByID) {
	if (!payload) return null;
	return window.requestUser.getByID(payload);
}

function MainWindow() {
	const requestModal = useRequestModal();
	const location = useLocation();
	const [bread, setBread] = useState<string[]>([]);
	const [profile, setProfile] = useState<any>({});
	const [accountId, setAccountId] = useState<number[]>([]);
	
	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await window.storedSettings.getAccount();
				setAccountId([data.id]);
			} catch (error) {
				console.error(error);
			}
			// setTimeout(async () => {
			// }, 3000);
		};
		fetchData();
	}, []);

	useEffect(() => {
		const loc = location.pathname
			.split("/")
			.filter((x) => x !== "" && x !== "main");
		const newLoc = loc.map((x) => x.toUpperCase());
		setBread(newLoc);
	}, [location.pathname]);

	const { data } = useQuery({
		queryKey: ["account", accountId],
		queryFn: () => fetchAccount(accountId),
		refetchInterval: 60000,
		staleTime: 0,
		refetchIntervalInBackground: true,
		refetchOnReconnect: true,
	});

	useEffect(() => {
		if (data) setProfile(data?.data?.[0]);
	}, [data]);

	const handlekebab = (str: string) => {
		return str
			.split("-")
			.map((x) => ConverToLetterCase(x))
			.join(" ");
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "end",
				width: "100vw",
				height: "100vh",
				backgroundColor: "background.default",
			}}
		>
			<IncomingRequest requestHook={requestModal} />
			<ConfirmBorrow requestHook={requestModal} />
			<AppBar
				position="sticky"
				elevation={0}
				sx={() => ({
					backgroundColor: "primary.main",
					zIndex: 110,
					boxSizing: "border-box",
					background: "none",
					padding: "0.5rem !important",
				})}
			>
				<Toolbar
					component={Paper}
					elevation={0}
					sx={() => ({
						border: "1px solid",
						borderColor: "divider",
						display: "flex",
						alignItems: "center",
						padding: "0 !important",
						minHeight: "3rem",
					})}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							width: "300px",
						}}
					>
						<LogoIcon
							sx={{ color: "primary.main", fontSize: "3rem", width: "70px" }}
						/>
						<Typography
							variant="h5"
							sx={{
								fontFamily: "Inter",
								color: "text.primary",
								fontWeight: "bold",
							}}
						>
							Bibliotech
						</Typography>
					</Box>
					<Breadcrumbs
						aria-label="breadcrumb"
						separator={<NavigateNextIcon fontSize="medium" />}
						sx={{ ml: 2, color: "primary.main" }}
					>
						{bread.map((x: string, i: number) => {
							return i === 0 || i === bread.length - 1 ? (
								<Typography
									sx={{
										color: "primary.main",
										fontStyle: "italic",
										fontWeight: i === 0 ? "bold" : "normal",
										cursor: "pointer",
										userSelect: "none",
										"&:hover": {
											textDecoration: i === 0 ? "none" : "underline",
										},
									}}
									key={`key${i}`}
								>
									{i == 0 ? x.toUpperCase() : handlekebab(x)}
								</Typography>
							) : (
								<StyledLink
									key={`key${i}`}
									sx={{
										textDecoration: "none",
										color: "primary.main",
										cursor: "pointer",
										userSelect: "none",
										fontStyle: "italic",
										fontWeight: "bold !important",
										"&:hover": { textDecoration: "underline" },
									}}
									to={`/${(() => {
										const linkpath = [...bread]; // Clone the bread array
										linkpath.length = i + 1;
										linkpath.unshift("main");
										return linkpath.join("/");
									})()}`}
								>
									<Typography sx={{ color: "primary.main" }}>
										{handlekebab(x)}
									</Typography>
								</StyledLink>
							);
						})}
					</Breadcrumbs>
					<ProfileAvatar profile={profile} />
				</Toolbar>
			</AppBar>
			<PermissionContextProvider>
				<TableContextProvider>
					<Box
						sx={{
							width: "100%",
							height: "100%",
							maxHeight: "100%",
							display: "flex",
						}}
					>
						<DrawerPanel />
						<Outlet />
					</Box>
				</TableContextProvider>
			</PermissionContextProvider>
		</Box>
	);
}

function ProfileAvatar({ profile }: any) {
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
			}}
		>
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
				variant="dot"
			>
				<Avatar
					onClick={handleClick}
					src={
						profile?.profile_pic === "default"
							? undefined
							: convertProfile(profile?.profile_pic)
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
					}}
				>
					{profile?.profile_pic === "default"
						? profile.first_name?.charAt(0).toUpperCase()
						: ""}
				</Avatar>
			</Badge>
			<AvatarMenu open={open} anchorEl={anchorEl} onClose={handleClose} />
		</Box>
	);
}

function AvatarMenu({ open, onClose, anchorEl }: any) {
	const { theme, toggleTheme } = useContext(AppContext);
	const navigate = useNavigate();
	return (
		<Menu
			id="basic-menu"
			MenuListProps={{ "aria-labelledby": "basic-button" }}
			sx={{ mt: 1 }}
			open={open}
			onClose={onClose}
			anchorEl={anchorEl}
		>
			<MenuItem onClick={toggleTheme}>
				<ListItemIcon>
					<ContrastIcon sx={{ color: "text.secondary" }} />
				</ListItemIcon>
				<Typography sx={{ color: "text.secondary", fontWeight: "bold" }}>
					{theme === lightTheme ? "Dark Mode " : "Light Mode"}
				</Typography>
			</MenuItem>
			<MenuItem onClick={() => navigate("/login")}>
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
