import { Box } from "@mui/material";
import { styled } from "@mui/system";

const CollapsibleCotainer = styled(Box)(() => ({
	display: "flex",
	gap: "1rem",
	padding: "1rem",
	border: "none",
	overflow: "hidden",
}));

export default CollapsibleCotainer;
