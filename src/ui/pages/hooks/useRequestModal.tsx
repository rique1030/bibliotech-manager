import { SnackbarCloseReason } from "@mui/material";
import { useState, useEffect } from "react";

export default function useRequestModal() {
	const [incomingRequestOpen, setIncomingRequestOpen] =
		useState<boolean>(false);
	const [requestModalOpen, setRequestModalOpen] = useState<boolean>(false);
	const [data, setData] = useState<any>({
		request_id: 0,
		book_id: 0,
		account_id: 0,
		account_name: "",
	});
	const [error, setError] = useState<boolean>(false);
	const [days, setDays] = useState<number>(1);
	const sound = new Audio(
		new URL(
			"../../assets/sounds/notification-18-270129.mp3",
			import.meta.url
		).href
	);
	const hideIncomingRequest = (_e: any, reason: SnackbarCloseReason) => {
		if (reason === "clickaway") return;
		setIncomingRequestOpen(false);
		if (!requestModalOpen) {
			setData({});
		}
	};

	const handleRequestResponse = async (responseData: any) => {
		if (!responseData) return;
		if (responseData.borrow && responseData.approved) {
			if (
				!responseData.num_days ||
				isNaN(responseData.num_days) ||
				responseData.num_days < 1
			) {
				setError(true);
				return;
			}
		}
		await window.webSocket.respondRequest(responseData);
		setRequestModalOpen(false);
		setData({});
	};

	const handleReviewRequest = async () => {
		await window.webSocket.reviewRequest({
			request_id: data.request_id,
		});
		setIncomingRequestOpen(false);
		setRequestModalOpen(true);
	};

	useEffect(() => {
		window.electron.on("request_borrow", (_event, data) => {
			sound.play().catch((err: any) => console.error("Playback error:", err));
			setData(data);
			setIncomingRequestOpen(true);
		});
	}, []);

	return {
		data,
		dayState: { days, setDays },
		error,
		incomingRequestOpen,
		requestModalOpen,
		hideIncomingRequest,
		handleReviewRequest,
		handleRequestResponse,
		// handleBorrowDeny,
		// handleBorrowAccept,
	};
}
