import { TableRow, Checkbox, Box, TableHead, styled } from "@mui/material";
import StyledCell from "./TableStyledCell";
import { useContext } from "react";
import { TableContext } from "../../context/TableContext";

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
				index={0}
				column={{ label: "" }}
				length={2}
				sx={{
					maxWidth: "1rem",
					minWidth: "1rem",
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

const TableHeader = ({
	selectable,
	indented,
}: {
	selectable?: boolean | false;
	indented?: boolean | false;
}) => {
	const {
		columnData: { columns },
	} = useContext(TableContext);

	return (
		<TableHead>
			<TableRow>
				<ActionCell selectable={selectable} indented={indented} />
				<StyledCell
					color="white"
					column={{ label: "No." }}
					length={columns.length}
					index={0}
					sx={{
						maxWidth: "1rem",
						minWidth: "1rem",
					}}
				>
					No.
				</StyledCell>
				{columns.map((column, index) => (
					<StyledCell
						color="white"
						key={column.id}
						column={column}
						length={columns.length}
						index={index}
						sx={{
							minWidth: column.minWidth,
							maxWidth: column.maxWidth,
						}}
					>
						{column.label}
					</StyledCell>
				))}
			</TableRow>
		</TableHead>
	);
};

export default TableHeader;
