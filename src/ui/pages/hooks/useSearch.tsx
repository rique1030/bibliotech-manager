import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TableContext } from "../context/TableContext";
import { AlertContext } from "../context/AlertContext";

export default function useSearch({
	fetchData,
	queryKey,
	defaultFilter,
	fastRefetch,
}: {
	fetchData: any;
	queryKey: string;
	defaultFilter: string;
	fastRefetch?: boolean;
}) {
	const { availableRoles } = useContext(TableContext);
	const { resultAlert } = useContext(AlertContext);
	const { showTimedAlert } = resultAlert;
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [filterTerm, setFilterTerm] = useState<string>(defaultFilter);
	const [orderBy, setOrderBy] = useState<string>(defaultFilter);
	const [asc, setAsc] = useState<boolean>(true);
	const [page, setPage] = useState(0);
	const [perPage, setPerPage] = useState(10);

	const [suggestions, setSuggestions] = useState<string[]>([]);

	const payload: GetPagedPayload = {
		page: page,
		per_page: perPage,
		filters: searchTerm ? { [filterTerm]: searchTerm } : undefined,
		order_by: orderBy,
		order_direction: asc ? "asc" : "desc",
	};

	const { data, isLoading, refetch } = useQuery({
		queryKey: [queryKey, payload],
		queryFn: () => fetchData(payload),
		retry: 0,
		staleTime: fastRefetch ? 1000 * 20 : 1000 * 60,
		refetchOnReconnect: true,
		refetchOnMount: false,
	});

	const refresh = () => {
		refetch();
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
	}, [asc, orderBy]);

	useLayoutEffect(() => {
		if (filterTerm === "status") {
			setSuggestions(["Available", "Borrowed", "Overdue", "Lost"]);
		} else if (filterTerm === "role_id") {
			setSuggestions(availableRoles.map((role: any) => role.role_name));
		} else {
			const uniqueValues = new Set(
				rowData.map((item: any) => item[filterTerm])
			);
			setSuggestions(
				Array.from(uniqueValues).filter((value: any) => value !== null)
			);
		}
	}, [filterTerm, rowData]);

	useLayoutEffect(() => {
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
		setOrderBy,
		setAsc,
		asc,
		orderBy,
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
