import { ipcMain } from "electron";
import useRequest from "../api/request_api.cjs";
import CONFIG from "../config.cjs";

ipcMain.handle(
	"books-insert-multiple",
	async (event, payload: InsertBooksPayload) => {
		return await useRequest(
			CONFIG.URL.CATALOG.INSERT_MULTIPLE,
			"POST",
			payload
		);
	}
);

ipcMain.handle("books-get-paged", async (event, payload: GetPagedPayload) => {
	return await useRequest(CONFIG.URL.CATALOG.GET_PAGED_BOOKS, "POST", payload);
});

ipcMain.handle("books-get-by-id", async (event, payload: RequestByID) => {
	return await useRequest(CONFIG.URL.CATALOG.GET_BOOKS_BY_ID, "POST", payload);
});

ipcMain.handle("books-update", async (event, payload: BookUpdatePayload) => {
	return await useRequest(CONFIG.URL.CATALOG.UPDATE_BOOK, "POST", payload);
});

ipcMain.handle("books-delete", async (event, payload: { id: RequestByID }) => {
	return await useRequest(CONFIG.URL.CATALOG.DELETE_BOOK, "POST", payload);
});
