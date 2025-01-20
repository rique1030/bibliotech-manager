import { ipcMain } from "electron";
import useRequest from "../api/request_api.cjs";
import CONFIG from "../config.cjs";

ipcMain.handle(
	"book-count-get-paged",
	async (event, payload: GetPagedPayload) => {
		return await useRequest(
			CONFIG.URL.RECORDS.GET_PAGED_BOOK_COPIES,
			"POST",
			payload
		);
	}
);

ipcMain.handle(
	"book-borrow-get-paged",
	async (event, payload: GetPagedPayload) => {
		return await useRequest(
			CONFIG.URL.RECORDS.GET_BORROWED_BOOKS,
			"POST",
			payload
		);
	}
);

ipcMain.handle(
	"user-records-get-paged",
	async (event, payload: GetPagedPayload) => {
		return await useRequest(
			CONFIG.URL.RECORDS.GET_USER_RECORDS,
			"POST",
			payload
		);
	}
);

ipcMain.handle(
	"book-category-count-get-paged",
	async (event, payload: GetPagedPayload) => {
		return await useRequest(
			CONFIG.URL.RECORDS.GET_BOOK_CATEGORY_COUNT,
			"POST",
			payload
		);
	}
);
