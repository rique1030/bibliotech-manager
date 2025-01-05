import { ipcMain } from "electron";
import useRequest from "../api/request_api.cjs";
import CONFIG from "../config.cjs";

ipcMain.handle(
	"categories-insert-multiple",
	async (event, payload: InsertCategoriesPayload) => {
		return await useRequest(
			CONFIG.URL.CATEGORY.INSERT_MULTIPLE,
			"POST",
			payload
		);
	}
);

ipcMain.handle("categories-get-all", async () => {
	return await useRequest(CONFIG.URL.CATEGORY.GET_ALL_CATEGORIES, "GET");
});

ipcMain.handle(
	"categories-get-paged",
	async (event, payload: GetPagedPayload) => {
		return await useRequest(
			CONFIG.URL.CATEGORY.GET_PAGED_CATEGORIES,
			"POST",
			payload
		);
	}
);

ipcMain.handle("categories-get-by-id", async (event, payload: RequestByID) => {
	return await useRequest(
		CONFIG.URL.CATEGORY.GET_CATEGORIES_BY_ID,
		"POST",
		payload
	);
});

ipcMain.handle("categories-update", async (event, payload: RequestByID) => {
	return await useRequest(
		CONFIG.URL.CATEGORY.UPDATE_CATEGORY,
		"POST",
		payload
	);
});

ipcMain.handle("categories-delete", async (event, payload: RequestByID) => {
	return await useRequest(
		CONFIG.URL.CATEGORY.DELETE_CATEGORY,
		"POST",
		payload
	);
});
