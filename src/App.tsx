import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./shared/services";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";
import { Toaster } from "sonner";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
