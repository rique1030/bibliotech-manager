import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider, useLocation } from "react-router-dom";
import ReactQueryProvider from "./pages/hooks/useReactQuery";

import router from "./pages/Router";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AlertContextProvider } from "./pages/context/AlertContext";
import CropperModalProvider from "./pages/components/CropperModal";
import { createContext, useEffect } from "react";
import useTheme from "./pages/hooks/useTheme";
import lightTheme from "./pages/themes/LightTheme";
import { AuthProvider } from "./pages/context/AuthProvider";

export const AppContext = createContext({
	theme: lightTheme,
	toggleTheme: () => {},
});

function App() {
	const { theme, toggleTheme } = useTheme();

	return (
		<ReactQueryProvider>
			<ThemeProvider theme={theme}>
				<AppContext.Provider value={{ theme, toggleTheme }}>
					<AlertContextProvider>
						<CropperModalProvider>
							<RouterProvider router={router} />
						</CropperModalProvider>
					</AlertContextProvider>
				</AppContext.Provider>
			</ThemeProvider>
		</ReactQueryProvider>
	);
}

export default App;
