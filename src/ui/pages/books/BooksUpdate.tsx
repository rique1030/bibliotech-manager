import ViewTable from "../components/Table/ViewTable";
import MainContainer from "../components/MainContainer";
import BooksData from "../components/Table/Books/BooksData";
import { memo, useContext, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
	Divider,
	Stack,
	Button,
	Dialog,
	DialogTitle,
	Box,
	Typography,
	DialogContent,
	DialogContentText,
	DialogActions,
	Tooltip,
	Paper,
	styled,
	List,
	ListItem,
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "@mui/material";
import columns from "../components/Table/columns/DefaultBookColumnsInterface";
import { TableContext } from "../context/TableContext";
import TableHeader from "../components/Table/TableHeader";
import { TableUpdateContext } from "../context/TableUpdateContext";
import { useUpdate } from "../hooks/useUpdate";
import CallNumberDropdown from "../components/Table/Books/CallNumberDropdown";
import ConfirmBorrow from "../components/BorrowingModal";

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
	};

	const options = {
		url: "/main/books/update",
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
						? "Apply changes to selected books"
						: "Please select books to apply changes"
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
			<CallNumberDropdown />
		</Stack>
	);
}

export default BooksUpdate;
