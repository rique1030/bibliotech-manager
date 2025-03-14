import { Divider } from "@mui/material";
import useSearch from "../../hooks/useSearch";
import { useContext, useLayoutEffect } from "react";
import SearchPanel from "../../components/SearchPanel";
import ViewTable from "../../components/Table/ViewTable";
import MainContainer from "../../components/MainContainer";
import TablePaginationBar from "../../components/Table/TablePaginationBar";
import TableHeader from "../../components/Table/TableHeader";
import columns from "../../components/Table/columns/account/view";
import { TableContext } from "../../context/TableContext";
import { TableSearchContext } from "../../context/TableSearchContext";
import AccountsData from "../../components/Table/Accounts/AccountsData";
import { PermissionContext } from "../../context/PermissionContext";
import { getRoute, routes } from "../../Router";

const fetchData = async (payload: GetPagedPayload): Promise<any> => {
	return await window.requestUser.getPaged(payload);
};

const searchFilter: any[] = [
	{ filter: "FNAME", value: "first_name" },
	{ filter: "LNAME", value: "last_name" },
	{ filter: "ID NO", value: "school_id" },
	{ filter: "EMAIL", value: "email" },
];

const URL = {
	update: getRoute(routes.ACCOUNTS.UPDATE), //accounts/manage-accounts/edit-existing-accounts",
	delete: getRoute(routes.ACCOUNTS.DELETE), //accounts/manage-accounts/remove-accounts",
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

	useLayoutEffect(() => {
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
