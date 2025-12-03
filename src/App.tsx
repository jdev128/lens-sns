import { AppRoutes } from "./config/AppRoutes";
import { UserProvider } from "./context/UserContext";

export const App = () => {
	return (
		<UserProvider>
			<AppRoutes />
		</UserProvider>
	);
};
