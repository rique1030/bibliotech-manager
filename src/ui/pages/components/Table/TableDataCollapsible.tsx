import { Collapse, TableCell, TableRow } from "@mui/material";

const TableDataCollapsible = ({
	openedRowIndex,
	index,
	children,
}: TableDataCollapsibleProps) => {
	return (
		<TableRow
			sx={{
				bgcolor: "background.paper",
				padding: 0,
			}}
		>
			<TableCell sx={{ padding: 0 }} colSpan={7}>
				<Collapse
					in={openedRowIndex !== undefined ? index === openedRowIndex : true}
					timeout="auto"
					unmountOnExit
				>
					{children}
				</Collapse>
			</TableCell>
		</TableRow>
	);
};

export default TableDataCollapsible;
