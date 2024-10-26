"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const Providers = (p: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{p.children}</QueryClientProvider>
  );
};
