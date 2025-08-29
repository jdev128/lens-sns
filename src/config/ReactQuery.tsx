import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";
import { MILLISECONDS_PER_MINUTE } from "../shared/utils/constants/dates";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: MILLISECONDS_PER_MINUTE * 2,
		},
	},
});

interface Props {
	children: ReactNode;
}

export const ReactQuery = ({ children }: Props) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};
