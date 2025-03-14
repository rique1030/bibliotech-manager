import { app, BrowserWindow } from "electron";
import { isDev } from "./util.js";
import path from "path";
import { getPreloadPath } from "./pathResolver.js";
import { getWindowBounds, setWindowBounds } from "./storage/settings.cjs";
import "./hooks/useRoleRequest.cjs";
import "./hooks/useUserRequest.cjs";
import "./hooks/useBookRequest.cjs";
import "./hooks/useCategoryRequest.cjs";
import "./hooks/useRecordRequest.cjs";
import "./hooks/useCopyRequest.cjs";
import { initializeSocket } from "./hooks/useConnectToWebSocket.cjs";

let win: BrowserWindow;

const createWindow = () => {
	const bounds = getWindowBounds();
	win = new BrowserWindow({
		backgroundColor: "#121212",
		minWidth: 1024,
		minHeight: 720,
		width: bounds.windowSize[0],
		height: bounds.windowSize[1],
		hasShadow: true,
		titleBarStyle: "hiddenInset",
		center: true,
		autoHideMenuBar: true,
		webPreferences: {
			preload: getPreloadPath(),
			allowRunningInsecureContent: true,
			webSecurity: false,
			nodeIntegration: true,
		},
	});
	if (isDev()) {
		win.loadURL("http://localhost:5123");
	} else {
		win.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
	}

	win.on("resized", () => {
		const windowSize = win.getSize();
		setWindowBounds(windowSize);
	});
};

app.whenReady().then(() => {
	createWindow();
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

async function connectToSocket() {
	const socket = await initializeSocket();
	socket.on("request_borrow", (data) => {
		console.log("request_borrow", data);
		if (socket.connected) {
			win.webContents.send("request_borrow", data);
		}
		return "Request received";
	});
	socket.on("client_message", (data) => {
		if (socket.connected) {
			console.log("client_message", data);
			win.webContents.send("client_message", data);
		}
		return "Message received";
	});
	console.log("listenning", socket.hasListeners("request_borrow"));
}
connectToSocket().then(() =>{
	console.log("Socket connected");
})
