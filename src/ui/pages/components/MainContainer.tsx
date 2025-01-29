import { Box, Container, Paper } from "@mui/material";
const MainContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<Container
			sx={{
				width: "100%",
				height: "100%",
				padding: "1rem",
				boxSizing: "border-box",
				position: "relative",
			}}
		>
			<Box
				component={Paper}
				elevation={0}
				sx={{
					position: "absolute",
					top: "0",
					bottom: "0.5rem",
					left: "0.5rem",
					right: "0.5rem",
					boxSizing: "border-box",
					padding: "1rem",
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
					border: "1px solid",
					borderColor: "divider",
				}}
			>
				{children}
			</Box>
		</Container>
	);
};
export default MainContainer;
