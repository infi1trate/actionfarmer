import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { ReducedMotionProvider } from "@/hooks/use-reduced-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Design System Pages
import DSOverview from "./pages/design-system/Overview";
import DSBrand from "./pages/design-system/Brand";
import DSTokens from "./pages/design-system/Tokens";
import DSTypography from "./pages/design-system/Typography";
import DSPatterns from "./pages/design-system/Patterns";
import DSGuardrails from "./pages/design-system/Guardrails";
import DesignSystem from "./pages/DesignSystem";
import Accessibility from "./pages/Accessibility";

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
              
              {/* Design System Hub */}
              <Route path="/design-system" element={<DSOverview />} />
              <Route path="/design-system/brand" element={<DSBrand />} />
              <Route path="/design-system/tokens" element={<DSTokens />} />
              <Route path="/design-system/typography" element={<DSTypography />} />
              <Route path="/design-system/components" element={<DesignSystem />} />
              <Route path="/design-system/patterns" element={<DSPatterns />} />
              <Route path="/design-system/accessibility" element={<Accessibility />} />
              <Route path="/design-system/guardrails" element={<DSGuardrails />} />
              
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
