import ViewTable from "../components/Table/ViewTable";
import MainContainer from "../components/MainContainer";
import BooksData from "../components/Table/Books/BooksData";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider, Stack, Button, Tooltip } from "@mui/material";
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
		entryIds: state,
	};

	const options = {
		url: "/main/books/manage-books/remove-books",
		payload: payload,
		queryKey: "booksDelete",
	};

	const usedelete = useDelete({
		useDelete: deleteData,
		options: options,
		getData: fetchData,
	});
	const {
		confirmationModal: { ConfirmationModal },
		preData,
	} = usedelete;

	useEffect(() => {
		setColumns(columns);
	}, [state]);

	useEffect(() => {
		console.log(preData);
		setRows(preData?.data || []);
	}, [preData]);

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
	const navigate = useNavigate();
	const handleGoback = () => navigate("/main/books/manage-books");
	const {
		rowData: { rows },
	} = useContext(TableContext);
	const { handleDelete } = useContext(TableDeleteContext);
	return (
		<Stack direction="row" justifyContent="flex-end" spacing={2}>
			<Button
				onClick={() => handleGoback()}
				variant="contained"
				sx={{ height: "2rem" }}
			>
				Back
			</Button>
			<Tooltip
				placement="top"
				title={
					rows.length
						? "Remove selected books"
						: "Please select books to remove"
				}
			>
				<span>
					<Button
						disabled={rows.length === 0}
						onClick={() => handleDelete("book")}
						variant="contained"
						sx={{ height: "2rem" }}
					>
						Remove
					</Button>
				</span>
			</Tooltip>
		</Stack>
	);
}
