import ViewTable from "../../components/Table/ViewTable";
import MainContainer from "../../components/MainContainer";
import { useContext, useLayoutEffect } from "react";
import { Divider } from "@mui/material";
import BooksData from "../../components/Table/Books/BooksData";
import columns from "../../components/Table/columns/catalog/insert";
import TableHeader from "../../components/Table/TableHeader";
import { TableContext } from "../../context/TableContext";
import { useInsert } from "../../hooks/useInsert";
import { TableInsertContext } from "../../context/TableInsertContext";
import InsertFooter from "../../components/insert/Footer";
import { getRoute, routes } from "../../Router";

const insertData = async (payload: InsertBooksPayload): Promise<any> => {
	return await window.requestBook.insertMultiple(payload);
};

const field = ["call_number", "title", "author", "publisher"];

function BooksInsert() {
	const {
		rowData: { rows, setRows },
		columnData: { setColumns },
		refetch,
	} = useContext(TableContext);

	// const { generateAccessNumber } = useGenerateAccessNumber();

	const payload = {
		entries: rows,
	};

	const options = {
		url: getRoute(routes.BOOKS.VIEW), //books/manage-books",
		field,
		payload: payload,
	};

	const useinsert = useInsert({ insertData, options });
	const {
		confirmationModal: { ConfirmationModal },
	} = useinsert;

	useLayoutEffect(() => {
		setColumns(columns);
		refetch(); // refresh categories
		(async () => {
			// const newAccessNumber = await generateAccessNumber();
			setRows([
				{
					id: 0,
					call_number: "",
					title: "",
					author: "",
					publisher: "",
					cover_image: "",
					description: "",
					book_categories: [],
				},
			]);
		})();
	}, []);

	return (
		<TableInsertContext.Provider value={{ useinsert }}>
			{ConfirmationModal}
			<MainContainer>
				<ViewTable>
					<TableHeader indented />
					<BooksData removable edit />
				</ViewTable>
				<Divider />
				<Footer />
			</MainContainer>
		</TableInsertContext.Provider>
	);
}

export default BooksInsert;
function Footer() {
	const {
		useinsert: { handleInsert, isInserting },
	} = useContext(TableInsertContext);
	const {
		rowData: { rows, setRows },
	} = useContext(TableContext);
	const handleAddEntry = async () => {
		const newId = rows.length;
		const newRow = {
			id: newId,
			call_number: "",
			title: "",
			author: "",
			publisher: "",
			cover_image: "",
			description: "",
			date_added: null,
			date_updated: null,
			book_categories: [],
		};
		setRows([...rows, newRow]);
	};
	return (
		<InsertFooter
			length={rows.length}
			handleAddEntry={handleAddEntry}
			handleInsert={handleInsert}
			isInserting={isInserting}
			type="Book"
			books
		/>
	);
}
