import { ipcMain } from "electron";
import { io, Socket } from "socket.io-client";
import { store } from "../storage/settings.cjs";
import {getURL} from "../api/request_api.cjs";

let socket : Socket | null = null

async function initializeSocket() {
	if (socket) return socket;
	const CONFIG = await getURL();
	socket = io(CONFIG.HOST, { autoConnect: false });
	socket.on("connect", async () => {
		console.log("init", socket?.connected);
		if (socket?.connected) {
			const account = await store.get("account");
			console.log("Sending mount_connection");
			socket.emit("mount_connection", account);
		}
		return "Connected to server";
	});
	socket.on("disconnect", () => {
		if (socket?.connected) {
			console.log("Disconnected from server");
			socket.emit("unmount_connection");
		}
		return "Disconnected from server";
	});	
	console.log(socket.hasListeners("connect"), socket.hasListeners("disconnect"));
	return socket;
}
initializeSocket();

ipcMain.handle("connect-to-websocket", async () => {
	if (!socket) await initializeSocket();
	socket?.connect();
	console.log("Connecting to server");
});

ipcMain.handle("disconnect-from-websocket", async () => {
	socket?.disconnect();
	console.log("Disconnecting from server");
});

ipcMain.handle("review-request", async (_event, request_id) => {
	if (socket?.connected) {
		socket.emit("review_request", request_id);
	}
});

ipcMain.handle("respond-request", async (_event, payload) => {
	if (socket?.connected) {
		socket.emit("request_response", payload);
	}
});

export { socket, initializeSocket };
