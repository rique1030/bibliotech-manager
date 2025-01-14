import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import ReactQueryProvider from "./pages/hooks/useReactQuery";
import lightTheme from "./pages/themes/LightTheme";
import darkTheme from "./pages/themes/DarkTheme";

import router from "./pages/Router";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AlertContextProvider } from "./pages/context/AlertContext";
import { useContext } from "react";

function App() {
	return (
		<ReactQueryProvider>
			<ThemeProvider theme={darkTheme}>
				<AlertContextProvider>
					<RouterProvider router={router} />
				</AlertContextProvider>
			</ThemeProvider>
		</ReactQueryProvider>
	);
}

export default App;
