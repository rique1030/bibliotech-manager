import { Divider } from "@mui/material";
import useSearch from "../../hooks/useSearch";
import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import SearchPanel from "../../components/SearchPanel";
import ViewTable from "../../components/Table/ViewTable";
import MainContainer from "../../components/MainContainer";
import TablePaginationBar from "../../components/Table/TablePaginationBar";
import BooksData from "../../components/Table/Books/BooksData";
import TableHeader from "../../components/Table/TableHeader";
import columns from "../../components/Table/columns/catalog/view";
import { TableContext } from "../../context/TableContext";
import { TableSearchContext } from "../../context/TableSearchContext";
import { PermissionContext } from "../../context/PermissionContext";
import { getRoute, routes } from "../../Router";

const fetchData = async (payload: GetPagedPayload): Promise<any> => {
	return await window.requestBook.getPaged(payload);
};

const searchFilter = [
	{ filter: "title", value: "title" },
	{ filter: "author", value: "author" },
	{ filter: "publisher", value: "publisher" },
	{ filter: "call no", value: "call_number" },
];

const URL = {
	update: getRoute(routes.BOOKS.UPDATE),
	delete: getRoute(routes.BOOKS.DELETE),
};

function BooksView() {
	const { books } = useContext(PermissionContext);
	const {
		rowData: { setRows },
		columnData: { setColumns },
	} = useContext(TableContext);
	const search = useSearch({
		fetchData,
		defaultFilter: "title",
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
					<TableHeader />
					<BooksData selectable add />
				</ViewTable>
				<Divider variant="middle" />
				<TablePaginationBar canDelete={books.delete} canUpdate={books.update} />
			</MainContainer>
		</TableSearchContext.Provider>
	);
}

export default BooksView;
