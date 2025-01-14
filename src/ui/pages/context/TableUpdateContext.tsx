import React, { createContext } from "react";

interface TableUpdateContextType {
	useupdate: {
		handleUpdate: () => Promise<void>;
		resultAlert: {
			showTimedAlert: (
				severity: "success" | "info" | "warning" | "error",
				message: string,
				duration?: number | undefined
			) => void;
			CustomAlert: () => JSX.Element;
		};

		confirmationModal: {
			showConfirmationModal: () => Promise<boolean>;
			ConfirmationModal: JSX.Element;
		};
	};
}

export const TableUpdateContext = createContext<TableUpdateContextType>({
	useupdate: {
		handleUpdate: () => Promise.resolve(),
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
