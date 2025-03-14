import { Paper, Theme, Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { TableContext } from "../../context/TableContext";

import RowLayout from "./ViewTableRowLayout";
import ImageLayout from "./ViewTableImageLayout";

interface ViewTableProps {
	children: React.ReactNode;
	isLoading?: boolean;
	image?: boolean;
}

const ViewTable: React.FC<ViewTableProps> = ({
	children,
	isLoading = false,
	image = false,
}) => {
	const {
		rowData: { rows },
	} = useContext(TableContext);

	return (
		<Box
			component={Paper}
			elevation={0}
			sx={(theme: Theme) => ({
				flex: 1,
				padding: 0,
				margin: 0,
				overflowX: "hidden",
				position: "relative",
				borderRadius: theme.shape.borderRadius,
				border: "1px solid",
				borderColor: "divider",
				backgroundColor: "background.paper",
			})}>
			{!image ? (
				<RowLayout children={children} rows={rows} loading={isLoading} />
			) : (
				<ImageLayout children={children} rows={rows} isLoading={isLoading} />
			)}
			{/* {!image ? <RowLayout  /> : <ImageLayout />} */}
		</Box>
	);
};

export default ViewTable;
