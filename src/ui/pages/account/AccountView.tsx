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
import columns from "../components/Table/columns/DefaultAccountsColumnsInterface";
import { TableContext } from "../context/TableContext";
import { TableSearchContext } from "../context/TableSearchContext";
import AccountsData from "../components/Table/Accounts/AccountsData";

const fetchData = async (payload: GetPagedPayload): Promise<any> => {
	return await window.requestUser.getPaged(payload);
};

const searchFilter: any[] = [
	{ filter: "Name", value: "first_name" },
	{ filter: "Surname", value: "last_name" },
	{ filter: "ID no.", value: "school_id" },
	{ filter: "Email", value: "email" },
	{ filter: "Role", value: "role_id" },
	{ filter: "Verified", value: "is_verified" },
];

const URL = {
	update: "/main/accounts/update",
	delete: "/main/accounts/delete",
};

function AccountsView() {
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
	const search = useSearch({ fetchData, defaulFilter: "first_name" });
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
					<AccountsData selectable />
				</ViewTable>
				<Divider variant="middle" />
				<TablePaginationBar />
			</MainContainer>
		</TableSearchContext.Provider>
	);
}

export default AccountsView;
