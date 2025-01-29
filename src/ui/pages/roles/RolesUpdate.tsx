import { useContext, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider, Stack, Button, Tooltip } from "@mui/material";
import { TableContext } from "../context/TableContext";
import { TableUpdateContext } from "../context/TableUpdateContext";
import { useUpdate } from "../hooks/useUpdate";
import ViewTable from "../components/Table/ViewTable";
import MainContainer from "../components/MainContainer";
import columns from "../components/Table/columns/DefaultRolesColumnsInterface";
import TableHeader from "../components/Table/TableHeader";
import RolesData from "../components/Table/Roles/RolesData";

const fetchData = async (payload: RequestByID): Promise<any> => {
	return await window.requestRole.getByID(payload);
};

const updateData = async (payload: RoleUpdatePayload): Promise<any> => {
	return await window.requestRole.update(payload);
};

const field = ["id", "role_name", "color"];

function RolesUpdate() {
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
		url: "/main/roles/manage-roles/edit-existing-roles",
		field,
		payload: payload,
		queryKey: "rolesUpdate",
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

	return (
		<TableUpdateContext.Provider value={{ useupdate }}>
			<MainContainer>
				{ConfirmationModal}
				<ViewTable>
					<TableHeader indented />
					<RolesData removable isEditable />
				</ViewTable>
				<Divider />
				<UpdateFooter />
			</MainContainer>
		</TableUpdateContext.Provider>
	);
}

function UpdateFooter() {
	const navigate = useNavigate();
	const handleGoback = () => navigate("/main/roles/manage-roles");
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
						? "Apply changes to selected roles"
						: "Please select roles to apply changes"
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

export default RolesUpdate;
