import { Skeleton, TableRow, TableCell, Checkbox, Chip } from "@mui/material";
import GetStatus from "./TableBookStatus";
import RemoveButton from "../RemoveButton";
import StyledCell from "./TableStyledCell";
import { alpha, Box, fontStyle, fontWeight, styled, Theme } from "@mui/system";
import { TableContext } from "../../context/TableContext";
import { useContext } from "react";
import { TableSearchContext } from "../../context/TableSearchContext";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import ConverToLetterCase from "../../helper/ConvertToLetterCase";

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
		"@keyframes pop-up": {
			"0%": {
				transform: "translateY(30px)",
				opacity: 0,
			},
			"100%": {
				transform: "translateY(0)",
				Opacity: 1,
			},
		},
		animation: "slideInFromBottom 0.4s ease-out",
		"@keyframes slideInFromBottom": {
			"0%": { transform: "translateY(20px)", opacity: 0 },
			"100%": { transform: "translateY(0)", opacity: 1 },
		},

		"&:hover": {
			backgroundColor: alpha(theme.palette.primary.main, 0.1),
			"& .MuiTableCell-root > div": {
				// backgroundColor: alpha(theme.palette.primary.main, 0.1),

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
	if (!selectable && !removevable) return null;
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
				fontWeight: "bold",
			}}
		>
			{page ? page * 10 + index : 0 * 10 + index}
		</StyledCell>
	);
};
const renderCellValue = (cellValue: any): string => {
	if (cellValue instanceof Date) {
		const formattr = new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		});
		return formattr.format(cellValue);
	}
	if (cellValue === undefined || cellValue === null || cellValue === "")
		return "Enter Value";
	return cellValue;
};

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
		availableRoles,
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
				if (row?.borrowed_date) {
					row.borrowed_date = row.borrowed_date
						? new Date(row.borrowed_date)
						: null;
				}
				if (row?.due_date) {
					row.due_date = row.due_date ? new Date(row.due_date) : null;
				}
				const cellValue = row[column.id as keyof booksRowsInterface];
				let newValue = renderCellValue(cellValue);
				if (column.id === "color") {
					newValue = newValue.toUpperCase();
				}
				if (column.id === "is_verified") {
					const isVerified = newValue as unknown as boolean;
					return (
						<StyledCell
							index={columns.indexOf(column)}
							length={columns.length}
							key={column.id}
							column={column}
							borderColor="divider"
						>
							<Box
								sx={{
									width: "100%",
									display: "flex",
									justifyContent: "center",
								}}
							>
								<VerifiedIcon
									sx={(theme) => ({
										fill:
											isVerified === true
												? theme.palette.success.main
												: theme.palette.text.secondary,
									})}
								/>
							</Box>
						</StyledCell>
					);
				}
				if (column.id === "status") {
					let statusValue = newValue;
					if (row?.borrowed_date && row?.due_date) {
						const BorrowedDate = new Date(row?.borrowed_date);
						const DueDate = new Date(row?.due_date);
						if (BorrowedDate > DueDate) {
							statusValue = "overdue";
						} else {
							statusValue = "borrowed";
						}
					}
					return (
						<StatusCell
							key={column.id}
							column={column}
							columns={columns}
							row={row}
							newValue={statusValue}
						/>
					);
				}
				if (column.id === "role_id") {
					const role = availableRoles.find((role) => role.id === newValue);
					return (
						<RoleChip
							key={column.id}
							column={column}
							columns={columns}
							color={role?.color}
							newValue={role?.role_name}
						/>
					);
				}

				if (column.id === "role_name") {
					return (
						<RoleChip
							key={column.id}
							column={column}
							columns={columns}
							color={row.color}
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

const RoleChip = ({
	column,
	columns,
	newValue,
	color,
}: // row,
{
	column: columnsInterface;
	columns: any[];
	newValue: string;
	color?: string;
}) => {
	return (
		<StyledCell
			borderColor="divider"
			column={column}
			index={columns.indexOf(column)}
			key={column.id}
			length={columns.length}
		>
			<Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
				<Chip
					size="small"
					label={ConverToLetterCase(newValue)}
					icon={<AccountCircleOutlinedIcon color="inherit" />}
					sx={(theme) => ({
						"& .MuiChip-root": {
							display: "flex",
						},
						overflow: "hidden",
						whiteSpace: "nowrap",
						textOverflow: "ellipsis",
						lineHeight: "inherit",
						backgroundColor: color || "#5b40e4",
						color: theme.palette.getContrastText(color || "#5b40e4"),
						borderColor: color,
						width: "8rem",
						minWidth: 0,
						transition: "all 0.2s ease-in-out",
					})}
				/>
			</Box>
		</StyledCell>
	);
};
