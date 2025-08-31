import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar } from "../../../../shared/components/Avatar";
import { Button } from "../../../../shared/components/Button";
import {
	Card,
	CardContent,
	CardHeader,
} from "../../../../shared/components/Card";
import { Trash } from "../../../../shared/icons/Trash";
import type { Comment } from "../../../../shared/types/Comment";
import {
	getElapsedTime,
	getPrintableTimePeriod,
} from "../../../../shared/utils/dates";
import { deleteCommentFromPost } from "../../../../services/comments";
import styles from "./CommentCard.module.css";

interface Props {
	data: Comment;
}

export const CommentCard = ({ data }: Props) => {
	const queryClient = useQueryClient();

	const deleteCommentMutation = useMutation<
		Comment,
		Error,
		{ postId: string; commentId: string }
	>({
		mutationFn: ({ postId, commentId }) =>
			deleteCommentFromPost(postId, commentId),
		onSuccess: (data) => {
			console.info(
				`Se elimino correctamente el comentario con id ${data.id}`
			);
			queryClient.invalidateQueries({
				queryKey: ["postComments", data.postId],
			});
		},
		onError: (error, variables) => {
			console.error(
				`Ocurrio el siguiente error al intentar eliminar el comentario con id ${variables}:`,
				error.message
			);
		},
	});

	return (
		<div className={styles.commentCard}>
			<Card>
				<CardHeader
					endAction={
						<Button
							variant="rounded"
							onClick={() =>
								deleteCommentMutation.mutate({
									postId: data.postId,
									commentId: data.id,
								})
							}
						>
							{/* TODO: Replace with ellipsis, popover and list of buttons*/}
							<Trash size="20px" color="var(--error-color)" />
						</Button>
					}
				>
					<Avatar imageURL={data.avatar} />
					<div>
						<div className="emphasizedText">{data.name}</div>
						<div className="clarificationText">
							{/* TODO: Add tooltip with long date */}
							{getPrintableTimePeriod(
								getElapsedTime(new Date(data.createdAt))
							)}
						</div>
					</div>
				</CardHeader>
				<CardContent>{data.content}</CardContent>
			</Card>
		</div>
	);
};
