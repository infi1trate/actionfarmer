import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { ReducedMotionProvider } from "@/hooks/use-reduced-motion";
import { ChallengeTransitionProvider } from "@/contexts/ChallengeTransitionContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppDataProvider } from "@/contexts/AppDataContext";
import NotFound from "./pages/NotFound";
// Lightweight loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Lazy load Design System Pages
const DSOverview = lazy(() => import("./pages/design-system/Overview"));
const DSBrand = lazy(() => import("./pages/design-system/Brand"));
const DSTokens = lazy(() => import("./pages/design-system/Tokens"));
const DSTypography = lazy(() => import("./pages/design-system/Typography"));
const DSPatterns = lazy(() => import("./pages/design-system/Patterns"));
const DSGuardrails = lazy(() => import("./pages/design-system/Guardrails"));
const DSHandoff = lazy(() => import("./pages/design-system/Handoff"));
const DesignSystem = lazy(() => import("./pages/DesignSystem"));
const Accessibility = lazy(() => import("./pages/Accessibility"));

// Lazy load App Pages
const AppLayout = lazy(() => import("./app/AppLayout").then(m => ({ default: m.AppLayout })));
const HomePage = lazy(() => import("./app/pages/HomePage").then(m => ({ default: m.HomePage })));
const PlayPage = lazy(() => import("./app/pages/PlayPage").then(m => ({ default: m.PlayPage })));
const EarningsPage = lazy(() => import("./app/pages/EarningsPage").then(m => ({ default: m.EarningsPage })));
const InsightsPage = lazy(() => import("./app/pages/InsightsPage").then(m => ({ default: m.InsightsPage })));
const SettingsPage = lazy(() => import("./app/pages/SettingsPage").then(m => ({ default: m.SettingsPage })));
const AmbientModePage = lazy(() => import("./app/pages/AmbientModePage"));
const DailySummaryPage = lazy(() => import("./app/pages/DailySummaryPage"));
const PlayModePage = lazy(() => import("./app/pages/PlayModePage"));
const LeaderboardPage = lazy(() => import("./app/pages/LeaderboardPage"));
const GardenPage = lazy(() => import("./app/pages/GardenPage").then(m => ({ default: m.GardenPage })));

// Lazy load Onboarding Pages
const SplashPage = lazy(() => import("./app/pages/onboarding/SplashPage").then(m => ({ default: m.SplashPage })));
const ExplainPage = lazy(() => import("./app/pages/onboarding/ExplainPage").then(m => ({ default: m.ExplainPage })));
const ChallengesExplainPage = lazy(() => import("./app/pages/onboarding/ChallengesExplainPage").then(m => ({ default: m.ChallengesExplainPage })));
const TrustPage = lazy(() => import("./app/pages/onboarding/TrustPage").then(m => ({ default: m.TrustPage })));
const SignupPage = lazy(() => import("./app/pages/onboarding/SignupPage").then(m => ({ default: m.SignupPage })));
const ReadyPage = lazy(() => import("./app/pages/onboarding/ReadyPage").then(m => ({ default: m.ReadyPage })));

// Lazy load Auth Pages
const CreateAccountPage = lazy(() => import("./app/pages/auth/CreateAccountPage").then(m => ({ default: m.CreateAccountPage })));
const VerifyEmailPage = lazy(() => import("./app/pages/auth/VerifyEmailPage").then(m => ({ default: m.VerifyEmailPage })));
const SignInPage = lazy(() => import("./app/pages/auth/SignInPage").then(m => ({ default: m.SignInPage })));

// Lazy load Session Pages
const SessionCompletedPage = lazy(() => import("./app/pages/session/SessionCompletedPage").then(m => ({ default: m.SessionCompletedPage })));
const SessionAnnotationPage = lazy(() => import("./app/pages/session/SessionAnnotationPage").then(m => ({ default: m.SessionAnnotationPage })));
const UploadConfirmationPage = lazy(() => import("./app/pages/session/UploadConfirmationPage").then(m => ({ default: m.UploadConfirmationPage })));

