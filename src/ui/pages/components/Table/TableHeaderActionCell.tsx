import { styled, Checkbox } from "@mui/material";
import { useContext } from "react";
import { TableContext } from "../../context/TableContext";
import StyledCell from "./TableStyledCell";

type ActionCellProps = {
	selectable?: boolean | false;
	indented?: boolean | false;
};

function ActionCell({ selectable, indented }: ActionCellProps) {
	const {
		selectAll: { toggleSelectAll, isAllSelected, isIntermediate },
	} = useContext(TableContext);
	
	const HeaderCheckbox = styled(Checkbox)(() => ({
		color: "white",
		"&.Mui-checked": { color: "white" },
		"&.MuiCheckbox-indeterminate": { color: "white" },
	}));

	if (selectable || indented) {
		return (
			<StyledCell
				column={{ label: "" }}
				sx={{
					width: 60,
					"tr &": {
						flexShrink: "1 !important",
					 },
				}}
			>
				{selectable && (
					<HeaderCheckbox
						checked={isAllSelected}
						indeterminate={isIntermediate}
						onChange={() => toggleSelectAll()}
					/>
				)}
			</StyledCell>
		);
	}
	return null;
}

export default ActionCell;