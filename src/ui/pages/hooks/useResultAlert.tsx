import { Snackbar, Alert, SnackbarCloseReason } from "@mui/material";
import { useMemo, useState } from "react";
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

	const CustomAlert = () => {
		return (
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				open={alertOpen}
				autoHideDuration={duration}
				onClose={handleClose}
			>
				<Alert severity={severity} variant="filled" onClose={handleClose}>
					{alertMessage}
				</Alert>
			</Snackbar>
		);
	};

	return {
		showTimedAlert,
		CustomAlert,
	};
}

export default useResultAlert;
