import ViewTable from "../components/Table/ViewTable";
import MainContainer from "../components/MainContainer";
import BooksData from "../components/Table/Books/BooksData";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Divider, Stack, Button } from "@mui/material";
import columns from "../components/Table/columns/DefaultBookColumnsInterface";
import { useDelete } from "../hooks/useDelete";
import { TableContext } from "../context/TableContext";
import { TableDeleteContext } from "../context/TableDeleteContext";
import TableHeader from "../components/Table/TableHeader";

const fetchData = async (payload: RequestByID): Promise<any> => {
	return await window.requestBook.getByID(payload);
};

const deleteData = async (payload: { id: RequestByID }): Promise<any> => {
	return await window.requestBook.delete(payload);
};

function BooksDelete() {
	const location = useLocation();
	const { state } = location;

	const {
		rowData: { setRows, rows },
		columnData: { setColumns },
	} = useContext(TableContext);

	const payload = {
		id: rows.map((row) => row.id),
	};

	const options = {
		url: "/main/books/delete",
		payload: payload,
	};

	const usedelete = useDelete({ useDelete: deleteData, options: options });
	const {
		confirmationModal: { ConfirmationModal },
		// resultAlert: { CustomAlert },
	} = usedelete;
	useEffect(() => {
		setColumns(columns);
		if (!state) {
			setRows([]);
			return;
		}
		try {
			const response = fetchData(state as RequestByID);
			response.then((data) => {
				setRows(data?.data);
			});
		} catch (error) {
			console.error(error);
		}
	}, [state]);

	return (
		<TableDeleteContext.Provider value={usedelete}>
			<MainContainer>
				{/* <CustomAlert /> */}
				{ConfirmationModal}
				<ViewTable>
					<TableHeader indented />
					<BooksData removable />
				</ViewTable>
				<Divider />
				<DeleteFooter />
			</MainContainer>
		</TableDeleteContext.Provider>
	);
}

export default BooksDelete;
function DeleteFooter() {
	const {
		rowData: { rows },
	} = useContext(TableContext);
	const { handleDelete } = useContext(TableDeleteContext);
	return (
		<Stack direction="row" spacing={2}>
			<Button
				disabled={rows.length === 0}
				variant="contained"
				onClick={handleDelete}
			>
				Delete
			</Button>
		</Stack>
	);
}
