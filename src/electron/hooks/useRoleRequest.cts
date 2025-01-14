import { ipcMain } from "electron";
import useRequest from "../api/request_api.cjs";
import CONFIG from "../config.cjs";

ipcMain.handle(
	"roles-insert-multiple",
	async (event, payload: InsertRolesPayload) => {
		return await useRequest(CONFIG.URL.ROLE.INSERT_MULTIPLE, "POST", payload);
	}
);

ipcMain.handle("roles-get-all", async () => {
	return await useRequest(CONFIG.URL.ROLE.GET_ALL_ROLES, "GET");
});

ipcMain.handle("roles-get-paged", async (event, payload: GetPagedPayload) => {
	return await useRequest(CONFIG.URL.ROLE.GET_PAGED_ROLES, "POST", payload);
});

ipcMain.handle("roles-get-by-id", async (event, payload: RequestByID) => {
	return await useRequest(CONFIG.URL.ROLE.GET_ROLES_BY_ID, "POST", payload);
});

ipcMain.handle("roles-update", async (event, payload: RoleUpdatePayload) => {
	return await useRequest(CONFIG.URL.ROLE.UPDATE_ROLE, "POST", payload);
});

ipcMain.handle("roles-delete", async (event, payload: { id: RequestByID }) => {
	return await useRequest(CONFIG.URL.ROLE.DELETE_ROLE, "POST", payload);
});
