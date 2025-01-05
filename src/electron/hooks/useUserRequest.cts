import { ipcMain } from "electron";
import useRequest from "../api/request_api.cjs";
import CONFIG from "../config.cjs";

ipcMain.handle(
	"users-insert-multiple",
	async (event, payload: InsertUsersPayload) => {
		return await useRequest(
			CONFIG.URL.USER.INSERT_MULTIPLE,
			"POST",
			payload
		);
	}
);

ipcMain.handle("users-get-paged", async (event, payload: GetPagedPayload) => {
	return await useRequest(CONFIG.URL.USER.GET_PAGED_USERS, "POST", payload);
});

ipcMain.handle("users-get-by-id", async (event, payload: RequestByID) => {
	return await useRequest(CONFIG.URL.USER.GET_USERS_BY_ID, "POST", payload);
});

ipcMain.handle("users-login", async (event, payload: UserLoginPayload) => {
	return await useRequest(
		CONFIG.URL.USER.GET_USER_BY_EMAIL_AND_PASSWORD,
		"POST",
		payload
	);
});

ipcMain.handle("users-update", async (event, payload: RequestByID) => {
	return await useRequest(CONFIG.URL.USER.UPDATE_USER, "POST", payload);
});

ipcMain.handle("users-delete", async (event, payload: RequestByID) => {
	return await useRequest(CONFIG.URL.USER.DELETE_USER, "POST", payload);
});
