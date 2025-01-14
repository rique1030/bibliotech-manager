import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function useSearch({
	fetchData,
	defaulFilter,
}: {
	fetchData: any;
	defaulFilter: string;
}) {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [filterTerm, setFilterTerm] = useState<string>(defaulFilter);
	const [page, setPage] = useState(0);
	const [perPage, setPerPage] = useState(10);
	const [orderBy] = useState(defaulFilter);
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
		queryKey: ["books", payload],
		queryFn: () => fetchData(payload),
	});
	const totalCount = data?.data?.total_count || 0;
	const maxPages = Math.max(0, Math.ceil(totalCount / perPage) - 1);
	const currentPage = Math.min(page, maxPages);
	const rowData = data?.data?.data || [];

	useEffect(() => {
		if (filterTerm === "status") {
			setSuggestions(["available", "borrowed", "overdue", "lost"]);
		} else {
			setSuggestions(data?.data?.data.map((row: any) => row[filterTerm]) || []);
		}
	}, [filterTerm, rowData]);

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
