import {
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

const PasswordTextField = ({ error, ...props }: any) => {
	const [showPassword, setShowPassword] = useState(false);
	const handleShowPassword = () => setShowPassword(!showPassword);
	return (
		<FormControl
			sx={{ width: "100%", maxWidth: "25rem",
			"& .MuiInputBase-root": { fontSize: "0.8rem !important" }, }}
			size="small"
			variant="outlined"
			error={error}
		>
			<InputLabel
				sx={{ fontSize: "0.8rem !important", 

					fontWeight: "bold" }}
				htmlFor="outlined-adornment-password"
			>
			Password
			</InputLabel>
			<OutlinedInput
				sx={{
					"&:hover": { cursor: "pointer" },
					color: "text.primary",

				}}
				size="small"
				type={showPassword ? "text" : "password"}
				id="outlined-adornment-password"
				autoComplete="current-password"
				{...props}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label={
								showPassword ? "hide the password" : "display the password"
							}
							onClick={handleShowPassword}
							edge="end"
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
				label="Password"
			/>
		</FormControl>
	);
};
export default PasswordTextField;
