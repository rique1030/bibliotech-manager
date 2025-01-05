import { app, BrowserWindow } from "electron";
import { isDev } from "./util.js";
import path from "path";
import { getPreloadPath } from "./pathResolver.js";
import "./hooks/useRoleRequest.cjs";
import "./hooks/useUserRequest.cjs";
import "./hooks/useBookRequest.cjs";
import "./hooks/useCategoryRequest.cjs";

const createWindow = () => {
	const win = new BrowserWindow({
		minWidth: 800,
		minHeight: 600,
		width: 1000,
		height: 600,
		hasShadow: true,
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
