import { useState } from "react";
import { Button } from "../../../../shared/components/Button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
} from "../../../../shared/components/Dialog";
import { TextArea } from "../../../../shared/components/TextArea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../../../services/posts";
import { createNewPostBody } from "../../../../shared/utils/services";
import { useUserContext } from "../../../../context/UserContext";
import { useNavigate } from "react-router";

interface Props {
	open: boolean;
	onClose: () => void;
}

export const CreateCommentDialog = ({ open, onClose }: Props) => {
	const [postTitle, setPostTitle] = useState("");
	const [postComment, setPostComment] = useState("");

	const { user } = useUserContext();
	const navigate = useNavigate();

	const closeDialog = () => {
		setPostTitle("");
		setPostComment("");
		onClose();
	};

	const queryClient = useQueryClient();
	const createPostMutation = useMutation({
		mutationFn: createPost,
		onSuccess: (data) => {
			console.info(
				`Se creo correctamente la publicacion con id ${data.id}`
			);
			queryClient.invalidateQueries({
				queryKey: ["posts"],
			});
			navigate(`/post/${data.id}`);
			closeDialog();
		},
		onError: (error) => {
			console.error(
				`Ocurrio el siguiente error al intentar crear la publicacion:`,
				error.message
			);
		},
	});

	return (
		<Dialog open={open} onClose={closeDialog}>
			<DialogHeader onClose={closeDialog}>Crear publicacion</DialogHeader>
			<DialogContent>
				<TextArea
					label="Titulo"
					name="postTitle"
					placeholder="Elige un titulo memorable"
					value={postTitle}
					onChange={setPostTitle}
					maxLength={100}
					rows={3}
				/>
				<TextArea
					label="Cuerpo"
					name="postContent"
					placeholder="¿Que quieres compartir hoy?"
					value={postComment}
					onChange={setPostComment}
					rows={10}
				/>
			</DialogContent>
			<DialogFooter>
				<Button variant="outlined" onClick={closeDialog}>
					Cancelar
				</Button>
				<Button
					disabled={!postTitle || !postComment}
					onClick={() =>
						createPostMutation.mutate(
							createNewPostBody(user, postTitle, postComment)
						)
					}
				>
					Publicar
				</Button>
			</DialogFooter>
		</Dialog>
	);
};
