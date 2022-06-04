import React from "react";
import Characters from "./components/Characters";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Characters />
      </QueryClientProvider>
    </div>
  );
}
