import React from "react";
import { Box, Typography, TextField, styled, Theme } from "@mui/material";
import PasswordTextField from "../../../components/PasswordTextField";
import LogoIcon from "../../../components/LogoIcon";
import { LoadingButton } from "@mui/lab";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { getRoute, routes } from "../../../Router";
import { validateEmail, validatePassword } from "../../../helper/Verify";
import { useAuth } from "../../../context/AuthProvider";

const LoginWrapper = styled(Box)(() => ({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	gap: "2rem",
	width: "45%",
	boxSizing: "border-box",
	padding: "2rem",
}));

const LoginLogoWrapper = styled(Box)(() => ({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	gap: "0.4rem",
}));

const LogoTitle = styled(Typography)(({ theme }: { theme: Theme }) => ({
	fontWeight: "bold",
	margin: 0,
	color: theme.palette.text.primary,
}));

const LoginTopPanelWrapper = styled(Box)(() => ({
	display: "flex",
	flexDirection: "column",
	gap: "1rem",
	justifyContent: "left",
	width: "100%",
	maxWidth: "25rem",
}));

const PanelContainer = styled(Box)(() => ({
	display: "flex",
	flexDirection: "column",
	gap: "2rem",
	width: "100%",
	maxWidth: "25rem",
}));

function LoginPanel() {
	return (
		<LoginWrapper>
			<LoginPanelTop />
			<LoginForm />
		</LoginWrapper>
	);
}

const LoginLogo = () => (
	<LoginLogoWrapper>
		<LogoIcon sx={{ width: "4rem", height: "4rem", color: "primary.main" }} />
		<LogoTitle variant="h5">Bibliotech</LogoTitle>
	</LoginLogoWrapper>
);

const LoginPanelTop = () => {
	return (
		<LoginTopPanelWrapper>
			<LoginLogo />
			<Typography
				variant="h4"
				sx={{ fontWeight: "bold", color: "text.primary" }}>
				Login to your account
			</Typography>
			<Typography sx={{ color: "text.secondary" }}>Welcome back!</Typography>
		</LoginTopPanelWrapper>
	);
};

const LoginForm = () => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [emailError, setEmailError] = React.useState(false);
	const [passwordError, setPasswordError] = React.useState(false);
	const [errorText, setErrorText] = React.useState("");
	const { login, errorMessage, loading } = useAuth();

	const handleLogin = async () => {
		const loginResult = await login(
			{ email, password },
			"/main/records/dashboard"
		);
		if (!loginResult) {
			setEmailError(true);
			setPasswordError(true);
			setErrorText(errorMessage);
			return;
		}
	};

	const onKeyDownEnter = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSubmit();
		}
	};

	const handleSubmit = () => {
		try {
			if (!validateEmail(email))
				throw {
					message: "Please enter a valid email address",
					email: true,
					password: false,
				};
			if (!validatePassword(password))
				throw {
					message: "Please enter a valid password",
					email: false,
					password: true,
				};
			setEmailError(false);
			setPasswordError(false);
			setErrorText("");
			handleLogin();
		} catch (e: any) {
			setErrorText(e.message);
			setEmailError(e.email);
			setPasswordError(e.password);
		}
	};

	const handleReset = () => {
		setEmailError(false);
		setPasswordError(false);
		setErrorText("");
	};

	return (
		<PanelContainer>
			<TextField
				disabled={loading}
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
				disabled={loading}
				error={passwordError}
				onChange={(e: any) => setPassword(e.target.value)}
				onKeyDown={(e: any) => onKeyDownEnter(e)}
				onInput={(e: any) => {
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
				}}>
				{errorText}
			</Typography>
			<LoadingButton
				loading={loading}
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
				}}>
				Login
			</LoadingButton>
		</PanelContainer>
	);
};

export default LoginPanel;
