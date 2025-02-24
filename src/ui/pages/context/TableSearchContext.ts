import React, { createContext } from "react";

interface TableSearchContextType {
	search: {
		setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
		setFilterTerm: React.Dispatch<React.SetStateAction<string>>;
		setPage: React.Dispatch<React.SetStateAction<number>>;
		setPerPage: React.Dispatch<React.SetStateAction<number>>;
		filterTerm: string;
		perPage: number;
		suggestions: string[] | undefined;
		totalCount: number;
		currentPage: number;
		isLoading: boolean;
		rowData: any;
		refresh: () => void;
	};
	searchFilter: { filter: string; value: string }[];
	URL: {
		update?: string | null;
		delete?: string | null;
		qr?: string | null;
	};
}

export const TableSearchContext = createContext<TableSearchContextType>({
	search: {
		setSearchTerm: () => {},
		setFilterTerm: () => {},
		setPage: () => {},
		setPerPage: () => {},
		filterTerm: "",
		perPage: 10,
		suggestions: undefined,
		totalCount: 0,
		currentPage: 0,
		isLoading: false,
		rowData: [],
		refresh: () => {},
	},
	searchFilter: [{ filter: "", value: "" }],
	URL: { update: "", delete: "", qr: "" },
});