// Lazy load Challenge Pages
const ChallengeBriefPage = lazy(() => import("./app/pages/challenge/ChallengeBriefPage").then(m => ({ default: m.ChallengeBriefPage })));
const CameraPermissionPage = lazy(() => import("./app/pages/challenge/CameraPermissionPage").then(m => ({ default: m.CameraPermissionPage })));
const ChallengeCameraReadyPage = lazy(() => import("./app/pages/challenge/ChallengeCameraReadyPage").then(m => ({ default: m.ChallengeCameraReadyPage })));
const ChallengeCountdownPage = lazy(() => import("./app/pages/challenge/ChallengeCountdownPage").then(m => ({ default: m.ChallengeCountdownPage })));
const ChallengeRecordingPage = lazy(() => import("./app/pages/challenge/ChallengeRecordingPage").then(m => ({ default: m.ChallengeRecordingPage })));
const ChallengeReviewSubmitPage = lazy(() => import("./app/pages/challenge/ChallengeReviewSubmitPage").then(m => ({ default: m.ChallengeReviewSubmitPage })));
const ChallengeActivePage = lazy(() => import("./app/pages/challenge/ChallengeActivePage").then(m => ({ default: m.ChallengeActivePage })));
const ChallengeCompletedPage = lazy(() => import("./app/pages/challenge/ChallengeCompletedPage").then(m => ({ default: m.ChallengeCompletedPage })));
const ChallengeAnnotationPage = lazy(() => import("./app/pages/challenge/ChallengeAnnotationPage").then(m => ({ default: m.ChallengeAnnotationPage })));

// Lazy load Payout Pages
const PayoutPage = lazy(() => import("./app/pages/payout/PayoutPage").then(m => ({ default: m.PayoutPage })));
const PayoutConfirmationPage = lazy(() => import("./app/pages/payout/PayoutConfirmationPage").then(m => ({ default: m.PayoutConfirmationPage })));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <ReducedMotionProvider>
        <AuthProvider>
          <AppDataProvider>
            <ChallengeTransitionProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                  {/* Splash Screen */}
                  <Route path="/" element={<SplashPage />} />
                  
                  {/* Onboarding Flow */}
                  <Route path="/onboarding/explain" element={<ExplainPage />} />
                  <Route path="/onboarding/challenges" element={<ChallengesExplainPage />} />
                  <Route path="/onboarding/trust" element={<TrustPage />} />
                  <Route path="/onboarding/signup" element={<SignupPage />} />
                  <Route path="/onboarding/ready" element={<ReadyPage />} />
                  
                  {/* Auth Flow */}
                  <Route path="/auth/create-account" element={<CreateAccountPage />} />
                  <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
                  <Route path="/auth/sign-in" element={<SignInPage />} />
                  
                  {/* Ambient Mode */}
                  <Route path="/ambient" element={<AmbientModePage />} />
                  <Route path="/summary" element={<DailySummaryPage />} />
                  
                  {/* Challenges */}
                  <Route path="/challenges" element={<PlayModePage />} />
                  <Route path="/leaderboard" element={<LeaderboardPage />} />
                  
                  {/* Challenge Flow */}
                  <Route path="/challenge/:id" element={<ChallengeBriefPage />} />
                  <Route path="/challenge/:id/permission" element={<CameraPermissionPage />} />
                  <Route path="/challenge/:id/camera" element={<ChallengeCameraReadyPage />} />
                  <Route path="/challenge/:id/countdown" element={<ChallengeCountdownPage />} />
                  <Route path="/challenge/:id/recording" element={<ChallengeRecordingPage />} />
                  <Route path="/challenge/:id/review" element={<ChallengeReviewSubmitPage />} />
                  <Route path="/challenge/:id/active" element={<ChallengeActivePage />} />
                  <Route path="/challenge/:id/complete" element={<ChallengeCompletedPage />} />
                  <Route path="/challenge/:id/feedback" element={<ChallengeAnnotationPage />} />
                  
                  {/* Session Flow */}
                  <Route path="/session/complete" element={<SessionCompletedPage />} />
                  <Route path="/session/annotate" element={<SessionAnnotationPage />} />
                  <Route path="/session/confirm" element={<UploadConfirmationPage />} />
                  
                  {/* Payout Flow */}
                  <Route path="/payout" element={<PayoutPage />} />
                  <Route path="/payout/confirmation" element={<PayoutConfirmationPage />} />
                  
                  {/* Main App */}
                  <Route path="/app" element={<AppLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="earnings" element={<EarningsPage />} />
                    <Route path="garden" element={<GardenPage />} />
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
              </Suspense>
            </BrowserRouter>
            </TooltipProvider>
          </ChallengeTransitionProvider>
        </AppDataProvider>
      </AuthProvider>
    </ReducedMotionProvider>
  </ThemeProvider>
</QueryClientProvider>
);

export default App;
