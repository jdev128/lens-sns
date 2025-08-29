import { VALID_HTTP_METHODS } from "./constants/services";

export const sendRequest = async (
	url: string,
	method: string = "GET",
	body?: any
): Promise<any> => {
	if (!VALID_HTTP_METHODS.includes(method)) {
		throw new Error("Unsupported HTTP method");
	}
	return fetch(url, {
		method,
		headers: {
			"content-type": "application/json",
		},
		body: body ? JSON.stringify(body) : undefined,
	}).then((response) => {
		if (!response.ok) {
			return Promise.resolve(null)
		}
		return response.json();
	});
};
