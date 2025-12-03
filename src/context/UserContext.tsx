import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../shared/types/User";
import { getRandomUser } from "../shared/utils/randomData";

const defaultUser = {
	name: "jDev128",
	avatar: "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/05/055874a3352a2b8bede001a85391b2c8594d7b71_full.jpg",
};

const initialValue: { user: User; randomizeUser: () => void } = {
	user: defaultUser,
	randomizeUser: () => {},
};

const UserContext = createContext(initialValue);

interface ProviderProps {
	children: ReactNode;
}

export const UserProvider = ({ children }: ProviderProps) => {
	const [user, setUser] = useState(defaultUser);

	const randomizeUser = () => {
		setUser(getRandomUser());
	};

	return (
		<UserContext value={{ user, randomizeUser }}>{children}</UserContext>
	);
};

export const useUserContext = () => {
	return useContext(UserContext);
};
