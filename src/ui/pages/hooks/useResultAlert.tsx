import { Snackbar, Alert, SnackbarCloseReason } from "@mui/material";
import { useEffect, useState } from "react";
import sound from "../../assets/sounds/notification-18-270129.mp3";

function useResultAlert() {
	interface AlertProps {
		severity: "success" | "info" | "warning" | "error";
	}
	const [alertOpen, setAlertOpen] = useState(false);
	const [duration, setDuration] = useState(3000);
	const [alertMessage, setAlertMessage] = useState("");
	const [severity, setSeverity] = useState<AlertProps["severity"]>("info");
	const sound = new Audio(
		new URL(
			"../../assets/sounds/notification-18-270129.mp3",
			import.meta.url
		).href
	);

	const showTimedAlert = (
		severity: AlertProps["severity"],
		message: string,
		duration?: number
	) => {
		setAlertMessage(message);
		setSeverity(severity);
		setDuration(duration || 3000);
		setAlertOpen(true);
		// const audio = new Audio(sound);
		sound.play().catch((err: any) => console.error("Playback error:", err));
		// const notifAudio = new Audio(
		// 	new URL("../../assets/sounds/notification.mp3", import.meta.url).href
		// );
		// notifAudio.onload = () => notifAudio.play();
	};

	const handleClose = (
		event: React.SyntheticEvent | Event,
		reason?: SnackbarCloseReason
	) => {
		if (reason === "clickaway") return;
		setAlertOpen(false);
	};

	useEffect(() => {
		window.electron.on("client_message", (_event, data) => {
			console.log("client_message", data);
			if (typeof data === "string" && data.includes("denied"))
				showTimedAlert("error", data, 5000);
			if (typeof data === "string" && data.includes("expired"))
				showTimedAlert("error", data, 5000);
			if (typeof data === "string" && data.includes("approved"))
				showTimedAlert("success", data, 5000);
		});
	});

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
			onClose={onClose}>
			<Alert severity={severity} onClose={onClose} variant="filled">
				{alertMessage}
			</Alert>
		</Snackbar>
	);
};

export default useResultAlert;
