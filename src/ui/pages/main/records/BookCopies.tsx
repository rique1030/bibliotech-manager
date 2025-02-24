// Material UI Components
import { Divider, TableBody } from "@mui/material";
import useSearch from "../../hooks/useSearch";
import { useEffect, useContext } from "react";
import SearchPanel from "../../components/SearchPanel";
import ViewTable from "../../components/Table/ViewTable";
import MainContainer from "../../components/MainContainer";
import TablePaginationBar from "../../components/Table/TablePaginationBar";
import TableHeader from "../../components/Table/TableHeader";
import columns from "../../components/Table/columns/DefaultBookCountColumnsInterface";
import { TableContext } from "../../context/TableContext";
import { TableSearchContext } from "../../context/TableSearchContext";
import TableData from "../../components/Table/TableData";

const fetchData = async (payload: GetPagedPayload): Promise<any> => {
	return await window.requestRecord.getBookCount(payload);
};

const searchFilter = [
	{ filter: "call no", value: "call_number" },
	{ filter: "title", value: "title" },
	{ filter: "author", value: "author" },
	{ filter: "publisher", value: "publisher" },
];

const URL = {
	update: null,
	delete: null,
};

function BooksCopy() {
	const {
		rowData: { setRows, rows },
		columnData: { setColumns },
	} = useContext(TableContext);

	const search = useSearch({
		fetchData,
		defaultFilter: "call_number",
		queryKey: "bookCopies",
	});
	const { rowData, isLoading } = search;

	useEffect(() => {
		setRows(rowData);
		setColumns(columns);
	}, [rowData]);

	return (
		<TableSearchContext.Provider value={{ search, searchFilter, URL }}>
			<MainContainer>
				<SearchPanel />
				<Divider variant="middle" />
				<ViewTable isLoading={isLoading}>
					<TableHeader />
					<TableBody>
						{(rows || []).map((row, index) => {
							return <TableData index={index} row={row} key={index} />;
						})}
					</TableBody>
				</ViewTable>
				<Divider variant="middle" />
				<TablePaginationBar />
			</MainContainer>
		</TableSearchContext.Provider>
	);
}

export default BooksCopy;
