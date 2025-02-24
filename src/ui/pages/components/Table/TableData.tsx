import TableRow from "@mui/material/TableRow";
import { alpha, styled, Theme } from "@mui/system";
import { TableContext } from "../../context/TableContext";
import { useContext } from "react";
import renderCellValue from "../../helper/RenderCellValue";
import DataActionCell from "./DataActionCell";
import IndexCell from "./IndexCell";
import StatusCell from "./StatusCell";
import TextCell from "./TextCell";
import RoleChip from "./RoleChip";
import VerificationCell from "./VerificationCell";

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

		// animation on hover
		"@keyframes pop-up": {
			"0%": { opacity: 0 },
			"100%": { Opacity: 1 },
		},

		animation: "pop-up 0.3s ease-out",
		transition: "background-color 0.2s ease-in-out",

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

const TableData = ({
	removable,
	selectable,
	index,
	row,
	onClick,
}: TableDataProps) => {
	const {
		availableRoles,
		columnData: { columns },
	} = useContext(TableContext);

	return (
		<StyledDataRow onClick={onClick}>
			<DataActionCell removable={removable} selectable={selectable} id={row.id} />
			<IndexCell index={index + 1} />

			{columns.map((column: columnsInterface) => {

				const cellValue = row[column.id as keyof booksRowsInterface];
				let newValue = renderCellValue(cellValue);

				switch (column.id) {
					case "full_name":
						if (!row?.full_name) {
							newValue = `${row?.first_name} ${row?.last_name}`;
						}
						return <TextCell key={column.id} column={column} columns={columns} row={row} newValue={newValue} />

					case "status":
						let statusValue = newValue;
						if (row?.borrowed_date && row?.due_date) {
							const BorrowedDate = new Date(row?.borrowed_date);
							const DueDate = new Date(row?.due_date);
							statusValue = BorrowedDate > DueDate ? "overdue" : "borrowed";
						}
						return <StatusCell key={column.id} column={column} columns={columns} row={row} newValue={statusValue}/>

					case "borrow_date":
						newValue = row.borrowed_data ? renderCellValue( new Date(row.borrowed_date) ): " - ";
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
						return <RoleChip key={column.id} column={column} columns={columns} color={row.color} newValue={newValue}/>

					case "is_verified":
						const isVerified = newValue as unknown as boolean;
						return <VerificationCell key={column.id} column={column} columns={columns} isVerified={isVerified}/>
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
