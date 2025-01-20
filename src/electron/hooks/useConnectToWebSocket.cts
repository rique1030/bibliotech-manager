import { ipcMain } from "electron";
import { io, Socket } from "socket.io-client";
import { store } from "../storage/settings.cjs";
// import { mainWindow } from "../main.js";
import CONFIG from "../config.cjs";

const socket: Socket = io(CONFIG.SERVER_HOST, { autoConnect: false });

/**
 * send message on log in
 */
socket.on("connect", async () => {
	if (socket.connected) {
		const account = await store.get("account");
		socket.emit("client_connect", account);
	}
	return "Connected to server";
});

/**
 * send message on log out
 */

socket.on("disconnect", () => {
	if (socket.connected) {
		console.log("Disconnecting websocket from server");
		socket.send("Hello Flask Server");
	}
	return "Disconnected from server";
});

/**
 * receive request from server
 */
ipcMain.handle("connect-to-websocket", async () => {
	socket.connect();
	console.log("Connecting to server");
});

ipcMain.handle("disconnect-from-websocket", async () => {
	socket.disconnect();
	console.log("Disconnecting from server");
});
/**
 * send request to server
 */
ipcMain.handle("review-request", async (_event, request_id) => {
	if (socket.connected) {
		socket.emit("review_request", request_id);
	}
});

ipcMain.handle("accept-request", async (_event, payload) => {
	if (socket.connected) {
		socket.emit("accept_request", payload);
	}
});

ipcMain.handle("deny-request", async (_event, request_id) => {
	if (socket.connected) {
		socket.emit("deny_request", request_id);
	}
});

export { socket };
