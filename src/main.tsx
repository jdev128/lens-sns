import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ReactQuery } from "./config/ReactQuery";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ReactQuery>
			<App/>
		</ReactQuery>
	</StrictMode>
);
