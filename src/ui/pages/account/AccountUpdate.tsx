import { useContext, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Divider, Stack, Button, Tooltip } from "@mui/material";
import { TableContext } from "../context/TableContext";
import { TableUpdateContext } from "../context/TableUpdateContext";
import { useUpdate } from "../hooks/useUpdate";
import ViewTable from "../components/Table/ViewTable";
import MainContainer from "../components/MainContainer";
import columns from "../components/Table/columns/DefaultAccountsColumnsInterface";
import TableHeader from "../components/Table/TableHeader";
import AccountsData from "../components/Table/Accounts/AccountsData";
// import RolesData from "../components/Table/Roles/RolesData";

const fetchData = async (payload: RequestByID): Promise<any> => {
	return await window.requestUser.getByID(payload);
};

const updateData = async (payload: UserUpdatePayload): Promise<any> => {
	return await window.requestUser.update(payload);
};

const field = ["id", "first_name", "last_name", "email", "password", "role_id"];

function AccountUpdate() {
	const location = useLocation();
	const { state } = location;

	const {
		rowData: { rows, setRows },
		columnData: { setColumns },
	} = useContext(TableContext);

	const payload = {
		entries: rows,
	};

	const options = {
		url: "/main/accounts/update",
		field,
		payload: payload,
	};

	const useupdate = useUpdate({ updateData, options });
	const {
		confirmationModal: { ConfirmationModal },
	} = useupdate;

	useLayoutEffect(() => {
		setColumns(columns);
		if (!state) {
			setRows([]);
			return;
		}
		try {
			const response = fetchData(state as RequestByID);
			response.then((data) => {
				if (data.success === false) return;
				setRows(data?.data || []);
			});
		} catch (error) {
			console.error(error);
		}
	}, [state]);

	return (
		<TableUpdateContext.Provider value={{ useupdate }}>
			<MainContainer>
				{/* <CustomAlert /> */}
				{ConfirmationModal}
				<ViewTable>
					<TableHeader indented />
					<AccountsData removable isEditable />
				</ViewTable>
				<Divider />
				<UpdateFooter />
			</MainContainer>
		</TableUpdateContext.Provider>
	);
}

function UpdateFooter() {
	const {
		useupdate: { handleUpdate },
	} = useContext(TableUpdateContext);
	const {
		rowData: { rows },
	} = useContext(TableContext);
	return (
		<Stack direction="row" spacing={2}>
			<Tooltip
				placement="top"
				title={
					rows.length
						? "Apply changes to selected accounts"
						: "Please select accounts to apply changes"
				}
			>
				<span>
					<Button
						disabled={rows.length === 0}
						onClick={handleUpdate}
						variant="contained"
						sx={{ height: "2rem" }}
					>
						Apply&nbsp;Changes
					</Button>
				</span>
			</Tooltip>
		</Stack>
	);
}

export default AccountUpdate;
