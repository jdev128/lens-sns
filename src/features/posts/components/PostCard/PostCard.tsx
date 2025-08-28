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

interface Props {
	data: Post;
	shortFormat?: boolean;
	onClick?: () => void;
}

export const PostCard = ({ data, shortFormat = false, onClick }: Props) => {
	return (
		<Card onClick={onClick}>
			<CardHeader endAction={<button>Hi</button>}>
				<Avatar imageURL={data.avatar} />
				<div>
					<div className="emphasizedText">{data.name}</div>
					<div className="clarificationText">
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
