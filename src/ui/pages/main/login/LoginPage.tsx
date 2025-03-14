import LoginPanel from "./components/LoginPanel";
import { Box, LinearProgress, styled } from "@mui/material";
import DisplayPanel from "./components/DisplayPanel";

const RootStyle = {
	display: "flex",
	flexDirection: "row",
	justifyContent: "center",
	alignItems: "center",
	height: "100vh",
	width: "100vw",
	backgroundColor: "background.default",
	"@keyframes fadeIn": {
		from: { opacity: 0 },
		to: { opacity: 1 },
	},
	animation: "fadeIn 0.3s ease-out",
};

import LogoIcon from "../../components/LogoIcon";
import { useAuth } from "../../context/AuthProvider";
import { useEffect, useState } from "react";

function LoginPage() {
	const { login } = useAuth();
	const [doLogin, setDoLogin] = useState(false);

	useEffect(() => {
		window.storedSettings.getAccount().then((user: any) => {
			console.log(user);
			if (user) {
				if (!user.email || !user.password) {
					setDoLogin(true);
					console.log("No stored account");
					return;
				}
				login(
					{ email: user.email, password: user.password },
					"/main/records/dashboard"
				).then((result) => {
					if (result) {
						setTimeout(() => {
							setDoLogin(true);
						}, 3000);
					}
				});
			} else {
				setTimeout(() => {
					setDoLogin(true);
				}, 3000);
			}
		});
	}, []);

	const LoadingPanel = (
		<Box
			sx={{
				backgroundColor: "background.default",
				height: "100vh",
				width: "100vw",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				gap: "2rem",
			}}>
			<LogoIcon sx={{ width: "6rem", height: "6rem", color: "primary.main" }} />
			<LinearProgress sx={{ width: "6rem", borderRadius: "0.5rem" }} />
		</Box>
	);

	const Login = (
		<Box component="form" noValidate autoComplete="off" sx={RootStyle}>
			<LoginPanel />
			<DisplayPanel />
		</Box>
	);
	return doLogin ? Login : LoadingPanel;
}

export default LoginPage;
