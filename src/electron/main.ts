import { app, BrowserWindow, session } from "electron";
import { isDev } from "./util.js";
import path from "path";
import { getPreloadPath } from "./pathResolver.js";
import "./hooks/useRoleRequest.cjs";
import "./hooks/useUserRequest.cjs";
import "./hooks/useBookRequest.cjs";
import "./hooks/useCategoryRequest.cjs";
import { getWindowBounds, setWindowBounds } from "./storage/settings.cjs";

const createWindow = () => {
	const bounds = getWindowBounds();
	const win = new BrowserWindow({
		minWidth: 1000,
		minHeight: 600,
		width: bounds.windowSize[0],
		height: bounds.windowSize[1],
		hasShadow: true,
		titleBarStyle: "hiddenInset",
		center: true,
		autoHideMenuBar: true,
		webPreferences: {
			preload: getPreloadPath(),
			nodeIntegration: true,
		},
	});
	/*
	 * Load the react app
	 * If the app is in development mode, load the app from the development server
	 * Otherwise, load the app from the built files
	 */
	if (isDev()) {
		win.loadURL("http://localhost:5123");
	} else {
		win.removeMenu(); // Remove the default menu
		win.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
	}

	win.on("resized", () => {
		const windowSize = win.getSize();
		setWindowBounds(windowSize);
	});
};

/*
 * Create the window when the app is ready
 * If all windows are closed, quit the app
 */
app.whenReady().then(() => {
	createWindow();
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

/*
 * Quit the app when all windows are closed
 */
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
