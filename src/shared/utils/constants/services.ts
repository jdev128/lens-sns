export const POSTS_URL =
	import.meta.env.VITE_BACKEND_BASE_URL +
	import.meta.env.VITE_BACKEND_POSTS_ENDPOINT;

export const POST_ID_PLACEHOLDER = "POST_ID";

export const POST_COMMENTS_URL =
	`${POSTS_URL}/${POST_ID_PLACEHOLDER}` +
	import.meta.env.VITE_BACKEND_COMMENTS_ENDPOINT;

export const VALID_HTTP_METHODS: ReadonlyArray<string> = [
	"GET",
	"POST",
	"PUT",
	"PATCH",
	"DELETE",
];

export const DEFAULT_PAGE_SIZE = 5;