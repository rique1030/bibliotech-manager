import ViewTable from "../components/Table/ViewTable";
import MainContainer from "../components/MainContainer";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider, Stack, Button, Tooltip } from "@mui/material";
import columns from "../components/Table/columns/DefaultAccountsColumnsInterface";
import { useDelete } from "../hooks/useDelete";
import { TableContext } from "../context/TableContext";
import { TableDeleteContext } from "../context/TableDeleteContext";
import TableHeader from "../components/Table/TableHeader";
import AccountsData from "../components/Table/Accounts/AccountsData";

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
	};

	const options = {
		url: "/main/accounts/manage-accounts/remove-accounts",
		payload: payload,
	};

	const usedelete = useDelete({ useDelete: deleteData, options: options });
	const {
		confirmationModal: { ConfirmationModal },
	} = usedelete;
	useEffect(() => {
		setColumns(columns);
		if (!state) {
			setRows([]);
			return;
		}
		try {
			const response = fetchData(state as RequestByID);
			response.then((data) => {
				setRows(data?.data);
			});
		} catch (error) {
			console.error(error);
		}
	}, [state]);

	return (
		<TableDeleteContext.Provider value={usedelete}>
			<MainContainer>
				{/* <CustomAlert /> */}
				{ConfirmationModal}
				<ViewTable>
					<TableHeader indented />
					<AccountsData removable />
				</ViewTable>
				<Divider />
				<DeleteFooter />
			</MainContainer>
		</TableDeleteContext.Provider>
	);
}

export default AccountsDelete;

function DeleteFooter() {
	const navigate = useNavigate();
	const handleGoback = () => navigate("/main/accounts/manage-accounts");
	const {
		rowData: { rows },
	} = useContext(TableContext);
	const { handleDelete } = useContext(TableDeleteContext);
	return (
		<Stack direction="row" justifyContent="flex-end" spacing={2}>
			<span>
				<Button
					onClick={() => handleGoback()}
					variant="contained"
					sx={{ height: "2rem" }}
				>
					Back
				</Button>
			</span>
			<Tooltip
				placement="top"
				title={
					rows.length
						? "Remove selected accounts"
						: "Please select accounts to remove"
				}
			>
				<span>
					<Button
						disabled={rows.length === 0}
						onClick={() => handleDelete("account")}
						variant="contained"
						sx={{ height: "2rem" }}
					>
						Remove
					</Button>
				</span>
			</Tooltip>
		</Stack>
	);
}
