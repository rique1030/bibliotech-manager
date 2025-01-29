import { useMutation, useQuery } from "@tanstack/react-query";
import VerifyRequiredFields from "../helper/VerifyRequiredFields";
import { useNavigate } from "react-router-dom";
import { useConfirmationModal } from "../components/ConfirmationModal";
import { useContext, useEffect } from "react";
import { AlertContext } from "../context/AlertContext";
import { TableContext } from "../context/TableContext";

interface optionInterface {
	url: string;
	field: string[];
	payload: { entryIds: number[]; [key: string]: any };
	queryKey: string;
}

interface useUpdateInterface {
	updateData: (payload: any) => Promise<any>;
	getData: (payload: any) => Promise<any>;
	options: optionInterface;
}

export function useUpdate({
	updateData,
	getData,
	options,
}: useUpdateInterface) {
	const { resultAlert } = useContext(AlertContext);
	const {
		callNoFormatter: { verifyFormat },
	} = useContext(TableContext);
	const { showTimedAlert } = resultAlert;
	const confirmationModal = useConfirmationModal();
	const navigate = useNavigate();

	/**
	 * Initial data fetching
	 */

	const { data: preData } = useQuery({
		queryKey: [options.queryKey, options.payload.entryIds],
		queryFn: () => getData(options.payload.entryIds),
		retry: 0,
		staleTime: Infinity,
	});

	useEffect(() => {
		console.log(preData);
		if (!preData?.success) {
			if (preData?.error) {
				if (preData?.error === "ECONNREFUSED") {
					showTimedAlert(
						"error",
						"Unable to connect to server. Please try again later."
					);
				} else {
					console.error(preData.error);
				}
			}
		}
	}, [preData]);

	/**
	 * Mutation
	 */

	const mutation = useMutation({
		mutationFn: (payload) => updateData(payload),
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
			showTimedAlert(
				"error",
				"An error occurred." +
					"There might be a duplicate of one of the fields. " +
					"Please try again later."
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
		if (!verifyRoles(options.payload.entries)) {
			showTimedAlert(
				"error",
				"Default roles (Admin and User) are reserved and cannot be modified."
			);
			return;
		}
		const allow = await confirmationModal.showConfirmationModal();
		if (allow) {
			mutation.mutate(options.payload.entries);
		}
	};

	const verifyRoles = (entries: any[]) => {
		for (const entry of entries) {
			if (entry && entry.role_name) {
				const isNotValid =
					entry.role_name == "Admin" || entry.role_name == "User";
				if (isNotValid) {
					return false;
				}
			}
		}
		return true;
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

	return {
		handleUpdate,
		resultAlert,
		confirmationModal,
		isUpdating: mutation.isPending,
		preData,
	};
}
