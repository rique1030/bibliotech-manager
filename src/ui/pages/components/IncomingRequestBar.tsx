import { Snackbar, Alert, Button, Typography, Box } from "@mui/material";

export default function IncomingRequest({ requestHook }: { requestHook: any }) {
	const { incomingRequestOpen, hideIncomingRequest, handleReviewRequest } =
		requestHook;
	return (
		<Snackbar
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			open={incomingRequestOpen}
			onClose={hideIncomingRequest}
			autoHideDuration={10000}
			sx={{ "& .MuiAlert-icon": { alignItems: "center" } }}>
			<Alert
				severity="info"
				variant="filled"
				sx={{ position: "relative", overflow: "hidden" }}
				action={
					<Button color="inherit" size="small" onClick={handleReviewRequest}>
						<Typography variant="overline" sx={{ fontWeight: "bold" }}>
							View
						</Typography>
					</Button>
				}>
				<Typography variant="overline" sx={{ fontWeight: "bold" }}>
					Incoming request
				</Typography>
				<Box
					sx={{
						position: "absolute",
						height: "10px",
						backgroundColor: "rgba(0, 0, 0, 0.25)",
						bottom: 2,
						left: 2,
						right: 2,
						borderRadius: 10,
					}}>
					<Box
						sx={{
							height: "100%",
							backgroundColor: "white",
							borderRadius: 10,
							"@keyframes animate": {
								"0%": { width: "100%" },
								"100%": { width: "0%" },
							},
							animation: "animate 10s linear forwards",
						}}
					/>
				</Box>
			</Alert>
		</Snackbar>
	);
}