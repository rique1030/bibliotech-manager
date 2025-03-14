import {
	Box,
	Button,
	Stack,
	TablePagination,
	Tooltip,
} from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TableContext } from "../../context/TableContext";
import { TableSearchContext } from "../../context/TableSearchContext";

interface TablePaginationBarProps {
	canUpdate?: boolean;
	canDelete?: boolean;
	QR?: boolean;
	doExport?: any;
	canExport?: boolean;
	footer?: boolean;
	isExporting?: boolean;
}

function TablePaginationBar({
	canUpdate = false,
	canDelete = false,
	QR = false,
	canExport = false,
	doExport,
	footer = false,
	isExporting = false,
}: TablePaginationBarProps) {

	const {
		selectAll: { selectedItems },
		rowData: { setRows, rows },
	} = useContext(TableContext);
	const navigate = useNavigate();

	const {
		search: { currentPage, perPage, totalCount, setPage, setPerPage },
		URL,
	} = useContext(TableSearchContext);

	const handleUpdate = () => {
		setRows([]);
		navigate(URL?.update as string, { state: selectedItems });
	};

	const handleDelete = () => {
		setRows([]);
		navigate(URL?.delete as string, { state: selectedItems });
	};

	const handleQR = () => {
		setRows([]);
		navigate(URL?.qr as string, { state: selectedItems });
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<Stack direction="row" spacing={2}>
				<ManagerButton
					isVisible={URL?.update !== "" && URL?.update !== undefined}
					label="Edit&nbsp;Selected"
					canBeUsed={canUpdate}
					selectedItems={selectedItems}
					handleButtonClick={handleUpdate}
					permissionString="You don't have enough permission to edit items"
					acceptString="Edit selected items"
					actionReqString="Please select items to edit"
				/>
				<ManagerButton
					isVisible={URL?.delete !== "" && URL?.delete !== undefined}
					label="Remove&nbsp;Selected"
					canBeUsed={canDelete}
					selectedItems={selectedItems}
					handleButtonClick={handleDelete}
					permissionString="You don't have enough permission to delete items"
					acceptString="Delete selected items"
					actionReqString="Please select items to delete"
				/>
				<ManagerButton
					isVisible={QR}
					label="Generate&nbsp;QR&nbsp;Code"
					canBeUsed={true}
					selectedItems={selectedItems}
					handleButtonClick={handleQR}
					permissionString="You don't have enough permission to delete items"
					acceptString="Delete selected items"
					actionReqString="Please select items to delete"
				/>
				<ManagerButton
					disabled={isExporting}
					isVisible={canExport}
					label={isExporting ? "Please wait..." : "Export\u00a0Images"}
					canBeUsed={true}
					selectedItems={rows}
					handleButtonClick={doExport}
					permissionString="You don't have enough permission to export images"
					acceptString={
						isExporting ? "Please wait..." : "Export selected images"
					}
					actionReqString="Please select images to export"
				/>
			</Stack>
			{!footer && (
				<TablePagination
					sx={{ width: "60%" }}
					component="div"
					page={currentPage}
					rowsPerPage={perPage}
					count={totalCount}
					onPageChange={(_, newPage) => setPage(newPage)}
					onRowsPerPageChange={(event) => {
						setPerPage(parseInt(event.target.value, 10));
						setPage(0);
					}}
					rowsPerPageOptions={[10, 25, 50]}
				/>
			)}
		</Box>
	);
}

export default TablePaginationBar;

interface ManagerButtonProps {
	disabled?: boolean;
	canBeUsed: boolean;
	selectedItems: any[];
	handleButtonClick: () => void;
	permissionString: string;
	acceptString: string;
	actionReqString: string;
	label: string;
	isVisible?: boolean;
}

function ManagerButton({
	disabled = false,
	canBeUsed,
	selectedItems,
	handleButtonClick,
	permissionString,
	acceptString,
	actionReqString,
	label,
	isVisible = false,
}: ManagerButtonProps) {
	return isVisible ? (
		<Tooltip
			placement="top"
			title={
				!canBeUsed
					? permissionString
					: selectedItems.length
					? acceptString
					: actionReqString
			}
		>
			<span>
				<Button
					disabled={selectedItems.length === 0 || !canBeUsed || disabled}
					onClick={handleButtonClick}
					variant="contained"
					sx={{ height: "2rem" }}
				>
					{label}
				</Button>
			</span>
		</Tooltip>
	) : null;
}
