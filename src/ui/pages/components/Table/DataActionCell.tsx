import { useContext } from "react";
import { TableContext } from "../../context/TableContext";
import StyledCell from "./TableStyledCell";
import RemoveButton from "../RemoveButton";
import Checkbox from "@mui/material/Checkbox";

type DataActionCellProps = {
	id: number;
	selectable?: boolean;
	removable?: boolean;
};

const DataActionCell = ({ id, selectable, removable }: DataActionCellProps) => {
	if (!selectable && !removable) return null;
	const {
		selectAll: { isSelected, toggleSelectItem },
		handleRemoveEntry,
	} = useContext(TableContext);
	const handleOnClick = (Event: React.MouseEvent<HTMLElement>) => {
		Event.stopPropagation();
	};

	return (
		<StyledCell
			column={{ label: "initial" }}
			index={0}
			length={2}
			borderColor="divider"
			sx={{
				width: 10,
			}}
		>
			{removable && <RemoveButton onClick={() => handleRemoveEntry(id)} />}
			{selectable && (
				<Checkbox
					checked={isSelected(id)}
					onClick={handleOnClick}
					onChange={() => toggleSelectItem(id)}
				/>
			)}
		</StyledCell>
	);
};

export default DataActionCell;
