import { Divider } from "@mui/material";
import useSearch from "../../hooks/useSearch";
import { useEffect, useContext } from "react";
import SearchPanel from "../../components/SearchPanel";
import ViewTable from "../../components/Table/ViewTable";
import MainContainer from "../../components/MainContainer";
import TablePaginationBar from "../../components/Table/TablePaginationBar";
import TableHeader from "../../components/Table/TableHeader";
import columns from "../../components/Table/columns/DefaultAccountsColumnsInterface";
import { TableContext } from "../../context/TableContext";
import { TableSearchContext } from "../../context/TableSearchContext";
import AccountsData from "../../components/Table/Accounts/AccountsData";
import { PermissionContext } from "../../context/PermissionContext";

const fetchData = async (payload: GetPagedPayload): Promise<any> => {
	return await window.requestUser.getPaged(payload);
};

const searchFilter: any[] = [
	{ filter: "NAME", value: "full_name" },
	{ filter: "ID NO", value: "school_id" },
	{ filter: "EMAIL", value: "email" },
];

const URL = {
	update: "/main/accounts/manage-accounts/edit-existing-accounts",
	delete: "/main/accounts/manage-accounts/remove-accounts",
};

function AccountsView() {
	const { account } = useContext(PermissionContext);
	const {
		rowData: { setRows },
		columnData: { setColumns },
	} = useContext(TableContext);
	const search = useSearch({
		fetchData,
		defaultFilter: "first_name",
		queryKey: "accountsView",
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
					<TableHeader selectable />
					<AccountsData selectable />
				</ViewTable>
				<Divider variant="middle" />
				<TablePaginationBar
					canDelete={account?.delete}
					canUpdate={account?.update}
				/>
			</MainContainer>
		</TableSearchContext.Provider>
	);
}

export default AccountsView;
