import React, { useState, cloneElement, useEffect } from "react";
import {
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Collapse,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { ExpandLess, ExpandMore } from "@mui/icons-material";

const ParentIconSx = {
	sx: {
		color: "primary.main",
		justifySelf: "center",
		fontSize: "1.2rem",
		width: "100%",
	},
};

interface DrawerItemProps {
	children: React.ReactNode;
	icon: React.ReactNode;
	onClick?: (index: number) => void;
	title?: string;
	isSelect?: boolean;
}

function ParentListItem({
	children,
	icon,
	title,
}: DrawerItemProps): JSX.Element {
	const [openParent, setOpenParent] = useState(false);

	useEffect(() => {
		setOpenParent(true);
	}, [children]);

	return (
		<>
			<ListItemButton
				onClick={() => setOpenParent(!openParent)}
				sx={{
					width: "100%",
					height: "3rem",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					alignContent: "center",
				}}
			>
				<ListItemIcon>
					{React.isValidElement(icon) && cloneElement(icon, ParentIconSx)}
				</ListItemIcon>
				<ListItemText
					sx={{
						color: "primary.main",
						fontWeight: "bold",
						"& > span": { fontWeight: "bold" },
					}}
					primary={title}
				/>
				{openParent ? (
					<ExpandLess sx={{ color: "text.primary" }} />
				) : (
					<ExpandMore sx={{ color: "text.primary" }} />
				)}
			</ListItemButton>
			<Collapse
				in={openParent}
				sx={{
					width: "100%",
					height: "2rem",
				}}
			>
				{children}
			</Collapse>
		</>
	);
}

interface ChildListItemProps {
	icon: React.ReactNode;
	title: string;
	src?: string;
}

function ChildListItem({ icon, title, src }: ChildListItemProps): JSX.Element {
	const location = useLocation();
	const navigate = useNavigate();
	const handleClick = () => {
		if (src) navigate(src);
	};

	const ChildIconSx = {
		sx: {
			fontSize: "1.2rem",
			color: location.pathname === src ? "primary.main" : "text.primary",
			justifySelf: "center",
			width: "100%",
			opacity: location.pathname === src ? 1 : 0.8,
		},
	};

	return (
		<ListItemButton
			onClick={handleClick}
			sx={{
				width: "100%",
				paddingLeft: "1.5rem",
			}}
		>
			<ListItemIcon color={location.pathname === src ? "primary" : "text"}>
				{React.isValidElement(icon) && cloneElement(icon, ChildIconSx)}
			</ListItemIcon>
			<ListItemText
				sx={{
					color: location.pathname === src ? "primary.main" : "text.primary",
					// opacity: location.pathname === src ? 1 : 0.8,
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
					"& > span": {
						lineHeight: "1rem",
						fontSize: "0.8rem",
						fontWeight: "bold",
					},
				}}
				primary={title}
			/>
		</ListItemButton>
	);
}

export { ParentListItem, ChildListItem };
