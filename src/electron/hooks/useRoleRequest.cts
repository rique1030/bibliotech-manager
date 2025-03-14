import { ipcMain } from "electron";
import useRequest, { getURL } from "../api/request_api.cjs";

ipcMain.handle(
	"roles-insert-multiple",
	async (_event, payload: InsertRolesPayload) => {
		return await useRequest((await getURL()).API.ROLES.CREATE_MANY, "POST", payload);
	}
);

ipcMain.handle("roles-get-all", async () => {
	return await useRequest((await getURL()).API.ROLES.GET_ALL, "GET");
});

ipcMain.handle("roles-get-paged", async (_event, payload: GetPagedPayload) => {
	return await useRequest((await getURL()).API.ROLES.PAGED, "POST", payload);
});

ipcMain.handle("roles-get-by-id", async (_event, payload: RequestByID) => {
	return await useRequest((await getURL()).API.ROLES.GET_BY_ID, "POST", payload);
});

ipcMain.handle("roles-update", async (_event, payload: RoleUpdatePayload) => {
	return await useRequest((await getURL()).API.ROLES.UPDATE, "POST", payload);
});

ipcMain.handle("roles-delete", async (_event, payload: { id: RequestByID }) => {
	return await useRequest((await getURL()).API.ROLES.DELETE, "POST", payload);
});
