import type { Comment } from "../shared/types/Comment";
import {
	POST_COMMENTS_URL,
	POST_ID_PLACEHOLDER,
} from "../shared/utils/constants/services";
import { sendRequest } from "../shared/utils/httpRequests";

const buildPostCommentsURL = (postId: string) =>
	POST_COMMENTS_URL.replace(POST_ID_PLACEHOLDER, postId);

export const getCommentsFromPost = (
	postId: string,
	parentCommentId: string | null = null,
	sortBy: string = "createdAt",
	order: string = "desc",
): Promise<Comment[] | null> =>
	sendRequest(
		`${buildPostCommentsURL(postId)}?sortBy=${sortBy}&order=${order}&parentId=${parentCommentId}`
	);

export const createComment = (
	data: Omit<Comment, "id">
): Promise<Comment> =>
	sendRequest(
		buildPostCommentsURL(data.postId),
		"POST",
		data
	);

export const deleteCommentFromPost = (
	postId: string,
	commentId: string
): Promise<Comment> =>
	sendRequest(`${buildPostCommentsURL(postId)}/${commentId}`, "DELETE");

export const updateCommentFromPost = (
	postId: string,
	commentId: string,
	newData: Partial<Comment>
): Promise<Comment> =>
	sendRequest(`${buildPostCommentsURL(postId)}/${commentId}`, "PUT", newData);
