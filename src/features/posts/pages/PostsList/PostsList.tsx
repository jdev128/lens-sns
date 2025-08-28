import { useInfiniteQuery } from "@tanstack/react-query";
import "./PostsList.module.css";
import { getPosts } from "../../../../services/posts";
import React from "react";
import { useNavigate } from "react-router";
import { PostCard } from "../../components/PostCard";
import { List, ListItem } from "../../../../shared/components/List/List";
import { Button } from "../../../../shared/components/Button";
import styles from "./PostsList.module.css"

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
		queryFn: ({ pageParam }) => getPosts(pageParam, 5),
		initialPageParam: 1,
		maxPages: 10,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			if (lastPage.length === 0) {
				return undefined;
			}
			return lastPageParam + 1;
		},
	});

	const navigate = useNavigate();

	return status === "pending" ? (
		<p>Loading...</p>
	) : status === "error" ? (
		<p>Error: {error.message}</p>
	) : (
		<>
			<List>
				{data.pages.map((group, i) => (
					<React.Fragment key={i}>
						{group.map((post) => (
							<ListItem key={post.id}>
								<PostCard
									data={post}
									shortFormat
									onClick={() => navigate(`/post/${post.id}`)}
								/>
							</ListItem>
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
