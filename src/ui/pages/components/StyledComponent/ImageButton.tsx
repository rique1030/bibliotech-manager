import { BorderColor } from "@mui/icons-material";
import { Button, styled } from "@mui/material";

const ImageButton = styled(Button)(({ theme }) => ({
	position: "relative",
	"&:before": {
		content: '""',
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		backgroundSize: "cover",
		transition: "all 0.3s ease-in-out",
	},

	"&:hover": {
		"&:before": {
			opacity: 0.2,
		},
	},
}));

export default ImageButton;
