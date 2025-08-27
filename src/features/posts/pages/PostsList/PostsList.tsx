import { useInfiniteQuery } from "@tanstack/react-query";
import "./PostsList.module.css";
import { getPosts } from "../../../../services/posts";
import React from "react";
import {
	getElapsedTime,
	getPrintableTimePeriod,
} from "../../../../shared/utils/dates";
import { useNavigate } from "react-router";

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
			{data.pages.map((group, i) => (
				<React.Fragment key={i}>
					{group.map((post) => (
							<article
								key={post.id}
								style={{ marginBlockEnd: "20px" }}
								onClick={() => navigate(`/post/${post.id}`)}
							>
								<div>{post.name}</div>
								<div>
									{getPrintableTimePeriod(
										getElapsedTime(new Date(post.createdAt))
									)}
								</div>
								<div>{post.title}</div>
								<div>{post.content}</div>
							</article>
					))}
				</React.Fragment>
			))}
			<div>
				<button
					onClick={() => fetchNextPage()}
					disabled={!hasNextPage || isFetching}
				>
					{isFetchingNextPage
						? "Loading more..."
						: hasNextPage
						? "Load More"
						: "Nothing more to load"}
				</button>
			</div>
		</>
	);
};
