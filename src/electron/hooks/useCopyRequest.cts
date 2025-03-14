import { ipcMain } from "electron";
import useRequest, { getURL } from "../api/request_api.cjs";

ipcMain.handle("copy-via-access-number", async (_event, payload: GetPagedPayload) => {
	return await useRequest((await getURL()).API.COPIES.GET_BY_ACCESS, "POST", payload);
});

ipcMain.handle("copy-insert-multiple", async (_event, payload: InsertCopyPayload) => {
    return await useRequest((await getURL()).API.COPIES.CREATE, "POST", payload);
})
ipcMain.handle("copy-get-paged", async (_event, payload: GetPagedPayload) => {
    return await useRequest((await getURL()).API.COPIES.PAGED, "POST", payload);
});

ipcMain.handle("copy-get-by-id", async (_event, payload: RequestByID) => {
    return await useRequest((await getURL()).API.COPIES.GET_BY_ID, "POST", payload);
});

ipcMain.handle("copy-update", async (_event, payload: any) => {
    return await useRequest((await getURL()).API.COPIES.UPDATE, "POST", payload);
});

ipcMain.handle("copy-delete", async (_event, payload: { id: RequestByID }) => {
    return await useRequest((await getURL()).API.COPIES.DELETE, "POST", payload);
});

ipcMain.handle("copy-transaction", async (_event, payload: any) => {
    return await useRequest((await getURL()).API.COPIES.TRANSACTION, "POST", payload);
})