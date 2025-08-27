import type { Comment } from "../shared/types/Comment";
import {
	POST_COMMENTS_URL,
	POST_ID_PLACEHOLDER,
} from "../shared/utils/constants/services";
import { sendRequest } from "../shared/utils/httpRequests";

const buildPostCommentsURL = (postId: string) =>
	POST_COMMENTS_URL.replace(POST_ID_PLACEHOLDER, postId);

const getLinkedComment = (
	comment: Partial<Comment>,
	postId: string,
	parentCommentId: string | null
): Partial<Comment> => {
	return { ...comment, postId, parentId: parentCommentId };
};

export const getCommentsFromPost = (
	postId: string,
	sortBy: string = "createdAt",
	order: string = "desc"
): Promise<Comment[]> =>
	sendRequest(
		`${buildPostCommentsURL(postId)}?sortBy=${sortBy}&order=${order}`
	);

export const createComment = (
	postId: string,
	data: Partial<Comment>,
	parentCommentId?: string
): Promise<Comment> =>
	sendRequest(
		buildPostCommentsURL(postId),
		"POST",
		getLinkedComment(data, postId, parentCommentId ?? null)
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
