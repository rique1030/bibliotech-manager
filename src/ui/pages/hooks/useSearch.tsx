import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TableContext } from "../context/TableContext";
import { AlertContext } from "../context/AlertContext";

export default function useSearch({
	fetchData,
	queryKey,
	defaultFilter,
}: {
	fetchData: any;
	queryKey: string;
	defaultFilter: string;
}) {
	const { availableRoles } = useContext(TableContext);
	const { resultAlert } = useContext(AlertContext);
	const { showTimedAlert } = resultAlert;
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [filterTerm, setFilterTerm] = useState<string>(defaultFilter);
	const [page, setPage] = useState(0);
	const [perPage, setPerPage] = useState(10);
	// const [orderBy] = useState(defaultFilter);
	// const [orderDirection] = useState<"asc" | "desc">("asc");

	const [suggestions, setSuggestions] = useState<string[]>([]);

	const payload: GetPagedPayload = {
		page: page,
		per_page: perPage,
		filters: searchTerm ? { [filterTerm]: searchTerm } : undefined,
	};

	const { data, isLoading, refetch } = useQuery({
		queryKey: [queryKey, payload],
		queryFn: () => fetchData(payload),
		retry: 0,
		staleTime: 1000 * 60,
		refetchOnReconnect: true,
		refetchOnMount: false,
	});

	const refresh = () => {
		refetch();
		console.log("refetch");
	};

	const [totalCount, setTotalCount] = useState<number>(0);
	const [maxPages, setMaxPages] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [rowData, setRowData] = useState<any[]>([]);

	useEffect(() => {
		setTotalCount(data?.data?.total_count || 0);
		setMaxPages(Math.max(0, Math.ceil(totalCount / perPage) - 1));
		setCurrentPage(Math.min(page, maxPages));
		setRowData(data?.data?.items || []);
	}, [data, page, perPage, totalCount]);

	useEffect(() => {
		refetch();
	}, []);

	useEffect(() => {
		if (filterTerm === "status") {
			setSuggestions(["Available", "Borrowed", "Overdue", "Lost"]);
		}
		// else if (filterTerm === "is_verified") {
		// 	setSuggestions(["Verified", "Not Verified"]);
		// }
		else if (filterTerm === "role_id") {
			setSuggestions(availableRoles.map((role: any) => role.role_name));
		} else {
			setSuggestions(
				data?.data?.items.map((item: any) => item[filterTerm]) || []
			);
		}
	}, [filterTerm, rowData]);

	useEffect(() => {
		console.log(data?.data?.items);
		if (!data?.success) {
			if (data?.error) {
				if (data?.error === "ECONNREFUSED") {
					showTimedAlert(
						"error",
						"Connection refused. Please try again later."
					);
				} else {
					showTimedAlert("error", data?.error);
				}
			}
		}
	}, [data, isLoading]);

	return {
		setSearchTerm,
		setFilterTerm,
		setPage,
		setPerPage,
		filterTerm,
		perPage,
		suggestions,
		totalCount,
		currentPage,
		isLoading,
		rowData,
		refresh,
	};
}
