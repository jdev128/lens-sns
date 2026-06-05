import { useInfiniteQuery } from "@tanstack/react-query";
import "./PostsList.module.css";
import { getPosts } from "../../../../services/posts";
import React from "react";
import { Link } from "react-router";
import { PostCard } from "../../components/PostCard";
import { List } from "../../../../shared/components/List";
import { Button } from "../../../../shared/components/Button";
import styles from "./PostsList.module.css";
import { DEFAULT_PAGE_SIZE } from "../../../../shared/utils/constants/services";
import { useUserContext } from "../../../../context/UserContext";
import { usePostDeletion } from "../../../../hooks/mutations";

export const PostsList = () => {
	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status,
	} = useInfiniteQuery({
		queryKey: ["posts"],
		queryFn: ({ pageParam }) => getPosts(pageParam),
		initialPageParam: 1,
		maxPages: 10,
		getNextPageParam: (lastPage, [], lastPageParam) =>
			lastPage.length < DEFAULT_PAGE_SIZE ? undefined : lastPageParam + 1,
	});

	const { mutate: deletePost } = usePostDeletion();

	const { user } = useUserContext();

	return status === "pending" ? (
		<p>Cargando...</p>
	) : status === "error" ? (
		<p>Error: {error.message}</p>
	) : (
		<>
			<List interactive>
				{data.pages.map((group, i) => (
					<React.Fragment key={i}>
						{group.map((post) => (
							<Link to={`/post/${post.id}`} key={post.id}>
								<PostCard
									data={post}
									shortFormat
									editable={post.name === user.name}
									onDeletion={() => deletePost(post.id)}
								/>
							</Link>
						))}
					</React.Fragment>
				))}
			</List>
			<div className={styles.buttonContainer}>
				<Button
					onClick={() => fetchNextPage()}
					disabled={!hasNextPage || isFetching}
					variant="text"
					expansible
				>
					{isFetchingNextPage
						? "Cargando..."
						: hasNextPage
							? "Cargar mas publicaciones"
							: "Llegaste al final"}
				</Button>
			</div>
		</>
	);
};
