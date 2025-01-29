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
	const [orderBy] = useState(defaultFilter);
	const [orderDirection] = useState<"asc" | "desc">("asc");

	const [suggestions, setSuggestions] = useState<string[]>([]);

	const payload: GetPagedPayload = {
		page: page,
		per_page: perPage,
		filters: searchTerm ? { [filterTerm]: searchTerm } : undefined,
		order_by: orderBy,
		order_direction: orderDirection,
	};

	const { data, isLoading } = useQuery({
		queryKey: [queryKey, payload],
		queryFn: () => fetchData(payload),
		retry: 0,
	});

	const totalCount = data?.data?.total_count || 0;
	const maxPages = Math.max(0, Math.ceil(totalCount / perPage) - 1);
	const currentPage = Math.min(page, maxPages);
	const rowData = data?.data?.data || [];
	
	useEffect(() => {
		if (filterTerm === "status") {
			setSuggestions(["Available", "Borrowed", "Overdue", "Lost"]);
		} else if (filterTerm === "is_verified") {
			setSuggestions(["Verified", "Unverified"]);
		} else if (filterTerm === "role_id") {
			setSuggestions(availableRoles.map((role: any) => role.role_name));
		} else {
			setSuggestions(data?.data?.data.map((row: any) => row[filterTerm]) || []);
		}
	}, [filterTerm, rowData]);

	useEffect(() => {
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
	}, [data]);

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
	};
}
