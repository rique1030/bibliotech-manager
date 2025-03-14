import { useContext, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { TableContext } from "../../context/TableContext";
import { TableUpdateContext } from "../../context/TableUpdateContext";
import { useUpdate } from "../../hooks/useUpdate";
import ViewTable from "../../components/Table/ViewTable";
import MainContainer from "../../components/MainContainer";
import columns from "../../components/Table/columns/role/insert";
import TableHeader from "../../components/Table/TableHeader";
import RolesData from "../../components/Table/Roles/RolesData";
import UpdateFooter from "../../components/update/Footer";
import { getRoute, routes } from "../../Router";

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
		url: getRoute(routes.ROLES.UPDATE), // "//roles/manage-roles/edit-existing-roles",
		field,
		payload: payload,
		queryKey: "rolesUpdate",
	};

	const useupdate = useUpdate({ updateData, getData: fetchData, options });
	const {
		confirmationModal: { ConfirmationModal },
		preData,
		isLoading,
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
				<ViewTable isLoading={isLoading}>
					<TableHeader/>
					<RolesData edit/>
				</ViewTable>
				<Divider />
				<Footer />
			</MainContainer>
		</TableUpdateContext.Provider>
	);
}

function Footer() {
	const navigate = useNavigate();
	const handleGoback = () => navigate(getRoute(routes.ROLES.VIEW));
	const {
		useupdate: { handleUpdate, isUpdating },
	} = useContext(TableUpdateContext);
	const {
		rowData: { rows },
	} = useContext(TableContext);
	return (
		<UpdateFooter
			isUpdating={isUpdating}
			length={rows.length}
			handleGoback={handleGoback}
			handleUpdate={handleUpdate}
			type="role"
		/>
	);
}

export default RolesUpdate;
