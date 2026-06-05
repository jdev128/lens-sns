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

interface Props {
	data: Post;
	shortFormat?: boolean;
	editable?: boolean;
	onDeletion?: () => void;
}

export const PostCard = ({
	data,
	shortFormat = false,
	editable = true,
	onDeletion = () => {},
}: Props) => {
	return (
		<Card>
			<CardHeader
				endAction={
					editable && (
						<Button
							variant="rounded"
							onClick={onDeletion}
							ariaLabel="Eliminar publicación"
						>
							{/* TODO: Replace with ellipsis, popover and list of buttons*/}
							<Trash size="20px" color="var(--error-color)" />
						</Button>
					)
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
