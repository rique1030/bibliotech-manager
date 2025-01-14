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
			CustomAlert: () => JSX.Element;
		};
		confirmationModal: {
			showConfirmationModal: () => Promise<boolean>;
			ConfirmationModal: JSX.Element;
		};
	};
}

export const TableInsertContext = createContext<TableInsertContextType>({
	useinsert: {
		handleInsert: () => Promise.resolve(),
		resultAlert: {
			showTimedAlert: () => {},
			CustomAlert: () => <></>,
		},
		confirmationModal: {
			showConfirmationModal: () => Promise.resolve(false),
			ConfirmationModal: <></>,
		},
	},
});
