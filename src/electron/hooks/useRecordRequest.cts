import { ipcMain } from "electron";
import useRequest, { getURL } from "../api/request_api.cjs";

ipcMain.handle(
	"book-count-get-paged",
	async (_event, payload: GetPagedPayload) => {
		return await useRequest(
			(await getURL()).API.RECORDS.BOOK_COUNTS,
			"POST",
			payload
		);
	}
);

ipcMain.handle(
	"book-borrow-get-paged",
	async (_event, payload: GetPagedPayload) => {
		return await useRequest(
			(await getURL()).API.RECORDS.BORROWED,
			"POST",
			payload
		);
	}
);

ipcMain.handle(
	"book-category-count-get-paged",
	async (_event, payload: GetPagedPayload) => {
		return await useRequest(
			(await getURL()).API.RECORDS.CATEGORY_COUNTS,
			"POST",
			payload
		);
	}
);


ipcMain.handle(
	"user-count",
	async (_event) => {
		return await useRequest(
			(await getURL()).API.RECORDS.USER_COUNT,
			"GET"
		);
	}
);

ipcMain.handle(
	"role-count",
	async (_event) => {
		return await useRequest(
			(await getURL()).API.RECORDS.ROLE_COUNT,
			"GET"
		);
	}
);

ipcMain.handle(
	"book-count",
	async (_event) => {
		return await useRequest(
			(await getURL()).API.RECORDS.BOOK_COUNT,
			"GET"
		);
	}
);
