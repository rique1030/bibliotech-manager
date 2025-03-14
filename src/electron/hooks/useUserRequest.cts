import { ipcMain } from "electron";
import useRequest, { getURL } from "../api/request_api.cjs";

ipcMain.handle(
	"users-insert-multiple",
	async (_event, payload: InsertUsersPayload) => {
		return await useRequest((await getURL()).API.USERS.CREATE, "POST", payload);
	}
);

ipcMain.handle("users-get-paged", async (_event, payload: GetPagedPayload) => {
	return await useRequest((await getURL()).API.USERS.PAGED, "POST", payload);
});

ipcMain.handle("users-get-by-id", async (_event, payload: RequestByID) => {
	return await useRequest((await getURL()).API.USERS.GET_BY_ID, "POST", payload);
});

ipcMain.handle("users-login", async (_event, payload: UserLoginPayload) => {
	return await useRequest(
		(await getURL()).API.USERS.GET_LOGIN,
		"POST",
		payload
	);
});

ipcMain.handle("users-update", async (_event, payload: UserUpdatePayload) => {
	return await useRequest((await getURL()).API.USERS.UPDATE, "POST", payload);
});

ipcMain.handle("users-delete", async (_event, payload: { id: RequestByID }) => {
	return await useRequest((await getURL()).API.USERS.DELETE, "POST", payload);
});
