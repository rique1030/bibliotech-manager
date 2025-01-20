import React, { createContext } from "react";

interface TableContextType {
	availableRoles: any[];
	availableCategories: any[];
	rowData: {
		rows: any[];
		setRows: React.Dispatch<React.SetStateAction<any[]>>;
	};
	columnData: {
		columns: any[];
		setColumns: React.Dispatch<React.SetStateAction<columnsInterface[]>>;
	};
	selectAll: {
		selectedItems: any[];
		setSelectedItems: React.Dispatch<React.SetStateAction<any[]>>;
		toggleSelectAll: () => void;
		toggleSelectItem: (item: any) => void;
		isSelected: (item: any) => boolean;
		isAllSelected: boolean;
		isIntermediate: boolean;
	};
	handleRemoveEntry: any;
	collapsibleManager: any;
	handleEditEntry: (index: number, key: string, value: any) => void;
	// handleAddEntry: () => void;
	callNoFormatter: {
		verifyFormat: (callNumber: string) => boolean;
		currentFormat: any;
		currentIndex: number;
		handleChangeFormat: (index: number) => void;
		formats: {
			id: number;
			name: string;
			format: string;
			regex: string;
			description: string;
		}[];
	};
}

export const TableContext = createContext<TableContextType>({
	availableRoles: [],
	availableCategories: [],
	rowData: { rows: [], setRows: () => {} },
	columnData: { columns: [], setColumns: () => {} },
	selectAll: {
		selectedItems: [],
		setSelectedItems: () => {},
		toggleSelectAll: () => {},
		toggleSelectItem: () => {},
		isSelected: () => false,
		isAllSelected: false,
		isIntermediate: false,
	},
	handleRemoveEntry: () => {},
	collapsibleManager: () => {},
	handleEditEntry: () => {},
	// handleAddEntry: () => {},
	callNoFormatter: {
		verifyFormat: () => false,
		currentFormat: null,
		currentIndex: 0,
		handleChangeFormat: () => {},
		formats: [],
	},
});
