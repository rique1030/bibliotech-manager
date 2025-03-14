import { useMutation } from "@tanstack/react-query";
import { useConfirmationModal } from "../components/ConfirmationModal";
import VerifyRequiredFields from "../helper/VerifyRequiredFields";
import { useContext } from "react";
import { TableContext } from "../context/TableContext";
import { AlertContext } from "../context/AlertContext";

export function useInsert({ insertData, options }: any) {
	const { resultAlert } = useContext(AlertContext);
	const {
		rowData: { setRows },
	} = useContext(TableContext);
	const { showTimedAlert } = resultAlert;
	const confirmationModal = useConfirmationModal();

	const mutation = useMutation({
		mutationFn: (payload) => insertData(payload),
		onSuccess: (data: any) => {
			if (data && data.success) {
				showTimedAlert("success", data.message);
				setRows([]);
			} else {
				showTimedAlert("error", data.error);
			}
		},
		onError: (error) => {
			console.error(error);
			showTimedAlert(
				"error",
				error?.message || "An error occurred. Please try again later."
			);
		},
	});

	const CleanInsertCopy = (payload: any) => {
		if (!payload) return [];
		if (!payload[0].hasOwnProperty("catalog_id")) return payload;
		return payload.map((entry: any) => {
			return Object.entries(entry).reduce(
				(acc, [key, value]) =>
					key !== "title" && key !== "author" ? { ...acc, [key]: value } : acc,
				{} as any
			);
		});
	};

	const handleInsert = async () => {
		console.log(options.payload.entries);
		if (!VerifyRequiredFields(options.field, options.payload.entries)) {
			showTimedAlert("error", "All fields are required");
			return;
		}
		const allow = await confirmationModal.showConfirmationModal();
		if (allow) {
			const newPayload = CleanInsertCopy(options.payload.entries);
			const filteredPayload = newPayload.map((entry: any) =>
				Object.entries(entry).reduce(
					(acc, [key, value]) =>
						!key.includes("blob") ? { ...acc, [key]: value } : acc,
					{} as any
				)
			);
			mutation.mutate(JSON.parse(JSON.stringify(filteredPayload)));
		}
	};
	return {
		handleInsert,
		resultAlert,
		confirmationModal,
		isInserting: mutation.isPending,
	};
}
