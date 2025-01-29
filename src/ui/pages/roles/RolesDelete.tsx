import ViewTable from "../components/Table/ViewTable";
import MainContainer from "../components/MainContainer";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider, Stack, Button, Tooltip } from "@mui/material";
import columns from "../components/Table/columns/DefaultRolesColumnsInterface";
import { useDelete } from "../hooks/useDelete";
import { TableContext } from "../context/TableContext";
import { TableDeleteContext } from "../context/TableDeleteContext";
import TableHeader from "../components/Table/TableHeader";
import RolesData from "../components/Table/Roles/RolesData";

const fetchData = async (payload: RequestByID): Promise<any> => {
	return await window.requestRole.getByID(payload);
};

const deleteData = async (payload: { id: RequestByID }): Promise<any> => {
	return await window.requestRole.delete(payload);
};

function RolesDelete() {
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
		url: "/main/roles/manage-roles/remove-roles",
		payload: payload,
		queryKey: "rolesDelete",
	};

	const usedelete = useDelete({
		useDelete: deleteData,
		getData: fetchData,
		options: options,
	});
	const {
		confirmationModal: { ConfirmationModal },
		preData,
	} = usedelete;

	useEffect(() => {
		setColumns(columns);
	}, [state]);

	useEffect(() => {
		setRows(preData?.data || []);
	}, [preData]);

	return (
		<TableDeleteContext.Provider value={usedelete}>
			<MainContainer>
				{ConfirmationModal}
				<ViewTable>
					<TableHeader indented />
					<RolesData removable />
				</ViewTable>
				<Divider />
				<DeleteFooter />
			</MainContainer>
		</TableDeleteContext.Provider>
	);
}

export default RolesDelete;

function DeleteFooter() {
	const navigate = useNavigate();
	const handleGoback = () => navigate("/main/roles/manage-roles");
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
						? "Remove selected roles"
						: "Please select roles to remove"
				}
			>
				<span>
					<Button
						disabled={rows.length === 0}
						onClick={() => handleDelete("role")}
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
