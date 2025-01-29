import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
		entryIds: state,
	};

	const options = {
		url: "/main/accounts/manage-accounts/edit-existing-accounts",
		field,
		payload: payload,
		queryKey: "accountsUpdate",
	};

	const useupdate = useUpdate({ updateData, getData: fetchData, options });
	const {
		confirmationModal: { ConfirmationModal },
		preData,
	} = useupdate;

	useLayoutEffect(() => {
		setColumns(columns);
	}, [state]);

	useLayoutEffect(() => {
		setRows(preData?.data || []);
	}, [preData]);

	useEffect(() => {
		try {
			const updateUser = async () => {
				const user = await window.storedSettings.getAccount();
				const response = await fetchData([user.id]);
				if (response.success === false) return;
				const account = {
					email: response.data[0].email,
					first_name: response.data[0].first_name,
					id: response.data[0].id,
					is_verified: response.data[0].is_verified,
					last_name: response.data[0].last_name,
					profile_pic: response.data[0].profile_pic,
					role_id: response.data[0].role_id,
					school_id: response.data[0].school_id,
				};
				console.log(account);
				await window.storedSettings.deleteAccount();
				const strr = await window.storedSettings.saveAccount(account);
				console.log(strr);
			};
			updateUser();
		} catch (error) {
			console.error(error);
		}
	}, []);

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
	const navigate = useNavigate();
	const handleGoback = () => navigate("/main/accounts/manage-accounts");
	const {
		useupdate: { handleUpdate },
	} = useContext(TableUpdateContext);
	const {
		rowData: { rows },
	} = useContext(TableContext);

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
