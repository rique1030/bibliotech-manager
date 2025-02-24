import ViewTable from "../../components/Table/ViewTable";
import MainContainer from "../../components/MainContainer";
import BooksData from "../../components/Table/Books/BooksData";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import columns from "../../components/Table/columns/DefaultBookColumnsInterface";
import { useDelete } from "../../hooks/useDelete";
import { TableContext } from "../../context/TableContext";
import { TableDeleteContext } from "../../context/TableDeleteContext";
import TableHeader from "../../components/Table/TableHeader";
import DeleteFooter from "../../components/delete/Footer";

const fetchData = async (payload: RequestByID): Promise<any> => {
	console.log(payload);
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
		isLoading,
		preData,
	} = usedelete;

	useEffect(() => {
		console.log(state);
		setColumns(columns);
	}, [state]);

	useEffect(() => {
		console.log(preData);
		setRows(preData?.data || []);
	}, [preData]);

	return (
		<TableDeleteContext.Provider value={usedelete}>
			<MainContainer>
				{ConfirmationModal}
				<ViewTable isLoading={isLoading}>
					<TableHeader indented />
					<BooksData removable />
				</ViewTable>
				<Divider />
				<Footer />
			</MainContainer>
		</TableDeleteContext.Provider>
	);
}

export default BooksDelete;

function Footer() {
	const navigate = useNavigate();
	const handleGoback = () => navigate("/main/books/manage-books");
	const {
		rowData: { rows },
	} = useContext(TableContext);
	const { handleDelete, isDeleting } = useContext(TableDeleteContext);
	return (
		<DeleteFooter
			length={rows.length}
			handleGoback={handleGoback}
			handleDelete={handleDelete}
			isDeleting={isDeleting}
			type="book"
		/>
	);
}
