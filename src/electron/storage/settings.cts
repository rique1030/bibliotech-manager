import { ipcMain } from "electron";
import Store from "electron-store";

const store = new Store();

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
	//console.log("get-format-index");
	const formatIndex = await store.get("defaultFormatter");
	if (formatIndex === undefined) {
		store.set("defaultFormatter", 0);
		console.error("formatIndex is null");
		return 0;
	}
	return formatIndex;
});

ipcMain.handle("set-format-index", async (event, index: number) => {
	//console.log("set-format-index", index);
	store.set("defaultFormatter", index);
	const keys = store;
	console.log(keys);
	return "ok";
});
