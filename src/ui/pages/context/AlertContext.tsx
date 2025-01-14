import { createContext } from "react";
import useResultAlert from "../hooks/useResultAlert";

interface AlertContextType {
	resultAlert: {
		showTimedAlert: (
			severity: "success" | "info" | "warning" | "error",
			message: string,
			duration?: number
		) => void;
		CustomAlert: () => JSX.Element;
	};
}

export const AlertContext = createContext<AlertContextType>({
	resultAlert: {
		showTimedAlert: () => {},
		CustomAlert: () => <></>,
	},
});

export function AlertContextProvider({ children }: any) {
	const resultAlert = useResultAlert();
	const { CustomAlert } = resultAlert;
	return (
		<AlertContext.Provider value={{ resultAlert }}>
			<CustomAlert />
			{children}
		</AlertContext.Provider>
	);
}
