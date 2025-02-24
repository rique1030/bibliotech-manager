import { createContext } from "react";

interface TableInsertContextType {
	useinsert: {
		handleInsert: () => Promise<void>;
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
		isInserting: boolean;
	};
	availableRoles?: any[];
}

export const TableInsertContext = createContext<TableInsertContextType>({
	useinsert: {
		handleInsert: () => Promise.resolve(),
		resultAlert: {
			showTimedAlert: () => {},
		},
		confirmationModal: {
			showConfirmationModal: () => Promise.resolve(false),
			ConfirmationModal: <></>,
		},
		isInserting: false,
	},
	availableRoles: [],
});
