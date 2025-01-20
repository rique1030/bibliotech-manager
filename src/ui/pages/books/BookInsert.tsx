import ViewTable from "../components/Table/ViewTable";
import MainContainer from "../components/MainContainer";
import { useContext, useEffect, useLayoutEffect } from "react";
import { Divider, Stack, Button, Tooltip, Typography } from "@mui/material";
import BooksData from "../components/Table/Books/BooksData";
import columns from "../components/Table/columns/DefaultBookColumnsInterface";
import TableHeader from "../components/Table/TableHeader";
import { TableContext } from "../context/TableContext";
import { useInsert } from "../hooks/useInsert";
import { TableInsertContext } from "../context/TableInsertContext";
import CallNumberDropdown from "../components/Table/Books/CallNumberDropdown";
import useGenerateAccessNumber from "../hooks/useGenerateAccessNumber";

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

	const { generateAccessNumber } = useGenerateAccessNumber();

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
	} = useinsert;

	useLayoutEffect(() => {
		setColumns(columns);
		(async () => {
			const newAccessNumber = await generateAccessNumber();
			setRows([
				{
					id: 0,
					access_number: `BTECH-${newAccessNumber}`,
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
					book_categories: [],
				},
			]);
		})();
	}, []);

	return (
		<TableInsertContext.Provider value={{ useinsert }}>
			{ConfirmationModal}
			{/* <CropperModal /> */}
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
		rowData: { rows, setRows },
	} = useContext(TableContext);

	const { generateAccessNumber } = useGenerateAccessNumber();

	const handleAddEntry = async () => {
		const newId = rows.length;
		const newAccessNumber = await generateAccessNumber();
		const newRow = {
			id: newId,
			access_number: `BTECH-${newAccessNumber}`,
			call_number: "",
			title: "",
			author: "",
			publisher: "",
			cover_image: "",
			description: "",
			date_added: null,
			date_updated: null,
			qrcode: "",
			status: "",
			book_categories: [],
		};
		setRows([...rows, newRow]);
	};
	return (
		<Stack direction="row" spacing={2}>
			<Tooltip
				placement="top"
				title={
					rows.length ? "Submit all book entries" : "Please add a book entry"
				}
			>
				<span>
					<Button
						disabled={rows.length === 0}
						onClick={handleInsert}
						variant="contained"
					>
						Submit&nbsp;Books
					</Button>
				</span>
			</Tooltip>
			<Tooltip
				placement="top"
				title="Add a new book entry with the auto-generated access number"
			>
				<span>
					<Button onClick={handleAddEntry} variant="contained">
						New&nbsp;Book
					</Button>
				</span>
			</Tooltip>
			<CallNumberDropdown />
		</Stack>
	);
}
