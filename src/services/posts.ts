import type { Post } from "../shared/interfaces/Post";
import { POSTS_URL } from "../shared/utils/constants/constants";
import { sendRequest } from "../shared/utils/httpRequests";

export const getPosts = (): Promise<Post[]> => sendRequest(POSTS_URL);

export const getPost = (postId: string): Promise<Post> =>
	sendRequest(`${POSTS_URL}/${postId}`);

export const deletePost = (postId: string): Promise<Post> =>
	sendRequest(`${POSTS_URL}/${postId}`, "DELETE");

export const updatePost = (
	postId: string,
	newData: Partial<Post>
): Promise<Post> => sendRequest(`${POSTS_URL}/${postId}`, "PUT", newData);

export const createPost = (post: Partial<Post>): Promise<Post> =>
	sendRequest(POSTS_URL, "POST", post);
