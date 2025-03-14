import { ipcMain } from "electron";
import useRequest, { getURL } from "../api/request_api.cjs";


ipcMain.handle( "books-insert-multiple",
	async (_event, payload: InsertBooksPayload) => {
		return await useRequest(
			(await getURL()).API.BOOKS.CREATE_MANY,
			"POST",
			payload
		);
	}
);

ipcMain.handle("books-get-paged", async (_event, payload: GetPagedPayload) => {
	return await useRequest((await getURL()).API.BOOKS.PAGED, "POST", payload);
});

ipcMain.handle("books-get-by-id", async (_event, payload: RequestByID) => {
	return await useRequest((await getURL()).API.BOOKS.GET_BY_ID, "POST", payload);
});

ipcMain.handle("books-update", async (_event, payload: BookUpdatePayload) => {
	return await useRequest((await getURL()).API.BOOKS.UPDATE, "POST", payload);
});

ipcMain.handle("books-delete", async (_event, payload: { id: RequestByID }) => {
	return await useRequest((await getURL()).API.BOOKS.DELETE, "POST", payload);
});

