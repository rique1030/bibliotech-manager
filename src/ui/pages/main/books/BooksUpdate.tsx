import ViewTable from "../../components/Table/ViewTable";
import MainContainer from "../../components/MainContainer";
import BooksData from "../../components/Table/Books/BooksData";
import { useContext, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import columns from "../../components/Table/columns/catalog/insert";
import { TableContext } from "../../context/TableContext";
import TableHeader from "../../components/Table/TableHeader";
import { TableUpdateContext } from "../../context/TableUpdateContext";
import { useUpdate } from "../../hooks/useUpdate";
import UpdateFooter from "../../components/update/Footer";
import { getRoute, routes } from "../../Router";

const fetchData = async (payload: RequestByID): Promise<any> => {
	return await window.requestBook.getByID(payload);
};

const updateData = async (payload: BookUpdatePayload): Promise<any> => {
	return await window.requestBook.update(payload);
};

const field = [
	"id",
	"call_number",
	"title",
	"author",
	"publisher",
];

function BooksUpdate() {
	const location = useLocation();
	const { state } = location;
	
	const {
		rowData: { rows, setRows },
		columnData: { setColumns },
	} = useContext(TableContext);

	const payload = {
		entries: rows,
		entryIds: state,
	};

	const options = {
		url: getRoute(routes.BOOKS.UPDATE), //books/manage-books/edit-existing-books",
		field,
		payload: payload,
		queryKey: "booksUpdate",
	};

	const useupdate = useUpdate({ updateData, getData: fetchData, options });
	const {
		confirmationModal: { ConfirmationModal },
		isLoading,
		preData,
	} = useupdate;

	useLayoutEffect(() => {
		setColumns(columns);
	}, [state]);

	useLayoutEffect(() => {
		setRows(preData?.data || []);
	}, [preData]);

	return (
		<TableUpdateContext.Provider value={{ useupdate }}>
			<MainContainer>
				{ConfirmationModal}
				<ViewTable isLoading={isLoading}>
					<TableHeader />
					<BooksData edit />
				</ViewTable>
				<Divider />
				<Footer />
			</MainContainer>
		</TableUpdateContext.Provider>
	);
}

function Footer() {
	const navigate = useNavigate();
	const handleGoback = () => navigate(getRoute(routes.BOOKS.VIEW));
	const { useupdate: { handleUpdate, isUpdating } } = useContext(TableUpdateContext);
	const { rowData: { rows } } = useContext(TableContext);
	return (
		<UpdateFooter
			isUpdating={isUpdating}
			length={rows.length}
			handleGoback={handleGoback}
			handleUpdate={handleUpdate}
			type="book"
			books
		/>
	);
}

export default BooksUpdate;
