import Box from "@mui/material/Box";
import StyledCell from "./TableStyledCell";
import GetStatus from "./TableBookStatus";

const StatusCell = ({ column, columns, row, newValue }: any) => {
	row.status = newValue;
	return (
		<StyledCell
			key={column.id}
			index={columns.indexOf(column)}
			length={columns.length}
			column={column}
			borderColor="divider"
			sx={{
				minWidth: column.minWidth,
				maxWidth: column.maxWidth,
			}}
		>
			<Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
				<GetStatus row={row as booksRowsInterface} status={newValue} />
			</Box>
		</StyledCell>
	);
};

export default StatusCell;
