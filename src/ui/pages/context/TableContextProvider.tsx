import { useLocation } from "react-router-dom";
import useCollapsibleManager from "../hooks/useCollapsibleManager";
import useSelectAll from "../hooks/useSelectAll";
import { TableContext } from "./TableContext";
import { useLayoutEffect, useState } from "react";
import { useCallNoFormatter } from "../hooks/useCallNoFormatter";

const getRoles = async (): Promise<any> => {
	return await window.requestRole.getAll();
};

const getCategories = async (): Promise<any> => {
	return await window.requestCategory.getAll();
};

function TableContextProvider({ children }: { children: React.ReactNode }) {
	const [availableRoles, setAvailableRoles] = useState([]);
	const [availableCategories, setAvailableCategories] = useState([]);
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
					return newEntry;
				}
				return entry;
			})
		);
	};

	useLayoutEffect(() => {
		handleRowClick(-1);
		setSelectedItems([]);
		if (location.pathname.includes("accounts")) {
			fetchRoles();
		}
		if (location.pathname.includes("books")) {
			fetchCategories();
		}
	}, [location.pathname]);

	const fetchRoles = async () => {
		try {
			const fetchRoles = async () => {
				try {
					const roles = getRoles();
					roles.then((data) => {
						if (data.success === false) return;
						setAvailableRoles(data.data);
					});
				} catch (error) {
					console.error("Failed to fetch roles:", error);
				}
			};

			fetchRoles();
		} catch (error) {
			console.error("Failed to fetch roles:", error);
		}
	};

	const fetchCategories = async () => {
		try {
			const categories = getCategories();
			categories.then((data) => {
				if (data.success === false) return;
				setAvailableCategories(data.data);
			});
		} catch (error) {
			console.error("Failed to fetch categories:", error);
		}
	};

	return (
		<TableContext.Provider
			value={{
				availableRoles,
				availableCategories,
				rowData: { rows, setRows },
				columnData: { columns, setColumns },
				selectAll: selectAll,
				handleRemoveEntry,
				collapsibleManager: { OpenedRowIndex, handleRowClick },
				handleEditEntry,
				callNoFormatter,
			}}
		>
			{children}
		</TableContext.Provider>
	);
}

export default TableContextProvider;
