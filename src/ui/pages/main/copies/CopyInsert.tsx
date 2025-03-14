import ViewTable from "../../components/Table/ViewTable";
import MainContainer from "../../components/MainContainer";
import { useContext, useLayoutEffect } from "react";
import { Divider } from "@mui/material";
import columns from "../../components/Table/columns/copy/view";
import TableHeader from "../../components/Table/TableHeader";
import { TableContext } from "../../context/TableContext";
import { useInsert } from "../../hooks/useInsert";
import { TableInsertContext } from "../../context/TableInsertContext";
import InsertFooter from "../../components/insert/Footer";
import { getRoute, routes } from "../../Router";
import useGenerateAccessNumber from "../../hooks/useGenerateAccessNumber";
import { useLocation } from "react-router-dom";
import CopyData from "../../components/Table/Copy/CopyData";

const insertData = async (payload: InsertCopyPayload): Promise<any> => {
	return await window.requestCopy.insertMultiple(payload);
};

const field = ["status", "access_number"];

function CopyInsert() {
	const { state } = useLocation();

	const {
		rowData: { rows, setRows },
		columnData: { setColumns },
		refetch,
	} = useContext(TableContext);

	const { generateAccessNumber } = useGenerateAccessNumber();

	const payload = {
		entries: rows,
	};

	const options = {
		url: getRoute(routes.COPIES.VIEW),
		field,
		payload: payload,
	};

	const useinsert = useInsert({ insertData, options });

	const {
		confirmationModal: { ConfirmationModal },
	} = useinsert;

	useLayoutEffect(() => {
		setColumns(columns);
		refetch();
		(async () => {
			const newAccessNumber = await generateAccessNumber();
			setRows([
				{
					id: 0,
					title: state.title,
					author: state.author,
					catalog_id: state.id,
					access_number: `BTECH-${newAccessNumber}`,
					status: "available",
				},
			]);
		})();
	}, []);

	return (
		<TableInsertContext.Provider value={{ useinsert, state }}>
			{ConfirmationModal}
			<MainContainer>
				<ViewTable>
					<TableHeader />
					<CopyData edit />
				</ViewTable>
				<Divider />
				<Footer />
			</MainContainer>
		</TableInsertContext.Provider>
	);
}

export default CopyInsert;

function Footer() {
	const {
		useinsert: { handleInsert, isInserting },
		state,
	} = useContext(TableInsertContext);
	const {
		rowData: { rows, setRows },
	} = useContext(TableContext);

	const { generateAccessNumber } = useGenerateAccessNumber();

	const handleAddEntry = async () => {
		const newId = rows.length;
		const newAccessNumber = await generateAccessNumber();
		const newRow = {
			id: newId,
			catalog_id: state.id,
			title: state.title,
			author: state.author,
			access_number: `BTECH-${newAccessNumber}`,
			status: "available",
		};
		setRows([...rows, newRow]);
	};
	return (
		<InsertFooter
			length={rows.length}
			handleAddEntry={handleAddEntry}
			handleInsert={handleInsert}
			isInserting={isInserting}
			type="Copy"
		/>
	);
}
