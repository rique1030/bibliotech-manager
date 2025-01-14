import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useConfirmationModal } from "../components/ConfirmationModal";

import useResultAlert from "./useResultAlert";
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
	// const resultAlert = useResultAlert();
	const { resultAlert } = useContext(AlertContext);
	const { showTimedAlert } = resultAlert;
	const confirmationModal = useConfirmationModal();
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: (payload) => useDelete(payload),
		onSuccess: (data: any) => {
			console.log(data.success);
			if (data && data.success) {
				showTimedAlert("success", data.message);
				navigate(options.url, { state: [] });
			} else {
				showTimedAlert("error", data.error);
			}
		},

		onError: (error) => {
			console.log(error);
			showTimedAlert("error", "An error occurred. Please try again later.");
		},
	});

	const handleDelete = async () => {
		const allow = await confirmationModal.showConfirmationModal();
		if (allow) {
			mutation.mutate(options.payload);
		}
	};

	return { handleDelete, resultAlert, confirmationModal };
}
