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
		navigate(URL?.update, { state: selectedItems });
	};

	const handleDelete = () => {
		setRows([]);
		navigate(URL?.delete, { state: selectedItems });
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
				<Tooltip
					title={selectedItems.length === 0 ? "No items selected" : "a"}
					disableInteractive
					slots={{ transition: Grow }}
					placement="top"
				>
					<span>
						<Button
							onClick={handleUpdate}
							sx={{ height: "2rem" }}
							variant="contained"
							disabled={selectedItems.length === 0}
						>
							Edit&nbsp;Selected
						</Button>
					</span>
				</Tooltip>
				<Tooltip
					title={selectedItems.length === 0 ? "No items selected" : "a"}
					disableInteractive
					slots={{ transition: Grow }}
					placement="top"
				>
					<span>
						<Button
							onClick={handleDelete}
							sx={{ height: "2rem" }}
							variant="contained"
							disabled={selectedItems.length === 0}
						>
							Remove&nbsp;Selected
						</Button>
					</span>
				</Tooltip>
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
