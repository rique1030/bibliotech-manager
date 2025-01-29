import ViewTable from "../components/Table/ViewTable";
import MainContainer from "../components/MainContainer";
import { useContext, useLayoutEffect } from "react";
import { Divider, Stack, Button, Tooltip } from "@mui/material";
import columns from "../components/Table/columns/DefaultRolesColumnsInterface";
import TableHeader from "../components/Table/TableHeader";
import { TableContext } from "../context/TableContext";
import { useInsert } from "../hooks/useInsert";
import { TableInsertContext } from "../context/TableInsertContext";
import RolesData from "../components/Table/Roles/RolesData";

const insertData = async (payload: InsertRolesPayload): Promise<any> => {
	return await window.requestRole.insertMultiple(payload);
};

const field = ["role_name", "color"];

function RolesInsert() {
	const {
		rowData: { rows, setRows },
		columnData: { setColumns },
	} = useContext(TableContext);

	const payload = {
		entries: rows,
	};

	const options = {
		url: "/main/roles/manage-roles",
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
					role_name: "",
					account_view: false,
					account_insert: false,
					account_update: false,
					account_delete: false,
					roles_view: false,
					roles_insert: false,
					roles_update: false,
					roles_delete: false,
					books_view: false,
					books_insert: false,
					books_update: false,
					books_delete: false,
					categories_view: false,
					categories_insert: false,
					categories_update: false,
					categories_delete: false,
					notes: "",
					color: "#5b40e4",
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
					<RolesData removable isEditable />
				</ViewTable>
				<Divider />
				<InsertFooter />
			</MainContainer>
		</TableInsertContext.Provider>
	);
}

export default RolesInsert;

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
			role_name: "",
			account_view: false,
			account_insert: false,
			account_update: false,
			account_delete: false,
			roles_view: false,
			roles_insert: false,
			roles_update: false,
			roles_delete: false,
			books_view: false,
			books_insert: false,
			books_update: false,
			books_delete: false,
			categories_view: false,
			categories_insert: false,
			categories_update: false,
			categories_delete: false,
			notes: "",
			color: "#5b40e4",
		};
		setRows([...rows, newRow]);
	};
	return (
		<Stack direction="row" spacing={2}>
			<Tooltip
				placement="top"
				title={
					rows.length ? "Submit all role entries" : "Please add a role entry"
				}
			>
				<span>
					<Button
						disabled={rows.length === 0}
						onClick={handleInsert}
						variant="contained"
					>
						Submit&nbsp;Roles
					</Button>
				</span>
			</Tooltip>
			<Tooltip placement="top" title="Add a new role entry">
				<span>
					<Button onClick={handleAddEntry} variant="contained">
						New&nbsp;Role
					</Button>
				</span>
			</Tooltip>
		</Stack>
	);
}
