import { Box, Skeleton } from "@mui/material";
import CollapsibleCotainer from "../../../../books/StyledComponent/CollapsibleContainer";
import CoverAndStatusContainer from "./CoverAndStatusContainer";
import TopDescriptionContainer from "./TopDescriptionContainer";
import DetailsContainer from "../../../../books/StyledComponent/DetailsContainer";
import DetailsTextfield from "./DetailsTextField";

const BooksDataCollapsible = ({
	row,
	isEditable,
}: {
	row: booksRowsInterface | BookPayload;
	isEditable?: boolean;
}) => {
	return (
		<CollapsibleCotainer>
			<CoverAndStatusContainer edit={isEditable} row={row} />
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 2,
					width: "100%",
				}}
			>
				<TopDescriptionContainer row={row} isEditable={isEditable} />
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 2,
						width: "100%",
					}}
				>
					<DetailsContainer>
						<DetailsTextfield
							disabled={!isEditable}
							size="small"
							label="Description"
							iniitialValue={row.description || ""}
							required={false}
							multiline
							rows={4}
							sx={{ maxWidth: "50%" }}
							slotProps={{ htmlInput: { maxLength: 255 } }}
							dataIndex={{ id: row.id || 0, key: "description" }}
						/>
						<Skeleton variant="rectangular" sx={{ width: "50%", height: 80 }} />
					</DetailsContainer>
				</Box>
			</Box>
		</CollapsibleCotainer>
	);
};

export default BooksDataCollapsible;
