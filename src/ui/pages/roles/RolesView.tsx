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
import TableHeader from "../components/Table/TableHeader";
import columns from "../components/Table/columns/DefaultRolesColumnsInterface";
import { TableContext } from "../context/TableContext";
import { TableSearchContext } from "../context/TableSearchContext";
import RolesData from "../components/Table/Roles/RolesData";

const fetchData = async (payload: GetPagedPayload): Promise<any> => {
	return await window.requestRole.getPaged(payload);
};

const searchFilter: any[] = [
	{ filter: "Name", value: "role_name" },
	{ filter: "Notes", value: "notes" },
];

const URL = {
	update: "/main/roles/update",
	delete: "/main/roles/delete",
};

function RolesView() {
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
	const search = useSearch({ fetchData, defaulFilter: "role_name" });
	const { rowData } = search;

	useEffect(() => {
		setRows(rowData);
		setColumns(columns);
	}, [rowData]);

	return (
		<TableSearchContext.Provider value={{ search, searchFilter, URL }}>
			<MainContainer>
				<SearchPanel />
				<Divider variant="middle" />
				<ViewTable>
					<TableHeader selectable />
					<RolesData selectable />
				</ViewTable>
				<Divider variant="middle" />
				<TablePaginationBar />
			</MainContainer>
		</TableSearchContext.Provider>
	);
}

export default RolesView;
