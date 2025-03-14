import ViewTable from "../../components/Table/ViewTable";
import MainContainer from "../../components/MainContainer";
import { useContext, useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import columns from "../../components/Table/columns/category/insert";
import { useDelete } from "../../hooks/useDelete";
import { TableContext } from "../../context/TableContext";
import { TableDeleteContext } from "../../context/TableDeleteContext";
import TableHeader from "../../components/Table/TableHeader";
import CategoriesData from "../../components/Table/Categories/CategoriesData";
import DeleteFooter from "../../components/delete/Footer";
import { getRoute, routes } from "../../Router";

const fetchData = async (payload: RequestByID): Promise<any> => {
	return await window.requestCategory.getByID(payload);
};

const deleteData = async (payload: { id: RequestByID }): Promise<any> => {
	return await window.requestCategory.delete(payload);
};

function CategoryDelete() {
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
		url: getRoute(routes.CATEGORIES.DELETE), 
		// "categories/manage-categories/remove-categories",
		payload: payload,
		queryKey: "categoriesDelete",
	};

	const usedelete = useDelete({
		useDelete: deleteData,
		getData: fetchData,
		options: options,
	});

	const {
		confirmationModal: { ConfirmationModal },
		isLoading,
		preData,
	} = usedelete;
	
	useLayoutEffect(() => {
		setColumns(columns);
		setRows(preData?.data || []);
	}, [preData]);

	return (
		<TableDeleteContext.Provider value={usedelete}>
			<MainContainer>
				{ConfirmationModal}
				<ViewTable isLoading={isLoading}>
					<TableHeader />
					<CategoriesData />
				</ViewTable>
				<Divider />
				<Footer />
			</MainContainer>
		</TableDeleteContext.Provider>
	);
}

export default CategoryDelete;

function Footer() {
	const navigate = useNavigate();
	const handleGoback = () => navigate(getRoute(routes.CATEGORIES.VIEW));
	const {
		rowData: { rows },
	} = useContext(TableContext);
	const { handleDelete, isDeleting } = useContext(TableDeleteContext);
	return (
		<DeleteFooter
			length={rows.length}
			isDeleting={isDeleting}
			handleDelete={handleDelete}
			handleGoback={handleGoback}
			type="category"
		/>
	);
}
