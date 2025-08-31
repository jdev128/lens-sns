import { createContext, useContext } from "react";
import type { User } from "../shared/types/User";

const initialValue: {user: User, randomizeUser: () => void} = {
	user: {
		name: "",
		avatar: "",
	},
	randomizeUser: () => {}
};

const UserContext = createContext(initialValue);

export const useUserContext = () => {
	return useContext(UserContext);
};

export default UserContext;
