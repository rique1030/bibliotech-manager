import {
	Alert,
	Box,
	Button,
	Snackbar,
	SnackbarCloseReason,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import DrawerPanel from "./DrawerPanel";
import TableContextProvider from "../context/TableContextProvider";
import ConfirmBorrow from "../components/BorrowingModal";

function useRequestModal() {
	const [incomingRequestOpen, setIncomingRequestOpen] =
		useState<boolean>(false);
	const [requestModalOpen, setRequestModalOpen] = useState<boolean>(false);
	const [data, setData] = useState<any>({});
	const [error, setError] = useState<boolean>(false);
	const [days, setDays] = useState<number>(1);

	const hideIncomingRequest = (_e: any, reason: SnackbarCloseReason) => {
		if (reason === "clickaway") return;
		setIncomingRequestOpen(false);
		if (!requestModalOpen) {
			setData({});
		}
	};

	const handleBorrowDeny = async () => {
		setRequestModalOpen(false);
		await window.webSocket.denyRequest({ request_id: data.request_id });
		setData({});
	};

	const handleBorrowAccept = async () => {
		const numDays = Number(days);
		if (isNaN(numDays) || numDays < 1) {
			setError(true);
			return;
		}
		await window.webSocket.acceptRequest({
			request_id: data.request_id,
			num_days: numDays,
		});
		setError(false);
		setRequestModalOpen(false);
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
			setData(data);
			console.log(data);
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
		handleBorrowDeny,
		handleBorrowAccept,
	};
}

function IncomingRequest({ requestHook }: { requestHook: any }) {
	const { incomingRequestOpen, hideIncomingRequest, handleReviewRequest } =
		requestHook;
	return (
		<Snackbar
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			open={incomingRequestOpen}
			onClose={hideIncomingRequest}
			autoHideDuration={5000}
		>
			<Alert
				severity="info"
				variant="filled"
				action={
					<Button color="inherit" onClick={handleReviewRequest}>
						View
					</Button>
				}
			>
				Incoming request...
			</Alert>
		</Snackbar>
	);
}

function MainWindow() {
	const requestModal = useRequestModal();
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "end",
				width: "100vw",
				height: "100vh",
				backgroundColor: "background.default",
			}}
		>
			<IncomingRequest requestHook={requestModal} />
			<ConfirmBorrow requestHook={requestModal} />
			<DrawerPanel />
			<TableContextProvider>
				<Box sx={{ width: "100%", height: "100%" }}>
					<Outlet />
				</Box>
			</TableContextProvider>
		</Box>
	);
}

export default MainWindow;
