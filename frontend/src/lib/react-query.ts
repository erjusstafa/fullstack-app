import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable automatic refetch on window focus
      staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
      retry: 1, // Retry failed queries once
    },
  },
});