import { createContext } from "react";

interface TableDeleteContextType {
	handleDelete: () => Promise<void>;
	resultAlert: {
		showTimedAlert: (
			severity: "success" | "info" | "warning" | "error",
			message: string,
			duration?: number
		) => void;
		CustomAlert: () => JSX.Element;
	};
	confirmationModal: {
		showConfirmationModal: () => Promise<boolean>;
		ConfirmationModal: JSX.Element;
	};
}

export const TableDeleteContext = createContext<TableDeleteContextType>({
	handleDelete: async () => {},
	resultAlert: {
		showTimedAlert: async () => {},
		CustomAlert: () => <></>,
	},
	confirmationModal: {
		showConfirmationModal: async () => false,
		ConfirmationModal: <></>,
	},
});
