import TableRow from "@mui/material/TableRow";
import { alpha, styled, Theme } from "@mui/system";
import { TableContext } from "../../context/TableContext";
import { memo, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import renderCellValue from "../../helper/RenderCellValue";
import DataActionCell from "./DataActionCell";
import IndexCell from "./IndexCell";
import StatusCell from "./StatusCell";
import TextCell from "./TextCell";
import RoleChip from "./RoleChip";
import VerificationCell from "./VerificationCell";
import AddBookCell from "./AddBookCell";
import { debounce } from "@mui/material";
import { PermissionContext } from "../../context/PermissionContext";


interface TableDataProps {
	onClick?: (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
	index: number;
	removable?: boolean | false;
	selectable?: boolean | false;
	add?: boolean | false;
	row: { [key: string]: any };
	children?: React.ReactNode;
}

const StyledDataRow = styled(TableRow)(({ theme }: { theme: Theme }) => ({
	"&.MuiTableRow-root": {
		userSelect: "none",
		cursor: "pointer",
		"@keyframes pop-up": {
			"0%": { opacity: 0 },
			"100%": { Opacity: 1 },
		},

		animation: "pop-up 0.3s ease-out",
		transition: "all 0.2s ease-in-out",

		"&:hover": {
			backgroundColor: alpha(theme.palette.primary.main, 0.1),

			"& .MuiTableCell-root > div": {
				"& .MuiTypography-root": {
					color: theme.palette.primary.main,
				},
			},
		},
	},
}));

const minCellWidth = 60;

const TableData = ({index, row, onClick}: TableDataProps) => {
	const {
		availableRoles,
		columnData: { columns },
	} = useContext(TableContext);
	const { books } = useContext(PermissionContext)
	const tableRow = useRef<HTMLTableRowElement>(null);
	const [rowWidth, setRowWidth] = useState(0);
	const [boxCount, setBoxCount] = useState(0);
	const getAvailableWidth = (width: number) => {
		return (rowWidth - (boxCount * minCellWidth)) * (width / 100);
	};
	
	const updateWidth = useCallback(
		debounce(() => {
			if (tableRow.current)  {
				const newWidth = tableRow.current.offsetWidth;
				setRowWidth(prevWidth => prevWidth === newWidth ? prevWidth : newWidth);
			}
		}, 100),
		[]
	);

	useLayoutEffect(() => {
		if (!tableRow.current) return;
		const resizeObserver = new ResizeObserver(() => {
			requestAnimationFrame(updateWidth);
		});
		resizeObserver.observe(tableRow.current);
		return () => resizeObserver.disconnect();
	}, [])

	useLayoutEffect(() => {
		const boxCol = columns.filter(col => col?.box === true);
		setBoxCount(boxCol.length);
	},[columns])

	return (
		<StyledDataRow ref={tableRow} onClick={onClick}>
			{columns.map((column: columnsInterface) => {
				const cellValue = row[column.id as keyof booksRowsInterface];
				let newValue = renderCellValue(cellValue);
				switch (column.id) {
					case "full_name":
						if (!row?.full_name) {
							newValue = `${row?.first_name} ${row?.last_name}`;
						}
						return <TextCell key={column.id} column={column} newValue={newValue} width={getAvailableWidth(column.widthPercent as number)}/>
					case "index":
						return <IndexCell key={column.id} index={index + 1} />
					case "remove":
						return <DataActionCell key={column.id} removable id={row.id} />
					case "select":
						return <DataActionCell key={column.id} selectable id={row.id} />
					case "add_book":
						if (!books.insert) return null;
						return <AddBookCell key={column.id} length={columns.length} row={row} />
					case "status":
						let statusValue = newValue;
						if (row?.borrowed_date && row?.due_date) {
							const BorrowedDate = new Date(row?.borrowed_date);
							const DueDate = new Date(row?.due_date);
							statusValue = BorrowedDate > DueDate ? "overdue" : "borrowed";
						}
						return <StatusCell key={column.id} column={column} row={row} newValue={statusValue} sx={{ width: getAvailableWidth(column.widthPercent as number)}}/>
					case "borrowed_date":
						newValue = row.borrowed_date ? renderCellValue( new Date(row.borrowed_date) ): " - ";
						break;
					case "due_date":
						newValue = row.due_date ? renderCellValue(new Date(row.due_date)) : " - ";
						break;
					case "color":
						newValue = newValue.toUpperCase();
						break;	
					case "role_name":
						if (row?.role_id) {
							const role = availableRoles.find((role) => role.id === row?.role_id);
							row.role_name = role?.role_name;
							row.color = role?.color;
						}
						return <RoleChip width={getAvailableWidth(column.widthPercent as number)} key={column.id} column={column} color={row.color} newValue={newValue}/>
					case "is_verified":
						const isVerified = newValue as unknown as boolean;
						return <VerificationCell key={column.id} column={column} width={getAvailableWidth(column.widthPercent as number)} isVerified={isVerified}/>
				}
				return (
					<TextCell
						width={getAvailableWidth(column.widthPercent as number)}
						key={column.id}
						column={column}
						newValue={newValue}
					/>
				);
			})}
		</StyledDataRow>
	);
};



export default memo(TableData);
