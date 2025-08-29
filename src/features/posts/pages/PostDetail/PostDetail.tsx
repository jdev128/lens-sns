import { useNavigate, useParams } from "react-router";
import { Button } from "../../../../shared/components/Button";
import { ChevronLeft } from "../../../../shared/icons/ChevronLeft";
import { PostCard } from "../../components/PostCard";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../../../services/posts";
import styles from "./PostDetail.module.css";
import { getCommentsFromPost } from "../../../../services/comments";
import { List, ListItem } from "../../../../shared/components/List";
import { CommentCard } from "../../components/CommentCard";

export const PostDetail = () => {
	const navigate = useNavigate();
	let { postId } = useParams();

	const postQuery = useQuery({
		queryKey: ["post", postId],
		queryFn: () =>
			postId
				? getPost(postId)
				: Promise.reject("Id de publicacion no provisto"),
	});

	const commentsQuery = useQuery({
		queryKey: ["postComments", postId],
		queryFn: () =>
			postId
				? getCommentsFromPost(postId)
				: Promise.reject("Id de publicacion no provisto"),
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
			) : postQuery.data ? (
				<PostCard data={postQuery.data} />
			) : (
				<p>No existe ninguna publicacion con el id facilitado</p>
			)}
			{
			/* TODO: Hacer consulta solo en caso de que el post
			se obtenga correctamente */
			commentsQuery.status === "pending" ? (
				<p>Cargando...</p>
			) : commentsQuery.status === "error" ? (
				<p>Error: {commentsQuery.error.message}</p>
			) : commentsQuery.data && (
				<List>
					{commentsQuery.data.map((comment) => (
						<ListItem key={comment.id}>
							<CommentCard data={comment}/>
						</ListItem>
					))}
				</List>
			)}
		</>
	);
};
