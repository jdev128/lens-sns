import { useNavigate, useParams } from "react-router";
import { Button } from "../../../../shared/components/Button";
import { ChevronLeft } from "../../../../shared/icons/ChevronLeft";
import { PostCard } from "../../components/PostCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPost } from "../../../../services/posts";
import styles from "./PostDetail.module.css";
import {
	createComment,
	getCommentsFromPost,
} from "../../../../services/comments";
import { List, ListItem } from "../../../../shared/components/List";
import { CommentCard } from "../../components/CommentCard";
import { TextArea } from "../../../../shared/components/TextArea";
import { useCallback, useState } from "react";
import { createNewCommentBody } from "../../../../shared/utils/services";
import { useUserContext } from "../../../../context/UserContext";

export const PostDetail = () => {
	const [newCommentContent, setNewCommentContent] = useState("");
	const changeCommentContent = useCallback((newComment: string) => {
		setNewCommentContent(newComment);
	}, []);

	const navigate = useNavigate();
	let { postId } = useParams();
	const { user } = useUserContext();

	const queryClient = useQueryClient();

	const postQuery = useQuery({
		queryKey: ["post", postId],
		queryFn: () =>
			postId
				? getPost(postId)
				: Promise.reject("Id de publicacion no provisto"),
	});

	const fetchedPostId = postQuery.data?.id;

	const commentsQuery = useQuery({
		queryKey: ["postComments", postId],
		queryFn: () =>
			postId
				? getCommentsFromPost(postId)
				: Promise.reject("Id de publicacion no provisto"),
	});

	const createCommentMutation = useMutation({
		mutationFn: createComment,
		onSuccess: (data) => {
			console.info(
				`Se creo correctamente el comentario con id ${data.id}`
			);
			setNewCommentContent("");
			queryClient.invalidateQueries({
				queryKey: ["postComments", data.postId],
			});
		},
		onError: (error) => {
			console.error(
				`Ocurrio el siguiente error al intentar crear el comentario:`,
				error.message
			);
		},
	});

	return (
		<>
			<header className={styles.header}>
				<Button
					variant="text"
					size="small"
					onClick={() => navigate(-1)}
				>
					<ChevronLeft size="18px" />
					Volver
				</Button>
			</header>
			{postQuery.status === "pending" ? (
				<p>Cargando...</p>
			) : postQuery.status === "error" ? (
				<p>Error: {postQuery.error.message}</p>
			) : fetchedPostId && postQuery.data ? (
				<>
					<PostCard data={postQuery.data} />
					<div className={styles.textAreaContainer}>
						<TextArea
							minLength={20}
							placeholder="¿Que quieres compartir con el mundo?"
							name="commentContent"
							value={newCommentContent}
							onChange={changeCommentContent}
							actions={
								<Button
									size="small"
									disabled={!newCommentContent}
									onClick={() => {
										createCommentMutation.mutate(
											createNewCommentBody(
												fetchedPostId,
												user,
												newCommentContent,
												undefined
											)
										);
									}}
								>
									Comentar
								</Button>
							}
						/>
					</div>
				</>
			) : (
				<p>La publicacion que estas buscando no existe.</p>
			)}
			{
				/* TODO: Hacer consulta solo en caso de que el post
			se obtenga correctamente */
				fetchedPostId && commentsQuery.status === "pending" ? (
					<p>Cargando...</p>
				) : commentsQuery.status === "error" ? (
					<p>Error: {commentsQuery.error.message}</p>
				) : (
					commentsQuery.data && (
						<List>
							{commentsQuery.data.map((comment) => (
								<ListItem key={comment.id}>
									<CommentCard data={comment} />
								</ListItem>
							))}
						</List>
					)
				)
			}
		</>
	);
};
