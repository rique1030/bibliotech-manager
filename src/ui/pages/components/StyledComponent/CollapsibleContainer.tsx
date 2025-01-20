import { Box } from "@mui/material";
import { alpha, styled } from "@mui/system";

const CollapsibleCotainer = styled(Box)(({ theme }) => ({
	display: "flex",
	gap: "1rem",
	padding: "1rem",
	overflow: "hidden",
	// backgroundColor: alpha("#000", 0.1),
	border: "1px solid",
	borderLeft: 0,
	borderRight: 0,
	borderColor: theme.palette.divider,
}));

export default CollapsibleCotainer;
