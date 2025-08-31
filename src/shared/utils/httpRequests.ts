import { VALID_HTTP_METHODS } from "./constants/services";

export const sendRequest = async (
	url: string,
	method: string = "GET",
	body?: any
): Promise<any> => {
	if (!VALID_HTTP_METHODS.includes(method)) {
		throw new Error("Unsupported HTTP method");
	}
	try {
		const response = await fetch(url, {
			method,
			headers: {
				"content-type": "application/json",
			},
			body: body ? JSON.stringify(body) : undefined,
		});
		if (!response.ok) {
			return Promise.resolve(null);
		}
		return response.json();
	} catch (error) {
		console.error(
			`Ocurrio el siguiente error al procesar la solicitud ${method} ${url}`,
			error
		);
		Promise.reject(error);
	}
};
