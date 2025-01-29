// Material UI Components
import { Divider } from "@mui/material";
// Hooks
import useSearch from "../hooks/useSearch";
import { useEffect, useContext } from "react";
// Components
import SearchPanel from "../components/SearchPanel";
import ViewTable from "../components/Table/ViewTable";
import MainContainer from "../components/MainContainer";
import TablePaginationBar from "../components/Table/TablePaginationBar";
import BooksData from "../components/Table/Books/BooksData";
import TableHeader from "../components/Table/TableHeader";
import columns from "../components/Table/columns/DefaultBookColumnsInterface";
import { TableContext } from "../context/TableContext";
import { TableSearchContext } from "../context/TableSearchContext";

const fetchData = async (payload: GetPagedPayload): Promise<any> => {
	return await window.requestBook.getPaged(payload);
};

const searchFilter = [
	{ filter: "acc no", value: "access_number" },
	{ filter: "call no", value: "call_number" },
	{ filter: "title", value: "title" },
	{ filter: "author", value: "author" },
	{ filter: "status", value: "status" },
];

const URL = {
	update: "/main/books/manage-books/edit-existing-books",
	delete: "/main/books/manage-books/remove-books",
};

function BooksView() {
	/**
	 * Table
	 */
	const {
		rowData: { setRows },
		columnData: { setColumns },
	} = useContext(TableContext);
	/**
	 * Search
	 */
	const search = useSearch({
		fetchData,
		defaultFilter: "access_number",
		queryKey: "booksView",
	});
	const { rowData, isLoading } = search;

	useEffect(() => {
		setColumns(columns);
	}, []);

	useEffect(() => {
		setRows(rowData);
	}, [rowData]);

	return (
		<TableSearchContext.Provider value={{ search, searchFilter, URL }}>
			<MainContainer>
				<SearchPanel />
				<Divider variant="middle" />
				<ViewTable isLoading={isLoading}>
					<TableHeader selectable />
					<BooksData selectable />
				</ViewTable>
				<Divider variant="middle" />
				<TablePaginationBar />
			</MainContainer>
		</TableSearchContext.Provider>
	);
}

export default BooksView;
