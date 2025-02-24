import StyledCell from "./TableStyledCell";

const TextCell = ({ column, columns, newValue }: any) => {
	return (
		<StyledCell
			color="text.secondary"
			index={columns.indexOf(column)}
			length={columns.length}
			column={column}
			key={column.id}
			borderColor="divider"
			sx={{
				minWidth: column.minWidth,
				maxWidth: column.maxWidth,
			}}
		>
			{newValue}
		</StyledCell>
	);
};

export default TextCell;
