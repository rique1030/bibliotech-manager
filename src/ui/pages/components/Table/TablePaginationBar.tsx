import {
	Box,
	Button,
	Grow,
	Stack,
	TablePagination,
	Tooltip,
} from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TableContext } from "../../context/TableContext";
import { TableSearchContext } from "../../context/TableSearchContext";

function TablePaginationBar() {
	/**
	 * Handles the update and delete buttons
	 */

	const {
		selectAll: { selectedItems },
		rowData: { setRows },
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
				{URL?.update && (
					<Tooltip
						placement="top"
						title={
							selectedItems.length
								? "Edit selected items"
								: "Please select items to edit"
						}
					>
						<span>
							<Button
								disabled={selectedItems.length === 0}
								onClick={handleUpdate}
								variant="contained"
								sx={{ height: "2rem" }}
							>
								Edit&nbsp;Selected
							</Button>
						</span>
					</Tooltip>
				)}
				{URL?.delete && (
					<Tooltip
						placement="top"
						title={
							selectedItems.length
								? "Remove selected items"
								: "Please select items to remove"
						}
					>
						<span>
							<Button
								disabled={selectedItems.length === 0}
								onClick={handleDelete}
								variant="contained"
								sx={{ height: "2rem" }}
							>
								Remove&nbsp;Selected
							</Button>
						</span>
					</Tooltip>
				)}
			</Stack>
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
		</Box>
	);
}

export default TablePaginationBar;
