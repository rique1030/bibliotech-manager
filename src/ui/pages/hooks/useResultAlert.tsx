import { Snackbar, Alert, SnackbarCloseReason } from "@mui/material";
import { useState } from "react";
function useResultAlert() {
	interface AlertProps {
		severity: "success" | "info" | "warning" | "error";
	}
	const [alertOpen, setAlertOpen] = useState(false);
	const [duration, setDuration] = useState(3000);
	const [alertMessage, setAlertMessage] = useState("");
	const [severity, setSeverity] = useState<AlertProps["severity"]>("info");

	const showTimedAlert = (
		severity: AlertProps["severity"],
		message: string,
		duration?: number
	) => {
		setAlertMessage(message);
		setSeverity(severity);
		setDuration(duration || 3000);
		setAlertOpen(true);
	};

	const handleClose = (
		event: React.SyntheticEvent | Event,
		reason?: SnackbarCloseReason
	) => {
		if (reason === "clickaway") return;
		setAlertOpen(false);
	};

	return {
		showTimedAlert,
		alertOpen,
		handleClose,
		severity,
		alertMessage,
		duration,
	};
}

export const CustomAlert = ({
	open,
	onClose,
	alertMessage,
	severity,
	duration,
}: {
	open: boolean;
	onClose: (
		event: React.SyntheticEvent | Event,
		reason?: SnackbarCloseReason
	) => void;
	alertMessage: string;
	severity: "success" | "info" | "warning" | "error";
	duration?: number;
}) => {
	return (
		<Snackbar
			anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
			open={open}
			autoHideDuration={duration}
			onClose={onClose}
		>
			<Alert severity={severity} onClose={onClose} variant="filled">
				{alertMessage}
			</Alert>
		</Snackbar>
	);
};

export default useResultAlert;
