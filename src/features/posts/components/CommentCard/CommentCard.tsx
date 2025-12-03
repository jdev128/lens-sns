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
import styles from "./CommentCard.module.css";

interface Props {
	data: Comment;
	editable?: boolean;
	onDeletion?: () => void;
}

export const CommentCard = ({
	data,
	editable = true,
	onDeletion = () => {},
}: Props) => {
	return (
		<div className={styles.commentCard}>
			<Card>
				<CardHeader
					endAction={
						editable && (
							<Button
								variant="rounded"
								onClick={onDeletion}
								ariaLabel="Eliminar comentario"
							>
								{/* TODO: Replace with ellipsis, popover and list of buttons*/}
								<Trash size="20px" color="var(--error-color)" />
							</Button>
						)
					}
				>
					<Avatar imageURL={data.avatar} size="small" />
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
