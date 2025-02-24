import { createContext } from "react";

interface TableDeleteContextType {
	handleDelete: (type?: string) => Promise<void>;
	resultAlert: {
		showTimedAlert: (
			severity: "success" | "info" | "warning" | "error",
			message: string,
			duration?: number
		) => void;
	};
	confirmationModal: {
		showConfirmationModal: () => Promise<boolean>;
		ConfirmationModal: JSX.Element;
	};
	isDeleting: boolean;
	preData: any;
}

export const TableDeleteContext = createContext<TableDeleteContextType>({
	handleDelete: async () => {},
	resultAlert: {
		showTimedAlert: async () => {},
	},
	confirmationModal: {
		showConfirmationModal: async () => false,
		ConfirmationModal: <></>,
	},
	isDeleting: false,
	preData: [],
});
