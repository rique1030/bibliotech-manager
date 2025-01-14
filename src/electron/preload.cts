// const electron = require("electron");
import electron from "electron";
import { ipcRenderer } from "electron";

electron.contextBridge.exposeInMainWorld("requestRole", {
	insertMultiple: async (payload: InsertRolesPayload) => {
		return await ipcRenderer.invoke("roles-insert-multiple", payload);
	},

	getAll: async () => {
		return await ipcRenderer.invoke("roles-get-all");
	},

	getPaged: async (payload: GetPagedPayload) => {
		return await ipcRenderer.invoke("roles-get-paged", payload);
	},

	getByID: async (payload: RequestByID) => {
		return await ipcRenderer.invoke("roles-get-by-id", payload);
	},

	update: async (payload: RequestByID) => {
		return await ipcRenderer.invoke("roles-update", payload);
	},

	delete: async (payload: RequestByID) => {
		return await ipcRenderer.invoke("roles-delete", payload);
	},
});

electron.contextBridge.exposeInMainWorld("requestUser", {
	insertMultiple: async (payload: InsertUsersPayload) => {
		return await ipcRenderer.invoke("users-insert-multiple", payload);
	},

	getPaged: async (payload: GetPagedPayload) => {
		return await ipcRenderer.invoke("users-get-paged", payload);
	},

	getByID: async (payload: RequestByID) => {
		return await ipcRenderer.invoke("users-get-by-id", payload);
	},

	login: async (payload: UserLoginPayload) => {
		return await ipcRenderer.invoke("users-login", payload);
	},

	update: async (payload: RequestByID) => {
		return await ipcRenderer.invoke("users-update", payload);
	},

	delete: async (payload: RequestByID) => {
		return await ipcRenderer.invoke("users-delete", payload);
	},
});

electron.contextBridge.exposeInMainWorld("requestBook", {
	insertMultiple: async (payload: InsertBooksPayload) => {
		return await ipcRenderer.invoke("books-insert-multiple", payload);
	},

	getPaged: async (payload: GetPagedPayload) => {
		return await ipcRenderer.invoke("books-get-paged", payload);
	},

	getByID: async (payload: RequestByID) => {
		return await ipcRenderer.invoke("books-get-by-id", payload);
	},

	getByAccessNumber: async (payload: RequestByID) => {
		return await ipcRenderer.invoke("books-get-by-access-number", payload);
	},

	update: async (payload: RequestByID) => {
		return await ipcRenderer.invoke("books-update", payload);
	},

	delete: async (payload: RequestByID) => {
		return await ipcRenderer.invoke("books-delete", payload);
	},
});

electron.contextBridge.exposeInMainWorld("requestCategory", {
	insertMultiple: async (payload: InsertCategoriesPayload) => {
		return await ipcRenderer.invoke("categories-insert-multiple", payload);
	},

	getPaged: async (payload: GetPagedPayload) => {
		return await ipcRenderer.invoke("categories-get-paged", payload);
	},

	getAll: async () => {
		return await ipcRenderer.invoke("categories-get-all");
	},

	getByID: async (payload: RequestByID) => {
		return await ipcRenderer.invoke("categories-get-by-id", payload);
	},

	update: async (payload: RequestByID) => {
		return await ipcRenderer.invoke("categories-update", payload);
	},

	delete: async (payload: RequestByID) => {
		return await ipcRenderer.invoke("categories-delete", payload);
	},
});

electron.contextBridge.exposeInMainWorld("storedSettings", {
	getFormatIndex: async () => {
		return await ipcRenderer.invoke("get-format-index");
	},

	setFormatIndex: async (index: number) => {
		return await ipcRenderer.invoke("set-format-index", index);
	},
});

electron.contextBridge.exposeInMainWorld("nodeApi", {
	Buffer: Buffer,
});
