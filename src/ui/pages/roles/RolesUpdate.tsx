import { useContext, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
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
	};

	const options = {
		url: "/main/roles/update",
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
					<RolesData removable isEditable />
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
