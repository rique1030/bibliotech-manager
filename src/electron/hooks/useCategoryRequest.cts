import { ipcMain } from "electron";
import useRequest, { getURL } from "../api/request_api.cjs";

ipcMain.handle(
	"categories-insert-multiple",
	async (_event, payload: InsertCategoriesPayload) => {
		return await useRequest(
			(await getURL()).API.CATEGORIES.CREATE_MANY,
			"POST",
			payload
		);
	}
);

ipcMain.handle("categories-get-all", async () => {
	return await useRequest((await getURL()).API.CATEGORIES.GET_ALL, "GET");
});

ipcMain.handle(
	"categories-get-paged",
	async (_event, payload: GetPagedPayload) => {
		return await useRequest(
			(await getURL()).API.CATEGORIES.PAGED,
			"POST",
			payload
		);
	}
);

ipcMain.handle("categories-get-by-id", async (_event, payload: RequestByID) => {
	return await useRequest(
		(await getURL()).API.CATEGORIES.GET_BY_ID,
		"POST",
		payload
	);
});

ipcMain.handle(
	"categories-update",
	async (_event, payload: CategoryUpdatePayload) => {
		return await useRequest(
			(await getURL()).API.CATEGORIES.UPDATE,
			"POST",
			payload
		);
	}
);

ipcMain.handle(
	"categories-delete",
	async (_event, payload: { id: RequestByID }) => {
		return await useRequest(
			(await getURL()).API.CATEGORIES.DELETE,
			"POST",
			payload
		);
	}
);
