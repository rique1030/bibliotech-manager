import { Stack, TableRow, TableCell } from "@mui/material";

import { useContext } from "react";
import { TableContext } from "../../context/TableContext";

export function EmptyTable() {
	const {
		columnData: { columns },
	} = useContext(TableContext);
	return (
		<TableRow>
			<TableCell
				colSpan={columns.length + 2}
				sx={{
					textAlign: "center",
					height: "70vh",
					width: "100%",
					opacity: 0.2,
				}}
			>
				<Stack gap={2} alignItems="center">
					
				</Stack>
			</TableCell>
		</TableRow>
	);
}
