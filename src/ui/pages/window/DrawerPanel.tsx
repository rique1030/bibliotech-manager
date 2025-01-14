import {
	Box,
	Drawer,
	Divider,
	IconButton,
	ListItem,
	List,
	Tooltip,
	Theme,
} from "@mui/material";
import { useState } from "react";

import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import LogoIcon from "../components/LogoIcon";

import DrawerManager from "./components/DrawerManager";

const DrawerMinSize = 60;
const DrawerMaxSize = 300;

const DrawerPanel = () => {
	const [open, setOpen] = useState(false);
	const [categoryIndex, setCategoryIndex] = useState(0);

	const toggleDrawer = (index: number) => {
		if (index !== categoryIndex && index !== 0) {
			setCategoryIndex(index);
			setOpen(true);
			return;
		}
		setOpen(!open);
	};

	return (
		<Drawer
			anchor="left"
			open={open}
			variant="permanent"
			sx={{
				width: open ? DrawerMaxSize : 60,
				transition: "width 0.3s ease-in-out",
				"& .MuiDrawer-paper": {
					width: open ? DrawerMaxSize : 60,
					transition: "width 0.3s ease-in-out",
				},
				zIndex: 100,
			}}
		>
			<Box
				sx={{
					width: open ? DrawerMaxSize : 60,
					height: "100%",
					transition: "width 0.3s ease-in-out",
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					backgroundColor: "background.default",
				}}
				role="presentation"
			>
				<List
					sx={(theme: Theme) => ({
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						alignContent: "center",
						paddingTop: "1rem",
						paddingBottom: "1rem",
						boxSizing: "border-box",
						width: "60px",
						height: "100%",
						gap: "1rem",
						background: `radial-gradient(at top right, ${theme.palette.secondary.main}, ${theme.palette.primary.dark})`,
					})}
				>
					<DrawerItem onClick={toggleDrawer} index={0}>
						<LogoIcon
							sx={{
								color: "white",
								fontSize: "2.5rem",
							}}
						/>
					</DrawerItem>
					<Divider
						variant="middle"
						orientation="horizontal"
						component="li"
						sx={{ width: "70%", borderColor: "white" }}
					/>
					<DrawerItem
						onClick={toggleDrawer}
						index={1}
						title="Dashboard"
						isSelect={categoryIndex === 1 && open}
					>
						<SpaceDashboardOutlinedIcon
							sx={{ color: "white", fontSize: "1.6rem", fontWeight: "normal" }}
						/>
					</DrawerItem>
					<DrawerItem
						onClick={toggleDrawer}
						index={2}
						title="Accounts Manager"
						isSelect={categoryIndex === 2 && open}
					>
						<AdminPanelSettingsOutlinedIcon
							sx={{ color: "white", fontSize: "1.6rem", fontWeight: "normal" }}
						/>
					</DrawerItem>
					<DrawerItem
						onClick={toggleDrawer}
						index={3}
						title="Library Manager"
						isSelect={categoryIndex === 3 && open}
					>
						<LibraryBooksOutlinedIcon
							sx={{ color: "white", fontSize: "1.6rem", fontWeight: "normal" }}
						/>
					</DrawerItem>
				</List>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						width: open ? `${DrawerMaxSize - DrawerMinSize}px` : "0px",
						height: "100%",
						transition: "width 0.3s ease-in-out",
						boxSizing: "border-box",
						overflow: "hidden",
					}}
				>
					<DrawerManager index={categoryIndex} />
				</Box>
			</Box>
		</Drawer>
	);
};

interface DrawerItemProps {
	children: React.ReactNode;
	onClick: (index: number) => void;
	index: number;
	title?: string;
	isSelect?: boolean;
}

const DrawerItem = ({
	children,
	onClick,
	index,
	title,
	isSelect,
}: DrawerItemProps) => {
	return (
		<Tooltip title={title} placement="right" arrow disableInteractive>
			<ListItem
				sx={{
					display: "flex",
					justifyContent: "center",
					padding: "0px",
					"&:hover": {
						WebkitFilter: "drop-shadow(0em 0em 1em rgb(255, 0, 191))",
					},
					WebkitFilter: isSelect
						? "drop-shadow(0em 0em 0.5em rgb(255, 130, 234))"
						: "",
				}}
			>
				<IconButton
					aria-label="menu"
					onClick={() => onClick(index)}
					sx={{
						padding: "0px",
						width: "40px",
						height: "40px",
						"&:hover": {
							background: "rgba(255,255,255,0.1)",
						},
						transition: "all 0.03s ease-in-out",
					}}
				>
					{children}
				</IconButton>
			</ListItem>
		</Tooltip>
	);
};

export default DrawerPanel;
