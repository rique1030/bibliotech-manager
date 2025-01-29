import ViewTable from "../components/Table/ViewTable";
import MainContainer from "../components/MainContainer";
import BooksData from "../components/Table/Books/BooksData";
import { useContext, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider, Stack, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import columns from "../components/Table/columns/DefaultBookColumnsInterface";
import { TableContext } from "../context/TableContext";
import TableHeader from "../components/Table/TableHeader";
import { TableUpdateContext } from "../context/TableUpdateContext";
import { useUpdate } from "../hooks/useUpdate";
import CallNumberDropdown from "../components/Table/Books/CallNumberDropdown";

const fetchData = async (payload: RequestByID): Promise<any> => {
	return await window.requestBook.getByID(payload);
};

const updateData = async (payload: BookUpdatePayload): Promise<any> => {
	return await window.requestBook.update(payload);
};

const field = [
	"id",
	"access_number",
	"call_number",
	"title",
	"author",
	"publisher",
	"status",
];

function BooksUpdate() {
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
		url: "/main/books/manage-books/edit-existing-books",
		field,
		payload: payload,
		queryKey: "booksUpdate",
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
					<BooksData removable isEditable />
				</ViewTable>
				<Divider />
				<UpdateFooter />
			</MainContainer>
		</TableUpdateContext.Provider>
	);
}

function UpdateFooter() {
	const navigate = useNavigate();
	const handleGoback = () => navigate("/main/books/manage-books");
	const {
		useupdate: { handleUpdate, isUpdating },
	} = useContext(TableUpdateContext);
	const {
		rowData: { rows },
	} = useContext(TableContext);
	return (
		<Stack direction="row" justifyContent="flex-end" spacing={2}>
			<CallNumberDropdown />
			<Button
				onClick={() => handleGoback()}
				variant="contained"
				sx={{ height: "2rem" }}
			>
				Back
			</Button>
			<Tooltip
				placement="top"
				title={
					rows.length
						? "Apply changes to selected books"
						: isUpdating
						? "Applying changes..."
						: "Please select books to apply changes"
				}
			>
				<span>
					<Button
						disabled={rows.length === 0 || isUpdating}
						onClick={handleUpdate}
						variant="contained"
						sx={{ height: "2rem" }}
					>
						{isUpdating ? "Applying..." : "Apply\u00A0changes"}
					</Button>
				</span>
			</Tooltip>
		</Stack>
	);
}

export default BooksUpdate;
