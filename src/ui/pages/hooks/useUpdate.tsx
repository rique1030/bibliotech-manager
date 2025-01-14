import { useMutation } from "@tanstack/react-query";
import VerifyRequiredFields from "../helper/VerifyRequiredFields";
import { useNavigate } from "react-router-dom";
import { useConfirmationModal } from "../components/ConfirmationModal";
import { useContext } from "react";
import { AlertContext } from "../context/AlertContext";
import { TableContext } from "../context/TableContext";

interface optionInterface {
	url: string;
	field: string[];
	payload: any;
}

interface useUpdateInterface {
	updateData: (payload: any) => Promise<any>;
	options: optionInterface;
}

export function useUpdate({ updateData, options }: useUpdateInterface) {
	const { resultAlert } = useContext(AlertContext);
	const {
		callNoFormatter: { verifyFormat },
	} = useContext(TableContext);
	const { showTimedAlert } = resultAlert;
	const confirmationModal = useConfirmationModal();
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: (payload) => updateData(payload),
		onSuccess: (data: any) => {
			console.log(data);
			if (data && data.success) {
				showTimedAlert("success", data.message);
				navigate(options.url, { state: [] });
			} else {
				showTimedAlert("error", data.error);
			}
		},

		onError: (error) => {
			console.log(error);
			showTimedAlert(
				"error",
				"An error occurred. There might be a duplicate of one of the fields. Please try again later."
			);
		},
	});
	

	const handleUpdate = async () => {
		if (!VerifyRequiredFields(options.field, options.payload.entries)) {
			showTimedAlert("error", "All fields are required");
			return;
		}
		if (!verifyBooks(options.payload.entries)) {
			showTimedAlert("error", "Call number is not in correct format");
			return;
		}
		const allow = await confirmationModal.showConfirmationModal();
		if (allow) {
			mutation.mutate(options.payload.entries);
		}
	};

	const verifyBooks = (entries: any[]) => {
		for (const entry of entries) {
			if (entry && entry.call_number) {
				const isValid = verifyFormat(entry.call_number);
				if (!isValid) {
					return false;
				}
			}
		}
		return true;
	};

	return { handleUpdate, resultAlert, confirmationModal };
}
