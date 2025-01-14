import ViewTable from "../components/Table/ViewTable";
import MainContainer from "../components/MainContainer";
import { useContext, useLayoutEffect } from "react";
import { Divider, Stack, Button } from "@mui/material";
import BooksData from "../components/Table/Books/BooksData";
import columns from "../components/Table/columns/DefaultBookColumnsInterface";
import TableHeader from "../components/Table/TableHeader";
import { TableContext } from "../context/TableContext";
import { useInsert } from "../hooks/useInsert";
import { TableInsertContext } from "../context/TableInsertContext";
import CallNumberDropdown from "../components/Table/Books/CallNumberDropdown";

const insertData = async (payload: InsertBooksPayload): Promise<any> => {
	return await window.requestBook.insertMultiple(payload);
};

const field = [
	"access_number",
	"call_number",
	"title",
	"author",
	"publisher",
	"status",
];

function BooksInsert() {
	const {
		rowData: { rows, setRows },
		columnData: { setColumns },
	} = useContext(TableContext);

	const payload = {
		entries: rows,
	};

	const options = {
		url: "/main/books/view",
		field,
		payload: payload,
	};

	const useinsert = useInsert({ insertData, options });
	const {
		confirmationModal: { ConfirmationModal },
		// resultAlert: { CustomAlert },
	} = useinsert;

	useLayoutEffect(() => {
		setColumns(columns);
		setRows(() => [
			{
				id: 0,
				access_number: "",
				call_number: "",
				title: "",
				author: "",
				publisher: "",
				cover_image: "",
				description: "",
				date_added: undefined,
				date_updated: undefined,
				qrcode: "",
				status: "",
			},
		]);
	}, []);

	return (
		<TableInsertContext.Provider value={{ useinsert }}>
			{/* <CustomAlert /> */}
			{ConfirmationModal}
			<MainContainer>
				<ViewTable>
					<TableHeader indented />
					<BooksData removable isEditable />
				</ViewTable>
				<Divider />
				<InsertFooter />
			</MainContainer>
		</TableInsertContext.Provider>
	);
}

export default BooksInsert;
function InsertFooter() {
	const {
		useinsert: { handleInsert },
	} = useContext(TableInsertContext);
	const {
		handleAddEntry,
		rowData: { rows },
	} = useContext(TableContext);

	return (
		<Stack direction="row" spacing={2}>
			<Button
				disabled={rows.length === 0}
				onClick={handleInsert}
				variant="contained"
			>
				Add all
			</Button>
			<Button onClick={handleAddEntry} variant="contained">
				New Form
			</Button>
			<CallNumberDropdown />
		</Stack>
	);
}
