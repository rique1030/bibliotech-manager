import StyledCell from "./TableStyledCell";

const TextCell = ({ column, newValue, width}: { column: any; newValue: any; width: number}) => {
	return (
		<StyledCell column={column} sx={{width: width,}}>
			{newValue}
		</StyledCell>
	);
};

export default TextCell;
