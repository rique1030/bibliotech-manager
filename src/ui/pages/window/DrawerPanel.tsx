import {
	Box,
	Drawer,
	IconButton,
	ListItem,
	List,
	Tooltip,
	Toolbar,
} from "@mui/material";
import { useState } from "react";

import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";

import DrawerManager from "./components/DrawerManager";

const DrawerMinSize = 70;
const DrawerMaxSize = 300;

const DrawerPanel = () => {
	const [open, setOpen] = useState(true);
	const [categoryIndex, setCategoryIndex] = useState(3);

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
				width: open ? DrawerMaxSize : DrawerMinSize,
				transition: "width 0.3s ease-in-out",
				"& .MuiDrawer-paper": {
					width: open ? DrawerMaxSize : DrawerMinSize,
					transition: "width 0.3s ease-in-out",
					zIndex: 50,
					backgroundColor: "background.default",
					border: "none",
					boxSizing: "border-box",
				},
			}}
		>
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "center",
					boxSizing: "border-box",
					padding: "0 !important",
					paddingTop: "3.5rem !important",
					height: "100%",
				}}
			>
				<Box
					sx={{
						height: "100%",
						padding: "0.5rem",
						boxSizing: "border-box",
						width: DrawerMinSize,
					}}
				>
					<List
						sx={(theme) => ({
							display: "flex",
							flexDirection: "column",
							backgroundColor: "background.paper",
							height: "100%",
							width: "100%",
							padding: 0,
							borderRadius: theme.shape.borderRadius,
							border: "1px solid",
							borderColor: "divider",
							overflow: "hidden",
						})}
					>
						<DrawerItem
							isSelect={categoryIndex === 1 && open}
							index={1}
							title="Dashboard"
							onClick={toggleDrawer}
						>
							<SpaceDashboardOutlinedIcon
								sx={{
									width: "1.75rem",
									height: "1.75rem",
									color: "primary.main",
								}}
							/>
						</DrawerItem>
						<DrawerItem
							isSelect={categoryIndex === 3 && open}
							index={3}
							title="Library"
							onClick={toggleDrawer}
						>
							<LibraryBooksOutlinedIcon
								sx={{
									width: "1.75rem",
									height: "1.75rem",
									color: "primary.main",
								}}
							/>
						</DrawerItem>

						<DrawerItem
							isSelect={categoryIndex === 2 && open}
							index={2}
							title="Accounts"
							onClick={toggleDrawer}
						>
							<AdminPanelSettingsOutlinedIcon
								sx={{
									width: "1.75rem",
									height: "1.75rem",
									color: "primary.main",
								}}
							/>
						</DrawerItem>
					</List>
				</Box>
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
			</Toolbar>
		</Drawer>
	);
};

interface DrawerItemProps {
	children?: React.ReactNode;
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
		<Tooltip title={title} placement="right" disableInteractive>
			<ListItem
				sx={{
					display: "flex",
					justifyContent: "center",
					padding: "0px",
					position: "relative",
				}}
			>
				<IconButton
					aria-label="menu"
					onClick={() => onClick(index)}
					sx={{
						padding: "0px",
						width: "100%",
						height: DrawerMinSize,
						transition: "all 0.03s ease-in-out",
						"&:hover": {
							backgroundColor: "transparent",
						},
						"&:before": {
							content: '""',
							position: "absolute",
							width: "5px",
							top: "50%",
							transform: "translateY(-50%)",
							height: isSelect ? "100%" : "0%",
							left: 0,
							backgroundColor: isSelect ? "primary.main" : "transparent",
							borderRadius: "0 0.5rem 0.5rem 0",
							transition: "all 0.1s ease-in-out",
						},
					}}
				>
					{children}
				</IconButton>
			</ListItem>
		</Tooltip>
	);
};

export default DrawerPanel;
