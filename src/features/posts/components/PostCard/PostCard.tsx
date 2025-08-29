import { Avatar } from "../../../../shared/components/Avatar";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../../../shared/components/Card";
import type { Post } from "../../../../shared/types/Post";
import {
	getElapsedTime,
	getPrintableTimePeriod,
} from "../../../../shared/utils/dates";
import { Button } from "../../../../shared/components/Button";
import { Trash } from "../../../../shared/icons/Trash";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../../../../services/posts";

interface Props {
	data: Post;
	shortFormat?: boolean;
	onClick?: () => void;
}

export const PostCard = ({ data, shortFormat = false, onClick }: Props) => {

	const queryClient = useQueryClient();

	const deletePostMutation = useMutation({
		mutationFn: deletePost,
		onSuccess: (data) => {
			console.info(`Se elimino correctamente el post con id ${data.id}`);
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
		onError: (error, variables) => {
			console.error(
				`Ocurrio el siguiente error al intentar eliminar el post con id ${variables}:`,
				error.message
			);
		},
	});

	return (
		<Card onClick={onClick}>
			<CardHeader
				endAction={
					<Button
						variant="rounded"
						onClick={() => deletePostMutation.mutate(data.id)}
					>
						{/* TODO: Replace with ellipsis, popover and list of buttons*/}
						<Trash size="20px" color="#b00020" />
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
			<CardTitle>{data.title}</CardTitle>
			<CardContent maxLines={shortFormat ? 3 : undefined}>
				{data.content}
			</CardContent>
		</Card>
	);
};
