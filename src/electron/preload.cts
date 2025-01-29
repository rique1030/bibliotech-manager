// const electron = require("electron");
import { get } from "axios";
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

	getAccount: async () => {
		return await ipcRenderer.invoke("get-account");
	},

	saveAccount: async (account: accountType) => {
		return await ipcRenderer.invoke("save-account", account);
	},

	deleteAccount: async () => {
		return await ipcRenderer.invoke("delete-account");
	},

	saveTheme: async (theme: string) => {
		return await ipcRenderer.invoke("save-theme", theme);
	},

	getTheme: async () => {
		return await ipcRenderer.invoke("get-theme");
	},
});

electron.contextBridge.exposeInMainWorld("requestRecord", {
	getBookCount: async (payload: GetPagedPayload) => {
		return await ipcRenderer.invoke("book-count-get-paged", payload);
	},

	getBorrowedBooks: async (payload: GetPagedPayload) => {
		return await ipcRenderer.invoke("book-borrow-get-paged", payload);
	},

	getUserRecords: async (payload: GetPagedPayload) => {
		return await ipcRenderer.invoke("user-records-get-paged", payload);
	},

	getBookCategoryCount: async (payload: GetPagedPayload) => {
		return await ipcRenderer.invoke("book-category-count-get-paged", payload);
	},
});

electron.contextBridge.exposeInMainWorld("nodeApi", {
	Buffer: Buffer,
});

electron.contextBridge.exposeInMainWorld("webSocket", {
	connect: async () => {
		return await ipcRenderer.invoke("connect-to-websocket");
	},

	disconnect: async () => {
		return await ipcRenderer.invoke("disconnect-from-websocket");
	},

	reviewRequest: async (request_id: any) => {
		return await ipcRenderer.invoke("review-request", request_id);
	},

	denyRequest: async (request_id: any) => {
		return await ipcRenderer.invoke("deny-request", request_id);
	},

	acceptRequest: async (payload: any) => {
		return await ipcRenderer.invoke("accept-request", payload);
	},
});

electron.contextBridge.exposeInMainWorld("electron", {
	on: (channel: string, func: any) => {
		ipcRenderer.on(channel, (event: any, ...args: any[]) =>
			func(event, ...args)
		);
	},
});
