// src/ReactQueryProvider.js
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			retry: 1,
			staleTime: 1000 * 60 * 5,
		},
	},
});

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default ReactQueryProvider;
