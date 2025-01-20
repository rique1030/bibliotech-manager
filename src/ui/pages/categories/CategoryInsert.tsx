import ViewTable from "../components/Table/ViewTable";
import MainContainer from "../components/MainContainer";
import { useContext, useLayoutEffect } from "react";
import { Divider, Stack, Button, Tooltip } from "@mui/material";
import columns from "../components/Table/columns/DefaultCategoryColumnsInterface";
import TableHeader from "../components/Table/TableHeader";
import { TableContext } from "../context/TableContext";
import { useInsert } from "../hooks/useInsert";
import { TableInsertContext } from "../context/TableInsertContext";
import useGenerateAccessNumber from "../hooks/useGenerateAccessNumber";
import CategoriesData from "../components/Table/Categories/CategoriesData";

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
		url: "/main/categories/view",
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
					<CategoriesData removable isEditable />
				</ViewTable>
				<Divider />
				<InsertFooter />
			</MainContainer>
		</TableInsertContext.Provider>
	);
}

export default CategoryInsert;

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
			name: "",
			description: "",
		};
		setRows([...rows, newRow]);
	};
	return (
		<Stack direction="row" spacing={2}>
			<Tooltip
				placement="top"
				title={
					rows.length
						? "Submit all category entries"
						: "Please add a category entry"
				}
			>
				<span>
					<Button
						disabled={rows.length === 0}
						onClick={handleInsert}
						variant="contained"
					>
						Submit&nbsp;Categories
					</Button>
				</span>
			</Tooltip>
			<Tooltip placement="top" title="Add a new category entry">
				<span>
					<Button onClick={handleAddEntry} variant="contained">
						New&nbsp;Category
					</Button>
				</span>
			</Tooltip>
		</Stack>
	);
}
