import { useState } from "react";
import { AppRoutes } from "./config/AppRoutes";
import UserContext from "./context/UserContext";
import type { User } from "./shared/types/User";
import { getRandomUser } from "./shared/utils/randomData";

let defaultUser: User = {
  name: "jDev128",
  avatar: "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/05/055874a3352a2b8bede001a85391b2c8594d7b71_full.jpg",
};

export const App = () => {

  const [user, setUser] = useState(defaultUser);

  const randomizeUser = () => {
    setUser(getRandomUser());
  }

	return (
		<UserContext value={{ user, randomizeUser }}>
			<AppRoutes />
		</UserContext>
	);
};
