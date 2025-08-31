import type { Post } from "../shared/types/Post";
import { DEFAULT_PAGE_SIZE, POSTS_URL } from "../shared/utils/constants/services";
import { sendRequest } from "../shared/utils/httpRequests";

export const getPosts = (
	page: number,
	itemsPerPage: number = DEFAULT_PAGE_SIZE,
	sortBy: string = "createdAt",
	order: string = "desc"
): Promise<Post[]> =>
	sendRequest(`${POSTS_URL}?sortBy=${sortBy}&order=${order}&limit=${itemsPerPage}&page=${page}`);

export const getPost = (postId: string): Promise<Post | null> =>
	sendRequest(`${POSTS_URL}/${postId}`);

export const createPost = (post: Omit<Post, "id">): Promise<Post> =>
	sendRequest(POSTS_URL, "POST", post);

export const deletePost = (postId: string): Promise<Post> =>
	sendRequest(`${POSTS_URL}/${postId}`, "DELETE");

export const updatePost = (
	postId: string,
	newData: Partial<Post>
): Promise<Post> => sendRequest(`${POSTS_URL}/${postId}`, "PUT", newData);
