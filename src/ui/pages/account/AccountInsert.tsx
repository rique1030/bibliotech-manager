import ViewTable from "../components/Table/ViewTable";
import MainContainer from "../components/MainContainer";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Divider, Stack, Button, Tooltip } from "@mui/material";
import columns from "../components/Table/columns/DefaultAccountsColumnsInterface";
import TableHeader from "../components/Table/TableHeader";
import { TableContext } from "../context/TableContext";
import { useInsert } from "../hooks/useInsert";
import { TableInsertContext } from "../context/TableInsertContext";
import AccountsData from "../components/Table/Accounts/AccountsData";

const insertData = async (payload: InsertUsersPayload): Promise<any> => {
	return await window.requestUser.insertMultiple(payload);
};

const field = ["first_name", "last_name", "email", "password", "role_id"];

function AccountInsert() {
	const {
		rowData: { rows, setRows },
		columnData: { setColumns },
	} = useContext(TableContext);

	const payload = {
		entries: rows,
	};

	const options = {
		url: "/main/accounts/manage-accounts",
		field,
		payload: payload,
	};

	const useinsert = useInsert({ insertData, options });
	const {
		confirmationModal: { ConfirmationModal },
	} = useinsert;

	useLayoutEffect(() => {
		setColumns(columns);
		(async () => {
			setRows([
				{
					id: 0,
					profile_pic: "",
					first_name: "",
					last_name: "",
					email: "",
					password: "",
					school_id: null,
					role_id: 2,
					is_verified: true,
					created_at: null,
				},
			]);
		})();
	}, []);

	return (
		<TableInsertContext.Provider value={{ useinsert }}>
			{ConfirmationModal}
			<MainContainer>
				<ViewTable>
					<TableHeader indented />
					<AccountsData removable isEditable />
				</ViewTable>
				<Divider />
				<InsertFooter />
			</MainContainer>
		</TableInsertContext.Provider>
	);
}

export default AccountInsert;

function InsertFooter() {
	const {
		useinsert: { handleInsert },
	} = useContext(TableInsertContext);
	const {
		rowData: { rows, setRows },
	} = useContext(TableContext);

	const handleAddEntry = async () => {
		const newId = rows.length;
		const newRow = {
			id: newId,
			profile_pic: "",
			first_name: "",
			last_name: "",
			email: "",
			password: "",
			school_id: null,
			role_id: 2,
			is_verified: true,
			created_at: null,
		};
		setRows([...rows, newRow]);
	};
	return (
		<Stack direction="row" spacing={2}>
			<Tooltip
				placement="top"
				title={
					rows.length
						? "Submit all account entries"
						: "Please add an account entry"
				}
			>
				<span>
					<Button
						disabled={rows.length === 0}
						onClick={handleInsert}
						variant="contained"
					>
						Submit&nbsp;Account&nbsp;Entries
					</Button>
				</span>
			</Tooltip>
			<Tooltip placement="top" title="Add a new account entry">
				<span>
					<Button onClick={handleAddEntry} variant="contained">
						New&nbsp;Account&nbsp;Entry
					</Button>
				</span>
			</Tooltip>
		</Stack>
	);
}
