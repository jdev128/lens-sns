import type { Comment } from "../types/Comment";
import type { Post } from "../types/Post";
import type { User } from "../types/User";
import { getCurrentISODate } from "./dates";

export const createNewCommentBody = (
	postId: string,
	user: User,
	content: string,
	parentCommentId?: string
): Omit<Comment, "id"> => {
	return {
		postId: postId,
		name: user.name,
		avatar: user.avatar,
		content: content,
		parentId: parentCommentId ?? null,
		createdAt: getCurrentISODate(),
	};
};

export const createNewPostBody = (
	user: User,
	title: string,
	content: string
): Omit<Post, "id"> => {
	return {
		name: user.name,
		avatar: user.avatar,
		title,
		content,
		createdAt: getCurrentISODate(),
	};
};
