import { createContext } from "react";
import useResultAlert, { CustomAlert } from "../hooks/useResultAlert";

interface AlertContextType {
	resultAlert: {
		showTimedAlert: (
			severity: "success" | "info" | "warning" | "error",
			message: string,
			duration?: number
		) => void;
	};
}

export const AlertContext = createContext<AlertContextType>({
	resultAlert: {
		showTimedAlert: () => {},
	},
});

export function AlertContextProvider({ children }: any) {
	const resultAlert = useResultAlert();
	const {
		alertOpen,
		handleClose,
		severity,
		alertMessage,
		duration,
	} = resultAlert;
	return (
		<AlertContext.Provider value={{ resultAlert }}>
			<CustomAlert
				alertMessage={alertMessage}
				duration={duration}
				open={alertOpen}
				onClose={handleClose}
				severity={severity}
			/>
			{children}
		</AlertContext.Provider>
	);
}
