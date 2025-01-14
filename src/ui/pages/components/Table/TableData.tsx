import { Skeleton, TableRow, TableCell, Checkbox } from "@mui/material";
import GetStatus from "./TableBookStatus";
import RemoveButton from "../RemoveButton";
import StyledCell from "./TableStyledCell";
import { alpha, styled, Theme } from "@mui/system";
import { TableContext } from "../../context/TableContext";
import { useContext } from "react";
import { TableSearchContext } from "../../context/TableSearchContext";

interface TableDataProps {
	onClick?: (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
	index: number;
	removable?: boolean | false;
	selectable?: boolean | false;
	row: { [key: string]: any };
	children?: React.ReactNode;
}

const StyledDataRow = styled(TableRow)(({ theme }: { theme: Theme }) => ({
	"&.MuiTableRow-root": {
		userSelect: "none",
		cursor: "pointer",
		animation: "pop-up 0.3s ease-in-out",
		"@keyframes pop-up": {
			"0%": {
				transform: "scale(0.95)",
				Opacity: 0,
			},
			"50%": {
				transform: "scale(1.025)",
				Opacity: 0.5,
			},
			"100%": {
				transform: "scale(1)",
				Opacity: 1,
			},
		},
		"&:hover": {
			backgroundColor: alpha(theme.palette.primary.main, 0.1),
			"& .MuiTableCell-root > div": {
				borderColor: `${alpha(theme.palette.primary.main, 0.4)}`,
				"& .MuiTypography-root": {
					color: theme.palette.primary.main,
				},
			},
		},
		transition: "all 0.2s ease-in-out",
	},
}));

type DataActionCellProps = {
	id: number;
	selectable?: boolean;
	removevable?: boolean;
};

const DataActionCell = ({
	id,
	selectable,
	removevable,
}: DataActionCellProps) => {
	const {
		selectAll: { isSelected, toggleSelectItem },
		handleRemoveEntry,
		// handleRemoveEntry: { handleRemoveEntry },
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
			{removevable && <RemoveButton onClick={() => handleRemoveEntry(id)} />}
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

const IndexCell = ({ index }: { index: number }) => {
	const {
		search: { currentPage: page },
	} = useContext(TableSearchContext);

	return (
		<StyledCell
			color="primary.main"
			column={{ label: "index" }}
			index={0}
			length={2}
			borderColor="divider"
			sx={{
				width: "4rem",
			}}
		>
			{page ? page * 10 + index : 0 * 10 + index}
		</StyledCell>
	);
};
const renderCellValue = (cellValue: any): string => {
	if (cellValue instanceof Date) return cellValue.toDateString();
	if (cellValue === undefined || cellValue === null || cellValue === "")
		return "Enter Value";
	return cellValue;
};

const StatusCell = ({ column, columns, row, newValue }: any) => {
	return (
		<StyledCell
			key={column.id}
			index={columns.indexOf(column)}
			length={columns.length}
			column={column}
			sx={{
				minWidth: column.minWidth,
				maxWidth: column.maxWidth,
			}}
		>
			<GetStatus row={row as booksRowsInterface} status={newValue} />
		</StyledCell>
	);
};

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

const TableData = ({
	removable,
	selectable,
	index,
	row,
	onClick,
}: TableDataProps) => {
	const {
		columnData: { columns },
	} = useContext(TableContext);

	return (
		<StyledDataRow onClick={onClick}>
			<DataActionCell
				removevable={removable}
				selectable={selectable}
				id={row.id}
			/>

			<IndexCell index={index + 1} />
			{columns.map((column: columnsInterface) => {
				const cellValue = row[column.id as keyof booksRowsInterface];
				const newValue = renderCellValue(cellValue);

				if (column.id === "status") {
					return (
						<StatusCell
							key={column.id}
							column={column}
							columns={columns}
							row={row}
							newValue={newValue}
						/>
					);
				}

				return (
					<TextCell
						key={column.id}
						column={column}
						columns={columns}
						row={row}
						newValue={newValue}
					/>
				);
			})}
		</StyledDataRow>
	);
};
export default TableData;
