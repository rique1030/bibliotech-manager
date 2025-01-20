import { styled } from "@mui/system";
import { TextField, Theme } from "@mui/material";

const StyledDetailsTextfield = styled(TextField)(
	({ theme }: { theme?: Theme }) => ({
		"& .MuiFormLabel-root": {
			fontWeight: "bold",
			fontSize: "0.8rem",
		},

		"& input": {
			fontSize: "0.8rem",
			color: theme && theme.palette.text.secondary,
		},

		"& textarea": {
			fontSize: "0.8rem",
			color: theme && theme.palette.text.secondary,
		},

		"& .MuiOutlinedInput-root": {
			fontSize: "0.8rem",
		},
	})
);

export default StyledDetailsTextfield;
