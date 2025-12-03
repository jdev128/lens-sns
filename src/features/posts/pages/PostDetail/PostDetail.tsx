import { useLocation, useNavigate, useParams } from "react-router";
import { Button } from "../../../../shared/components/Button";
import { ChevronLeft } from "../../../../shared/icons/ChevronLeft";
import { PostCard } from "../../components/PostCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPost } from "../../../../services/posts";
import styles from "./PostDetail.module.css";
import {
	createComment,
	deleteCommentFromPost,
	getCommentsFromPost,
} from "../../../../services/comments";
import { List, ListItem } from "../../../../shared/components/List";
import { CommentCard } from "../../components/CommentCard";
import { TextArea } from "../../../../shared/components/TextArea";
import { useCallback, useEffect, useState } from "react";
import { createNewCommentBody } from "../../../../shared/utils/services";
import { useUserContext } from "../../../../context/UserContext";
import type { Comment } from "../../../../shared/types/Comment";
import { usePostDeletion } from "../../../../hooks/mutations";

export const PostDetail = () => {
	const [newCommentContent, setNewCommentContent] = useState("");
	const changeCommentContent = useCallback((newComment: string) => {
		setNewCommentContent(newComment);
	}, []);

	const navigate = useNavigate();
	const location = useLocation();
	let { postId } = useParams();
	const { user } = useUserContext();

	const navigateBack = () => {
		location.key === "default"
			? navigate("/", { replace: true })
			: navigate(-1);
	};

	const resetCommentField = () => {
		setNewCommentContent("");
	};

	useEffect(() => {
		resetCommentField();
	}, [location]);

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
			resetCommentField();
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

	const { mutate: deletePost } = usePostDeletion(navigateBack);

	return (
		<>
			<header className={styles.header}>
				<Button variant="text" size="small" onClick={navigateBack}>
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
					<PostCard
						data={postQuery.data}
						editable={postQuery.data.name === user.name}
						onDeletion={() => {
							postQuery.data && deletePost(postQuery.data.id);
						}}
					/>
					<div className={styles.textAreaContainer}>
						<TextArea
							minLength={20}
							placeholder="Unete a la conversacion"
							name="commentContent"
							value={newCommentContent}
							onChange={changeCommentContent}
							rows={4}
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
									<CommentCard
										data={comment}
										editable={comment.name === user.name}
										onDeletion={() =>
											deleteCommentMutation.mutate({
												postId: comment.postId,
												commentId: comment.id,
											})
										}
									/>
								</ListItem>
							))}
						</List>
					)
				)
			}
		</>
	);
};
