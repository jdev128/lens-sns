import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRoutes } from "./config/AppRoutes";
import { ReactQuery } from "./config/ReactQuery";
import UserContext from "./context/UserContext";
import type { User } from "./shared/types/User";

let currentUser: User = {
	name: "jDev128",
	avatar: "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/05/055874a3352a2b8bede001a85391b2c8594d7b71_full.jpg",
};

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ReactQuery>
			<UserContext value={{user: currentUser}}>
				<AppRoutes />
			</UserContext>
		</ReactQuery>
	</StrictMode>
);
