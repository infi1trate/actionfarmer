import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { ReducedMotionProvider } from "@/hooks/use-reduced-motion";
import Index from "./pages/Index";
import DesignSystem from "./pages/DesignSystem";
import Brand from "./pages/Brand";
import TokenReference from "./pages/TokenReference";
import Typography from "./pages/Typography";
import Layout from "./pages/Layout";
import Accessibility from "./pages/Accessibility";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <ReducedMotionProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/design-system" element={<DesignSystem />} />
              <Route path="/brand" element={<Brand />} />
              <Route path="/tokens" element={<TokenReference />} />
              <Route path="/typography" element={<Typography />} />
              <Route path="/layout" element={<Layout />} />
              <Route path="/accessibility" element={<Accessibility />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ReducedMotionProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
