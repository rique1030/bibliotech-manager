import ViewTable from "../../components/Table/ViewTable";
import MainContainer from "../../components/MainContainer";
import { useContext, useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import columns from "../../components/Table/columns/account/insert";
import { useDelete } from "../../hooks/useDelete";
import { TableContext } from "../../context/TableContext";
import { TableDeleteContext } from "../../context/TableDeleteContext";
import TableHeader from "../../components/Table/TableHeader";
import AccountsData from "../../components/Table/Accounts/AccountsData";
import DeleteFooter from "../../components/delete/Footer";
import { getRoute, routes } from "../../Router";

const fetchData = async (payload: RequestByID): Promise<any> => {
	return await window.requestUser.getByID(payload);
};

const deleteData = async (payload: { id: RequestByID }): Promise<any> => {
	return await window.requestUser.delete(payload);
};

function AccountsDelete() {
	const location = useLocation();
	const { state } = location;
	
	const {
		rowData: { setRows, rows },
		columnData: { setColumns },
	} = useContext(TableContext);

	const payload = {
		id: rows.map((row) => row.id),
		entryIds: state,
	};

	const options = {
		url: getRoute(routes.ACCOUNTS.DELETE), // accounts/manage-accounts/remove-accounts
		payload: payload,
		queryKey: "accountsDelete",
	};

	const usedelete = useDelete({
		useDelete: deleteData,
		getData: fetchData,
		options: options,
	});

	const {
		confirmationModal: { ConfirmationModal },
		isLoading,
		preData,
	} = usedelete;

	useLayoutEffect(() => {
		setColumns(columns);
		setRows(preData?.data || []);
	}, [preData]);

	return (
		<TableDeleteContext.Provider value={usedelete}>
			<MainContainer>
				{ConfirmationModal}
				<ViewTable isLoading={isLoading}>
					<TableHeader />
					<AccountsData removable />
				</ViewTable>
				<Divider />
				<Footer />
			</MainContainer>
		</TableDeleteContext.Provider>
	);
}

export default AccountsDelete;

function Footer() {
	const navigate = useNavigate();
	const handleGoback = () => navigate(getRoute(routes.ACCOUNTS.VIEW));
	const {rowData: { rows }} = useContext(TableContext);
	const { handleDelete, isDeleting } = useContext(TableDeleteContext);
	return (
		<DeleteFooter
			length={rows.length}
			isDeleting={isDeleting}
			handleGoback={handleGoback}
			handleDelete={handleDelete}
			type="account"
		/>
	);
}
