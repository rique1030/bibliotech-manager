// import VerifyRequiredFields from "../../helper/VerifyRequiredFields";
import { useLocation } from "react-router-dom";
import useCollapsibleManager from "../hooks/useCollapsibleManager";
import useSelectAll from "../hooks/useSelectAll";
import { TableContext } from "./TableContext";
import { useLayoutEffect, useState } from "react";
import { useCallNoFormatter } from "../hooks/useCallNoFormatter";

function TableContextProvider({ children }: { children: React.ReactNode }) {
	const [rows, setRows] = useState<any[]>([]);
	const [columns, setColumns] = useState<columnsInterface[]>([]);
	const callNoFormatter = useCallNoFormatter();
	const location = useLocation();

	const selectAll = useSelectAll(rows.map((row) => row.id));
	const { setSelectedItems } = selectAll;
	const { OpenedRowIndex, handleRowClick } = useCollapsibleManager();
	const handleRemoveEntry = (id: number) => {
		const updatedRows = rows.filter((row) => row.id !== id);
		setRows(updatedRows);
	};

	const handleEditEntry = (index: number, key: string, value: any) => {
		setRows((prevRows) =>
			prevRows.map((entry) => {
				if (entry.id === index) {
					const newEntry = { ...entry, [key]: value };
					console.log("newEntry", newEntry);
					return newEntry;
				}
				return entry;
			})
		);
	};

	useLayoutEffect(() => {
		handleRowClick(-1);
		setSelectedItems([]);
	}, [location.pathname]);

	const handleAddEntry = () => {
		const newId = rows.length;
		const newRow = {
			id: newId,
			access_number: "",
			call_number: "",
			title: "",
			author: "",
			publisher: "",
			cover_image: "",
			description: "",
			date_added: null,
			date_updated: null,
			qrcode: "",
			status: "",
		};
		setRows([...rows, newRow]);
	};

	return (
		<TableContext.Provider
			value={{
				rowData: { rows, setRows },
				columnData: { columns, setColumns },
				selectAll: selectAll,
				handleRemoveEntry,
				collapsibleManager: { OpenedRowIndex, handleRowClick },
				handleEditEntry,
				handleAddEntry,
				callNoFormatter,
			}}
		>
			{children}
		</TableContext.Provider>
	);
}

export default TableContextProvider;
