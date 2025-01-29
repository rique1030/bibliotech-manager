import axios from "axios";
import CONFIG from "../config.cjs";

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
	(url: string, method?: "GET" | "POST", payload?: any): Promise<Response>;
}

const useRequest: RequestInterface = async (
	url,
	method = "GET",
	payload = null
) => {
	let options: OptionsInterface = {
		method,
		url: CONFIG.SERVER_HOST + url,
		headers: { "Content-Type": "application/json" },
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
		return {
			data: null,
			success: false,
			error: error.code,
			message: null,
		};
	}
};

export default useRequest;
