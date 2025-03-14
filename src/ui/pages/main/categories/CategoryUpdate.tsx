import { useContext, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { TableContext } from "../../context/TableContext";
import { TableUpdateContext } from "../../context/TableUpdateContext";
import { useUpdate } from "../../hooks/useUpdate";
import ViewTable from "../../components/Table/ViewTable";
import MainContainer from "../../components/MainContainer";
import columns from "../../components/Table/columns/category/insert";
import TableHeader from "../../components/Table/TableHeader";
import CategoriesData from "../../components/Table/Categories/CategoriesData";
import UpdateFooter from "../../components/update/Footer";
import { getRoute, routes } from "../../Router";

const fetchData = async (payload: RequestByID): Promise<any> => {
	return await window.requestCategory.getByID(payload);
};

const updateData = async (payload: CategoryUpdatePayload): Promise<any> => {
	return await window.requestCategory.update(payload);
};

const field = ["id", "name"];

function CategoryUpdate() {
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
		url: getRoute(routes.CATEGORIES.UPDATE), // "//categories/manage-categories/edit-existing-categories",
		field,
		payload: payload,
		queryKey: "categoryUpdate",
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
				{/* <CustomAlert /> */}
				{ConfirmationModal}
				<ViewTable isLoading={isLoading}>
					<TableHeader />
					<CategoriesData edit />
				</ViewTable>
				<Divider />
				<Footer />
			</MainContainer>
		</TableUpdateContext.Provider>
	);
}

function Footer() {
	const navigate = useNavigate();
	const handleGoback = () => navigate(getRoute(routes.CATEGORIES.VIEW));
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
			type="category"
		/>
	);
}

export default CategoryUpdate;
