import RecordsDrawer from "./RecordsDrawer";
import AccountsDrawer from "./AccountsDrawer";
import BooksDrawer from "./BooksDrawer";

import { Box, List, Typography, Divider } from "@mui/material";
interface DrawerManagerProps {
	index: number;
}

/**
 * This component renders a drawer depending on the index prop.
 * The drawer it renders is determined by the DrawerItem clicked.
 * @param {DrawerManagerProps} props The props of the component.
 * @returns {JSX.Element} The drawer to be rendered.
 */

const DrawerManager = ({ index }: DrawerManagerProps): JSX.Element => {
	return (
		<Box
			sx={{
				width: "100%",
				height: "100%",
			}}
			role="presentation"
		>
			<List
				sx={{
					display: "flex",
					flexDirection: "column",
					padding: 0,
					alignContent: "center",
					boxSizing: "border-box",
					width: "100%",
				}}
			>
				<Typography
					variant="h6"
					sx={{
						fontWeight: "bold",
						color: "text.primary",
						height: "2.5rem",
						display: "flex",
						alignItems: "center",
						justifySelf: "start",
						width: "100%",
						boxSizing: "border-box",
						paddingLeft: "1rem",
						marginTop: "1rem",
						marginBottom: "1rem",
					}}
				>
					BiblioTech
				</Typography>
				<Divider sx={{ width: "100%" }} />
				<DrawerItem index={index} />
			</List>
		</Box>
	);
};

interface DrawerItemProps {
	index: number;
}

const DrawerItem = ({ index }: DrawerItemProps): JSX.Element => {
	if (index === 1) return <RecordsDrawer />;
	if (index === 2) return <AccountsDrawer />;
	if (index === 3) return <BooksDrawer />;
	return <RecordsDrawer />;
};

export default DrawerManager;
