// Material UI Components
import { Divider } from "@mui/material";
// Hooks
import useSearch from "../hooks/useSearch";
import { useEffect, useContext } from "react";
// Components
import SearchPanel from "../components/SearchPanel";
import ViewTable from "../components/Table/ViewTable";
import MainContainer from "../components/MainContainer";
import TablePaginationBar from "../components/Table/TablePaginationBar";
import TableHeader from "../components/Table/TableHeader";
import columns from "../components/Table/columns/DefaultCategoryColumnsInterface";
import { TableContext } from "../context/TableContext";
import { TableSearchContext } from "../context/TableSearchContext";
import CategoriesData from "../components/Table/Categories/CategoriesData";

const fetchData = async (payload: GetPagedPayload): Promise<any> => {
	return await window.requestCategory.getPaged(payload);
};

const searchFilter: any[] = [
	{ filter: "Name", value: "name" },
	{ filter: "Desc.", value: "description" },
];

const URL = {
	update: "/main/categories/manage-categories/edit-existing-categories",
	delete: "/main/categories/manage-categories/remove-categories",
};

function CategoryView() {
	/**
	 * Table
	 */
	const {
		rowData: { setRows },
		columnData: { setColumns },
	} = useContext(TableContext);
	/**
	 * Search
	 */
	const search = useSearch({
		fetchData,
		defaultFilter: "name",
		queryKey: "categoriesView",
	});
	const { rowData } = search;

	useEffect(() => {
		setColumns(columns);
	}, []);

	useEffect(() => {
		setRows(rowData);
	}, [rowData]);

	return (
		<TableSearchContext.Provider value={{ search, searchFilter, URL }}>
			<MainContainer>
				<SearchPanel />
				<Divider variant="middle" />
				<ViewTable>
					<TableHeader selectable />
					<CategoriesData selectable />
				</ViewTable>
				<Divider variant="middle" />
				<TablePaginationBar />
			</MainContainer>
		</TableSearchContext.Provider>
	);
}

export default CategoryView;
