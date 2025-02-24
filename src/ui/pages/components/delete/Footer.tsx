import { Stack, Tooltip, Button } from "@mui/material";

interface DeleteFooterProps {
	length: number;
	handleGoback: () => void;
	handleDelete: (type?: string) => void;
	isDeleting: boolean;
	type: string;
	books?: boolean;
}

export default function DeleteFooter({
	length,
	handleGoback,
	handleDelete,
	isDeleting,
	type,
}: DeleteFooterProps) {
	return (
		<Stack direction="row" justifyContent="flex-end" spacing={2}>
			<Button
				onClick={() => handleGoback()}
				variant="contained"
				sx={{ height: "2rem" }}
			>
				Back
			</Button>
			<Tooltip
				placement="top"
				title={
					length
						? `Remove ${type.toLowerCase()}s`
						: isDeleting
						? "Please wait..."
						: `Please add a/an ${type.toLowerCase()} entry`
				}
			>
				<span>
					<Button
						disabled={length === 0}
						onClick={() => handleDelete(type)}
						variant="contained"
						sx={{ height: "2rem" }}
					>
						Delete&nbsp;{type}s
					</Button>
				</span>
			</Tooltip>
		</Stack>
	);
}
