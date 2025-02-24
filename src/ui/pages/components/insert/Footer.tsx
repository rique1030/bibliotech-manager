import { Stack, Tooltip, Button } from "@mui/material";
import ConverToLetterCase from "../../helper/ConvertToLetterCase";
import CallNumberDropdown from "../Table/Books/CallNumberDropdown";

interface InsertFooterProps {
	length: number;
	handleAddEntry: () => void;
	handleInsert: () => void;
	isInserting: boolean;
	type: string;
	books?: boolean;
}

export default function InsertFooter({
	length,
	handleAddEntry,
	handleInsert,
	isInserting,
	type,
	books,
}: InsertFooterProps) {
	return (
		<Stack direction="row" justifyContent="flex-end" spacing={2}>
			{books && <CallNumberDropdown />}
			<Tooltip placement="top" title={`Add a new ${type.toLowerCase()} entry`}>
				<span>
					<Button
						sx={{ height: "2rem" }}
						onClick={handleAddEntry}
						variant="contained"
					>
						New&nbsp;{ConverToLetterCase(type)}&nbsp;Entry
					</Button>
				</span>
			</Tooltip>
			<Tooltip
				placement="top"
				title={
					length
						? `Submit all ${type.toLowerCase()} entries`
						: isInserting
						? "Please wait..."
						: `Please add a/an ${type.toLowerCase()} entry`
				}
			>
				<span>
					<Button
						disabled={length === 0}
						onClick={handleInsert}
						variant="contained"
						sx={{ height: "2rem" }}
					>
						Submit&nbsp;{ConverToLetterCase(type)}&nbsp;Entries
					</Button>
				</span>
			</Tooltip>
		</Stack>
	);
}
