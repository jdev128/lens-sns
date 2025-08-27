import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "../shared/components/Layout";
import { PostsList } from "../features/posts/pages/PostsList";
import { PostDetail } from "../features/posts/pages/PostDetail";
import { Error } from "../shared/pages/Error";

export const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<PostsList />} />
					<Route path="/post/:id" element={<PostDetail />} />
				</Route>
				<Route
					path="/*"
					element={<Error>La pagina solicitada no existe</Error>}
				></Route>
			</Routes>
		</BrowserRouter>
	);
};
