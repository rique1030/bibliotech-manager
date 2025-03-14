import { Box } from "@mui/material";
import CollapsibleCotainer from "../../../StyledComponent/CollapsibleContainer";
import DetailsTextfield from "../../DetailsTextField";

const BooksDataCollapsible = ({
	row,
	edit,
}: {
	row: any;
	edit?: boolean;
}) => {
	return (
		<CollapsibleCotainer>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					gap: 2,
					width: "100%",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 2,
						width: "100%",
						// maxWidth: "40vw",
					}}
				>
					<DetailsTextfield
						disabled={!edit}
						label="Name"
						iniitialValue={row.name || ""}
						required
						rows={4}
						sx={{ maxWidth: "100%" }}
						slotProps={{ htmlInput: { maxLength: 255 } }}
						dataIndex={{ id: row.id || 0, key: "name" }}
					/>

					<DetailsTextfield
						disabled={!edit}
						label="Description"
						iniitialValue={row.description || ""}
						multiline
						rows={3}
						sx={{ maxWidth: "100%" }}
						slotProps={{ htmlInput: { maxLength: 255 } }}
						dataIndex={{ id: row.id || 0, key: "description" }}
					/>
				</Box>
			</Box>
		</CollapsibleCotainer>
	);
};

export default BooksDataCollapsible;
