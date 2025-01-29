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
		};

		confirmationModal: {
			showConfirmationModal: () => Promise<boolean>;
			ConfirmationModal: JSX.Element;
		};
		isUpdating: boolean;
		preData: any;
	};
	// availableRoles: any[];
}

export const TableUpdateContext = createContext<TableUpdateContextType>({
	useupdate: {
		handleUpdate: () => Promise.resolve(),
		resultAlert: {
			showTimedAlert: () => {},
		},

		confirmationModal: {
			showConfirmationModal: () => Promise.resolve(false),
			ConfirmationModal: <></>,
		},
		isUpdating: false,
		preData: [],
	},
	// availableRoles: [],
});
