import RecordsDrawer from "./RecordsDrawer";
import AccountsDrawer from "./AccountsDrawer";
import BooksDrawer from "./BooksDrawer";

import { Box, List, Typography, Divider } from "@mui/material";
import { useState } from "react";
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
					backgroundColor: "background.paper",
					display: "flex",
					flexDirection: "column",
					padding: 0,
					margin: "0.5rem 0",
					border: "1px solid",
					borderColor: "divider",
					alignContent: "center",
					boxSizing: "border-box",
					width: "100%",
					height: "100%",
				}}
			>
				<DrawerItem index={index} />
			</List>
		</Box>
	);
};

interface DrawerItemProps {
	index: number;
}

const DrawerItem = ({ index }: DrawerItemProps): JSX.Element => {
	const [expandedItems, setExpandedItems] = useState([
		"Books",
		"Categories",
		"Accounts",
		"Records",
		"Roles",
	]);
	const handleExpandedItemChange = (_event: any, itemIds: any) => {
		setExpandedItems(itemIds);
	};
	if (index === 1)
		return (
			<RecordsDrawer
				expandedItems={expandedItems}
				handleExpandedItemChange={handleExpandedItemChange}
			/>
		);
	if (index === 2)
		return (
			<AccountsDrawer
				expandedItems={expandedItems}
				handleExpandedItemChange={handleExpandedItemChange}
			/>
		);
	if (index === 3)
		return (
			<BooksDrawer
				expandedItems={expandedItems}
				handleExpandedItemChange={handleExpandedItemChange}
			/>
		);
	return <RecordsDrawer />;
};

export default DrawerManager;
