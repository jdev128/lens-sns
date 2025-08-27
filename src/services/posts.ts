import type { Post } from "../shared/types/Post";
import { POSTS_URL } from "../shared/utils/constants/services";
import { sendRequest } from "../shared/utils/httpRequests";

export const getPosts = (
	sortBy: string = "createdAt",
	order: string = "desc"
): Promise<Post[]> =>
	sendRequest(`${POSTS_URL}?sortBy=${sortBy}&order=${order}`);

export const getPost = (postId: string): Promise<Post> =>
	sendRequest(`${POSTS_URL}/${postId}`);

export const createPost = (post: Partial<Post>): Promise<Post> =>
	sendRequest(POSTS_URL, "POST", post);

export const deletePost = (postId: string): Promise<Post> =>
	sendRequest(`${POSTS_URL}/${postId}`, "DELETE");

export const updatePost = (
	postId: string,
	newData: Partial<Post>
): Promise<Post> => sendRequest(`${POSTS_URL}/${postId}`, "PUT", newData);
