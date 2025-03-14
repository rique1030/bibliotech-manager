import { Divider } from "@mui/material";
import useSearch from "../../hooks/useSearch";
import { useContext, useLayoutEffect } from "react";
import SearchPanel from "../../components/SearchPanel";
import ViewTable from "../../components/Table/ViewTable";
import MainContainer from "../../components/MainContainer";
import TablePaginationBar from "../../components/Table/TablePaginationBar";
import TableHeader from "../../components/Table/TableHeader";
import columns from "../../components/Table/columns/copy/view";
import { TableContext } from "../../context/TableContext";
import { TableSearchContext } from "../../context/TableSearchContext";
import { PermissionContext } from "../../context/PermissionContext";
import { getRoute, routes } from "../../Router";
import CopyData from "../../components/Table/Copy/CopyData";

const fetchData = async (payload: GetPagedPayload): Promise<any> => {
	return await window.requestCopy.getPaged(payload);
};

const searchFilter = [
	{ filter: "title", value: "title" },
	{ filter: "author", value: "author" },
	{ filter: "acc no", value: "access_number" },
	{ filter: "status", value: "status" },
];

const URL = {
	update: getRoute(routes.COPIES.UPDATE),
	delete: getRoute(routes.COPIES.DELETE),
	qr: getRoute(routes.COPIES.QR || ""),
};

function CopyView() {
	const { books } = useContext(PermissionContext);
	const {
		rowData: { setRows },
		columnData: { setColumns },
	} = useContext(TableContext);
	const search = useSearch({
		fetchData,
		defaultFilter: "title",
		queryKey: "copyView",
	});
	const { rowData, isLoading } = search;

	useLayoutEffect(() => {
		setColumns(columns);
		setRows(rowData);
	}, [rowData]);

	return (
		<TableSearchContext.Provider value={{ search, searchFilter, URL }}>
			<MainContainer>
				<SearchPanel />
				<Divider variant="middle" />
				<ViewTable isLoading={isLoading}>
					<TableHeader />
					<CopyData />
				</ViewTable>
				<Divider variant="middle" />
				<TablePaginationBar
					canDelete={books.delete}
					canUpdate={books.update}
					QR
				/>
			</MainContainer>
		</TableSearchContext.Provider>
	);
}

export default CopyView;
