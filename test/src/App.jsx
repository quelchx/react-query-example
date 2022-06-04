import React from "react";
import Characters from "./components/Characters";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import MODE from "./config";

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Characters />
      {MODE === "dev" && (
        <ReactQueryDevtools position="bottom-right" initialisOpen={false} />
      )}
    </QueryClientProvider>
  );
}
