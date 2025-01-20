import { Box, Container, Paper } from "@mui/material";
const MainContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<Container
			sx={{
				width: "100%",
				height: "100%",
				padding: "1rem",
				boxSizing: "border-box",
			}}
		>
			<Box
				component={Paper}
				elevation={0}
				sx={{
					width: "100%",
					height: "100%",
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
