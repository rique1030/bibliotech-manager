import ViewTable from "../components/Table/ViewTable";
import MainContainer from "../components/MainContainer";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider, Stack, Button, Tooltip } from "@mui/material";
import columns from "../components/Table/columns/DefaultCategoryColumnsInterface";
import { useDelete } from "../hooks/useDelete";
import { TableContext } from "../context/TableContext";
import { TableDeleteContext } from "../context/TableDeleteContext";
import TableHeader from "../components/Table/TableHeader";
import CategoriesData from "../components/Table/Categories/CategoriesData";

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
	};

	const options = {
		url: "/main/categories/remove-categories",
		payload: payload,
	};

	const usedelete = useDelete({ useDelete: deleteData, options: options });
	const {
		confirmationModal: { ConfirmationModal },
	} = usedelete;
	useEffect(() => {
		setColumns(columns);
		if (!state) {
			setRows([]);
			return;
		}
		try {
			const response = fetchData(state as RequestByID);
			response.then((data) => {
				setRows(data?.data);
			});
		} catch (error) {
			console.error(error);
		}
	}, [state]);

	return (
		<TableDeleteContext.Provider value={usedelete}>
			<MainContainer>
				{/* <CustomAlert /> */}
				{ConfirmationModal}
				<ViewTable>
					<TableHeader indented />
					<CategoriesData removable />
				</ViewTable>
				<Divider />
				<DeleteFooter />
			</MainContainer>
		</TableDeleteContext.Provider>
	);
}

export default CategoryDelete;

function DeleteFooter() {
	const navigate = useNavigate();
	const handleGoback = () => navigate("/main/categories/manage-categories");
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
						? "Remove selected categories"
						: "Please select categories to remove"
				}
			>
				<span>
					<Button
						disabled={rows.length === 0}
						onClick={() => handleDelete("category")}
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
