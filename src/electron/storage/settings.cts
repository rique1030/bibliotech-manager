import { ipcMain } from "electron";
import Store from "electron-store";

export const store = new Store();

export function getWindowBounds(): {
	windowSize: number[];
} {
	const defaultSize = [800, 600];
	const windowSize: number[] =
		(store.get("windowSize") as number[]) || defaultSize;
	store.set("windowSize", windowSize);
	return { windowSize };
}

export function setWindowBounds(windowSize: number[]) {
	store.set("windowSize", windowSize);
}

ipcMain.handle("get-format-index", async () => {
	const formatIndex = await store.get("defaultFormatter");
	if (formatIndex === undefined) {
		store.set("defaultFormatter", 0);
		console.error("formatIndex is null");
		return 0;
	}
	return formatIndex;
});

ipcMain.handle("set-format-index", async (event, index: number) => {
	store.set("defaultFormatter", index);
	const keys = store;
	return "ok";
});



ipcMain.handle("save-account", async (event, account: accountType) => {
	const storeAccount = await store.get("account");
	if (storeAccount === undefined) {
		store.set("account", account);
	}
	return "Account saved";
});

ipcMain.handle("get-account", async () => {
	return await store.get("account");
});

ipcMain.handle("delete-account", async () => {
	await store.delete("account");
	return "Account deleted";
});

