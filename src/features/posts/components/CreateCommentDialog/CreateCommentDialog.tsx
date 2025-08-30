import { useState } from "react";
import { Button } from "../../../../shared/components/Button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
} from "../../../../shared/components/Dialog";
import { TextArea } from "../../../../shared/components/TextArea";

interface Props {
	open: boolean;
	onClose: () => void;
}

export const CreateCommentDialog = ({ open, onClose }: Props) => {
	const [postTitle, setPostTitle] = useState("");
	const [postComment, setPostComment] = useState("");

	const resetFields = () => {
		setPostTitle("");
		setPostComment("");
	};
	return (
		<Dialog
			open={open}
			onClose={() => {
				onClose();
				resetFields();
			}}
		>
			<DialogHeader
				onClose={() => {
					onClose();
					resetFields();
				}}
			>
				Crear publicacion
			</DialogHeader>
			<DialogContent>
				<TextArea
					label="Titulo"
					name="postTitle"
					placeholder="Un titulo memorable"
					value={postTitle}
					onChange={setPostTitle}
					maxLength={100}
				/>
				<TextArea
					label="Cuerpo"
					name="postContent"
					placeholder="¿Que quieres compartir con el mundo?"
					value={postComment}
					onChange={setPostComment}
				/>
			</DialogContent>
			<DialogFooter>
				<Button
					variant="outlined"
					onClick={() => {
						onClose();
						resetFields();
					}}
				>
					Cancelar
				</Button>
				<Button onClick={() => {}}>Publicar</Button>
			</DialogFooter>
		</Dialog>
	);
};
