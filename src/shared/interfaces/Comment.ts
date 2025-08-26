export interface Comment {
	createdAt: string;
	name: string;
	avatar: string;
	content: string;
	postId: string;
	id: string;
	parentId: null | string;
}
