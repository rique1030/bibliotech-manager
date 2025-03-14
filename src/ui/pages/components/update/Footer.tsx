import { Stack, Tooltip, Button } from "@mui/material";
import ConvertToLetterCase from "../../helper/ConvertToLetterCase";
import CallNumberDropdown from "../Table/Books/CallNumberDropdown";

interface UpdateFooterProps {
	length: number;
	handleGoback: () => void;
	handleUpdate: () => void;
	isUpdating: boolean;
	type: string;
	books?: boolean;
}

export default function UpdateFooter({
	length,
	handleGoback,
	handleUpdate,
	isUpdating,
	type,
	books,
}: UpdateFooterProps) {
	return (
		<Stack direction="row" justifyContent="flex-end" spacing={2}>
			{books && <CallNumberDropdown />}
			<Button
				onClick={() => handleGoback()}
				variant="contained"
				sx={{ height: "2rem" }}>
				Back
			</Button>
			<Tooltip
				placement="top"
				title={
					length
						? `Apply changes to ${type.toLowerCase()}s`
						: isUpdating
						? "Please wait..."
						: `Please add a/an ${type.toLowerCase()} entry`
				}>
				<span>
					<Button
						disabled={length === 0}
						onClick={handleUpdate}
						variant="contained"
						sx={{ height: "2rem" }}>
						Apply&nbsp;Changes
					</Button>
				</span>
			</Tooltip>
		</Stack>
	);
}
