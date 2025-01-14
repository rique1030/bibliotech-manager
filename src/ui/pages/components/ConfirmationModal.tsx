import { useRef, useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";
function useConfirmationModal() {
	const [error, setError] = useState<boolean>(false);
	const [open, setOpen] = useState(false);
	const promiseResolver = useRef<(result: boolean) => void>();
	const focuseRef = useRef<HTMLInputElement>(null);

	const showConfirmationModal = (): Promise<boolean> => {
		return new Promise((resolve) => {
			promiseResolver.current = resolve;
			setOpen(true);
			setTimeout(() => focuseRef.current?.focus(), 100);
		});
	};

	const handleClose = () => {
		setOpen(false);
		promiseResolver.current?.(false);
	};

	const handleSubmit = () => {
		if (focuseRef.current?.value.toLowerCase() === "bibliotech") {
			setError(false);
			promiseResolver.current?.(true);
			setOpen(false);
		} else {
			setError(true);
		}
	};

	const ConfirmationModal = (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Update</DialogTitle>
			<DialogContent sx={{ width: "300px", pb: 0 }}>
				<TextField
					inputRef={focuseRef}
					// onBlur={(e) => setValue(e.target.value)}
					size="small"
					helperText={error ? "Invalid input, try again" : ""}
					placeholder="Type 'Bibliotech' to confirm"
					variant="standard"
					error={error}
					fullWidth
					// onChange={(e) => setValue(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							handleSubmit();
						}
					}}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleSubmit}>Confirm</Button>
			</DialogActions>
		</Dialog>
	);

	return {
		showConfirmationModal,
		ConfirmationModal,
	};
}

export { useConfirmationModal };
