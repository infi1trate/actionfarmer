import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { ReducedMotionProvider } from "@/hooks/use-reduced-motion";
import NotFound from "./pages/NotFound";

// Design System Pages
import DSOverview from "./pages/design-system/Overview";
import DSBrand from "./pages/design-system/Brand";
import DSTokens from "./pages/design-system/Tokens";
import DSTypography from "./pages/design-system/Typography";
import DSPatterns from "./pages/design-system/Patterns";
import DSGuardrails from "./pages/design-system/Guardrails";
import DSHandoff from "./pages/design-system/Handoff";
import DesignSystem from "./pages/DesignSystem";
import Accessibility from "./pages/Accessibility";

// App Pages
import {
  AppLayout,
  HomePage,
  PlayPage,
  EarningsPage,
  InsightsPage,
  SettingsPage,
  WelcomePage,
  SignupPage,
  SigninPage,
  SuccessPage,
  OnboardingExplainPage,
  OnboardingPrivacyPage,
  OnboardingConsentPage,
  CameraPlacementPage,
  ZoneSelectionPage,
  ScheduleSelectionPage,
  ModeSelectionPage,
  AmbientModePage,
  DailySummaryPage,
} from "./app";

import {
  SessionCompletedPage,
  SessionAnnotationPage,
  UploadConfirmationPage,
} from "./app/pages/session";

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
              {/* Redirect root to onboarding */}
              <Route path="/" element={<Navigate to="/onboarding" replace />} />
              
              {/* Onboarding Flow */}
              <Route path="/onboarding" element={<WelcomePage />} />
              <Route path="/onboarding/explain" element={<OnboardingExplainPage />} />
              <Route path="/onboarding/privacy" element={<OnboardingPrivacyPage />} />
              <Route path="/onboarding/consent" element={<OnboardingConsentPage />} />
              <Route path="/onboarding/signup" element={<SignupPage />} />
              <Route path="/onboarding/signin" element={<SigninPage />} />
              <Route path="/onboarding/success" element={<SuccessPage />} />
              <Route path="/onboarding/camera" element={<CameraPlacementPage />} />
              <Route path="/onboarding/zones" element={<ZoneSelectionPage />} />
              <Route path="/onboarding/schedule" element={<ScheduleSelectionPage />} />
              <Route path="/onboarding/modes" element={<ModeSelectionPage />} />
              
              {/* Ambient Mode */}
              <Route path="/ambient" element={<AmbientModePage />} />
              <Route path="/summary" element={<DailySummaryPage />} />
              
              {/* Session Flow */}
              <Route path="/session/complete" element={<SessionCompletedPage />} />
              <Route path="/session/annotate" element={<SessionAnnotationPage />} />
              <Route path="/session/confirm" element={<UploadConfirmationPage />} />
              
              {/* Main App */}
              <Route path="/app" element={<AppLayout />}>
                <Route index element={<HomePage />} />
                <Route path="play" element={<PlayPage />} />
                <Route path="earnings" element={<EarningsPage />} />
                <Route path="insights" element={<InsightsPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
              
              {/* Design System Hub */}
              <Route path="/design-system" element={<DSOverview />} />
              <Route path="/design-system/brand" element={<DSBrand />} />
              <Route path="/design-system/tokens" element={<DSTokens />} />
              <Route path="/design-system/typography" element={<DSTypography />} />
              <Route path="/design-system/components" element={<DesignSystem />} />
              <Route path="/design-system/patterns" element={<DSPatterns />} />
              <Route path="/design-system/accessibility" element={<Accessibility />} />
              <Route path="/design-system/guardrails" element={<DSGuardrails />} />
              <Route path="/design-system/handoff" element={<DSHandoff />} />
              
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
