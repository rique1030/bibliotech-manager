import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useConfirmationModal } from "../components/ConfirmationModal";

import { useContext, useEffect } from "react";
import { AlertContext } from "../context/AlertContext";

interface useDeleteInterface {
	useDelete: (payload: any) => Promise<any>;
	getData: (payload: any) => Promise<any>;
	options: {
		url: string;
		payload: any;
		queryKey: string;
	};
}

export function useDelete({ useDelete, options, getData }: useDeleteInterface) {
	const { resultAlert } = useContext(AlertContext);
	const { showTimedAlert } = resultAlert;
	const confirmationModal = useConfirmationModal();
	const navigate = useNavigate();

	const { data: preData, isLoading } = useQuery({
		queryKey: [options.queryKey, options.payload.entryIds],
		queryFn: () => getData(options.payload.entryIds),
		retry: 0,
		staleTime: Infinity,
		refetchOnMount: false,
	});

	useEffect(() => {
		if (!preData?.success) {
			if (preData?.error) {
				console.error(preData?.full_error);
				if (preData?.error === "ECONNREFUSED") {
					showTimedAlert(
						"error",
						"Unable to connect to server. Please try again later."
					);
				}
				showTimedAlert("error", preData.error);
			}
		}
	}, [preData]);

	const mutation = useMutation({
		mutationFn: (payload) => useDelete(payload),
		onSuccess: (data: any) => {
			if (data && data.success) {
				showTimedAlert("success", data.message);
				navigate(options.url, { state: [] });
			} else {
				showTimedAlert("error", data.error);
			}
		},
		onError: (error) => {
			console.error(error);
			showTimedAlert("error", "An error occurred. Please try again later.");
		},
	});

	const verifyRoles = (entries: { id: string[] }) => {
		return entries.id.includes("ADMIN") || entries.id.includes("U5ER");
	};

	const verifyAccounts = (entries: { id: string[] }) => {
		console.log(entries.id);
		return entries.id.includes("4DM1N");
	};

	const handleDelete = async (type = "") => {
		if (type === "role") {
			if (verifyRoles(options.payload)) {
				showTimedAlert(
					"error",
					"Default roles (Admin and User) are reserved and cannot be deleted."
				);
				return;
			}
		}
		console.log(type);
		if (type === "account") {
			if (verifyAccounts(options.payload)) {
				showTimedAlert(
					"error",
					"Default account (Admin) is reserved and cannot be deleted."
				);
				return;
			}
		}
		const allow = await confirmationModal.showConfirmationModal();
		if (allow) {
			mutation.mutate(options.payload.id);
		}
	};

	return {
		handleDelete,
		resultAlert,
		confirmationModal,
		isLoading,
		isDeleting: mutation.isPending,
		preData,
	};
}
