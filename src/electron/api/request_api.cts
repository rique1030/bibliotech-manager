import axios from "axios";
import { ipcMain } from "electron";

let config: any = null;
const URL_FETCH_INTERVAL_SECONDS = 60 * 5 // 5 minutes
const JSON_URL = "https://api.jsonbin.io/v3/b/67d3aeda8561e97a50eba309" // JSON bin URL

interface Response {
	data: any;
	error: any;
	message: any;
}

interface OptionsInterface {
	method: "GET" | "POST";
	url: string;
	headers: {
		"Content-Type": string;
	};
	data: any;
}

interface RequestInterface {
	(
		url: string,
		method?: "GET" | "POST",
		payload?: any,
		header?: any
	): Promise<Response>;
}


export const getURL = async () => {
	if (!config) {
		let options: OptionsInterface = {
			method: "GET",
			url: JSON_URL,
			headers: { "Content-Type": "application/json" },
			data: undefined,
		};
		try {
			const response: Response = await axios(options);
			config = Object.freeze(response.data.record.data);
		} catch {
			console.error("failed to fetch server url");
			return null;
		}
		setInterval(async () => {
			try {
				const response: Response = await axios(options);
				console.log(response);
				config = Object.freeze(response.data.record.data);
			} catch {
				console.error("failed to fetch server url");
			}
		}, 1000 * URL_FETCH_INTERVAL_SECONDS);
	}
	return config;
};

ipcMain.handle("getURL", async () => {
	return await getURL();
});


const useRequest: RequestInterface = async (
	url,
	method = "GET",
	payload = null,
	header = null
) => {
	const options = {
		method,
		url: (await getURL())?.HOST + url,
		headers: header || { "Content-Type": "application/json" },
		data: method === "POST" ? payload : null,
	};
	try {
		const response: Response = await axios(options);
		return {
			data: response.data?.data || null,
			success: response.data?.success || false,
			error: response.data?.error || null,
			message: response.data?.message || null,
		};
	} catch (error: any) {
		console.error(error);
		return {
			data: null,
			success: false,
			error: error.code,
			full_error: error,
			message: null,
		};
	}
};

export default useRequest;
