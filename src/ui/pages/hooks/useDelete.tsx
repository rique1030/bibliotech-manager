import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useConfirmationModal } from "../components/ConfirmationModal";

import { useContext } from "react";
import { AlertContext } from "../context/AlertContext";

interface useDeleteInterface {
	useDelete: (payload: any) => Promise<any>;
	options: {
		url: string;
		payload: any;
	};
}

export function useDelete({ useDelete, options }: useDeleteInterface) {
	const { resultAlert } = useContext(AlertContext);
	const { showTimedAlert } = resultAlert;
	const confirmationModal = useConfirmationModal();
	const navigate = useNavigate();

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

	const verifyRoles = (entries: { id: number[] }) => {
		return entries.id.includes(1) || entries.id.includes(2);
	};

	const verifyAccounts = (entries: { id: number[] }) => {
		return entries.id.includes(1);
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
			mutation.mutate(options.payload);
		}
	};

	return { handleDelete, resultAlert, confirmationModal };
}
