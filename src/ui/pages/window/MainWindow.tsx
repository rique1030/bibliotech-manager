import { Box } from "@mui/material";
import DrawerPanel from "./DrawerPanel";
import { Outlet } from "react-router-dom";
import TableContextProvider from "../context/TableContextProvider";

function MainWindow() {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "end",
				width: "100vw",
				height: "100vh",
				backgroundColor: "background.default",
			}}
		>
			<DrawerPanel />
			<TableContextProvider>
				<Box sx={{ width: "100%", height: "100%" }}>
					<Outlet />
				</Box>
			</TableContextProvider>
		</Box>
	);
}

export default MainWindow;
