import { useNavigate } from "react-router";
import { Button } from "../../../../shared/components/Button";
import { ChevronLeft } from "../../../../shared/icons/ChevronLeft";

export const PostDetail = () => {
	const navigate = useNavigate();

	return (
		<div>
			<Button variant="text" onClick={() => navigate(-1)}>
				<ChevronLeft small />
				Volver
			</Button>
		</div>
	);
};
