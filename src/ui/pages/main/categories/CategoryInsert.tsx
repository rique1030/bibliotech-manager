import ViewTable from "../../components/Table/ViewTable";
import MainContainer from "../../components/MainContainer";
import { useContext, useLayoutEffect } from "react";
import { Divider } from "@mui/material";
import columns from "../../components/Table/columns/category/insert";
import TableHeader from "../../components/Table/TableHeader";
import { TableContext } from "../../context/TableContext";
import { useInsert } from "../../hooks/useInsert";
import { TableInsertContext } from "../../context/TableInsertContext";
import CategoriesData from "../../components/Table/Categories/CategoriesData";
import InsertFooter from "../../components/insert/Footer";
import { getRoute, routes } from "../../Router";

const insertData = async (payload: InsertCategoriesPayload): Promise<any> => {
	return await window.requestCategory.insertMultiple(payload);
};

const field = ["name"];

function CategoryInsert() {
	const {
		rowData: { rows, setRows },
		columnData: { setColumns },
	} = useContext(TableContext);

	const payload = {
		entries: rows,
	};

	const options = {
		url: getRoute(routes.CATEGORIES.VIEW), //"categories/manage-categories",
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
					name: "",
					description: "",
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
					<CategoriesData removable edit />
				</ViewTable>
				<Divider />
				<Footer />
			</MainContainer>
		</TableInsertContext.Provider>
	);
}

export default CategoryInsert;

function Footer() {
	const {
		useinsert: { handleInsert, isInserting },
	} = useContext(TableInsertContext);
	const {
		rowData: { rows, setRows },
	} = useContext(TableContext);

	const handleAddEntry = async () => {
		const newId = rows.length;
		const newRow = {
			id: newId,
			name: "",
			description: "",
		};
		setRows([...rows, newRow]);
	};
	return (
		<InsertFooter
			length={rows.length}
			isInserting={isInserting}
			handleAddEntry={handleAddEntry}
			handleInsert={handleInsert}
			type="Category"
		/>
	);
}
