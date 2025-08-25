import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./Home.tsx";
import { Layout } from "./shared/components/Layout";
import { BrowserRouter, Routes, Route } from "react-router";
import { PostDetail } from "./features/Posts/pages/PostDetail";
import { Error } from "./shared/pages/Error";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="/post/:id" element={<PostDetail />} />
				</Route>
				<Route path="/*" element={<Error>La pagina solicitada no existe</Error>}></Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
