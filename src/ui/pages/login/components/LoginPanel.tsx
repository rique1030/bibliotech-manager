import React from "react";
import { Box, Typography, TextField } from "@mui/material";
import PasswordTextField from "../../components/PasswordTextField";
import { useNavigate } from "react-router-dom";
import LogoIcon from "../../components/LogoIcon";
import { useMutation } from "@tanstack/react-query";
import { LoadingButton } from "@mui/lab";
import LoginIcon from "@mui/icons-material/Login";

function LoginPanel() {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				gap: "2rem",
				width: "45%",
				boxSizing: "border-box",
				padding: "2rem",
			}}
		>
			<LoginPanelTop />
			<LoginForm />
		</Box>
	);
}

export default LoginPanel;

const LoginLogo = () => (
	<Box
		sx={{
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			gap: "0.4rem",
		}}
	>
		<LogoIcon
			sx={{ width: "4rem", height: "4rem", color: "primary.main" }}
		/>
		<Typography
			variant="h5"
			sx={{ fontWeight: "bold", margin: 0, color: "text.primary" }}
		>
			Bibliotech
		</Typography>
	</Box>
);

const LoginPanelTop = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: "1rem",
				justifyContent: "left",
				width: "100%",
				maxWidth: "25rem",
			}}
		>
			<LoginLogo />
			<Typography
				variant="h4"
				sx={{ fontWeight: "bold", color: "text.primary" }}
			>
				Login to your account
			</Typography>
			<Typography sx={{ color: "text.secondary" }}>
				Welcome back!
			</Typography>
		</Box>
	);
};

const fetchData = async (payload: UserLoginPayload): Promise<any> => {
	return await window.requestUser.login(payload);
};

const LoginForm = () => {
	// State for email and password
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	// State for password visibility
	const [showPassword, setShowPassword] = React.useState(false);
	const handleShowPassword = () => setShowPassword(!showPassword);
	// State for error handling
	const [emailError, setEmailError] = React.useState(false);
	const [passwordError, setPasswordError] = React.useState(false);
	const [errorText, setErrorText] = React.useState("");
	const navigate = useNavigate();
	const mutation = useMutation({
		mutationFn: (payload: UserLoginPayload) => fetchData(payload),
		onSuccess: (data) => {
			console.log(JSON.stringify(data.data, null, 2));
			if (data && data.data) {
				navigate("/main/");
			} else {
				setEmailError(true);
				setPasswordError(true);
				setErrorText("Invalid email or password");
			}
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const handleLogin = () => {
		const payload: UserLoginPayload = {
			email,
			password,
		};
		console.log(payload);
		mutation.mutate(payload);
	};

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	const handleMouseUpPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	const onKeyDownEnter = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSubmit();
		}
	};

	const handleSubmit = () => {
		const emailIsValid =
			!!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(email);
		const passwordIsValid = !!password;
		if (!emailIsValid) {
			setEmailError(true);
			setErrorText("Please enter a valid email address");
		} else if (!passwordIsValid) {
			setPasswordError(true);
			setErrorText("Please enter a valid password");
		} else {
			setEmailError(false);
			setPasswordError(false);
			setErrorText("");
		}
		if (emailIsValid && passwordIsValid) {
			// Handle form submission
			handleLogin();
			//navigate("/main/");
		}
	};

	const handleReset = () => {
		setEmailError(false);
		setPasswordError(false);
		setErrorText("");
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: "2rem",
				width: "100%",
				maxWidth: "25rem",
			}}
		>
			<TextField
				error={emailError}
				id="login-email"
				label="Email"
				size="small"
				style={{
					boxSizing: "border-box",
					width: "100%",
					maxWidth: "25rem",
				}}
				onChange={(e) => setEmail(e.target.value)}
				onKeyDown={(e) => onKeyDownEnter(e)}
				onInput={(e) => {
					if ((e.target as HTMLInputElement).value === "") {
						handleReset();
					}
				}}
			/>

			<PasswordTextField
				error={passwordError}
				showPassword={showPassword}
				handleShowPassword={handleShowPassword}
				handleMouseDownPassword={handleMouseDownPassword}
				handleMouseUpPassword={handleMouseUpPassword}
				setPassword={setPassword}
				onKeyDown={(e) => onKeyDownEnter(e)}
				onInput={(e) => {
					if ((e.target as HTMLInputElement).value === "") {
						handleReset();
					}
				}}
			/>
			<Typography
				variant="body2"
				sx={{
					color: "error.main",
					margin: 0,
					padding: 0,
					height: "0.8rem",
					fontSize: "0.8rem",
				}}
			>
				{errorText}
			</Typography>
			<LoadingButton
				loading={mutation.isPending}
				loadingPosition="start"
				startIcon={<LoginIcon />}
				variant="outlined"
				sx={{
					width: "100%",
					maxWidth: "25rem",
					"&:focus": {
						outline: "none",
					},
				}}
				onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
					event.currentTarget.blur();
					handleSubmit();
				}}
			>
				Login
			</LoadingButton>
		</Box>
	);
};
