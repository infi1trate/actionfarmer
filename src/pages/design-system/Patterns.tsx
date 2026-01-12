import { useState } from "react";
import {
  Inbox,
  Search,
  WifiOff,
  AlertTriangle,
  RefreshCw,
  Plus,
  FileText,
  Users,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { DesignSystemLayout } from "@/components/design-system/DesignSystemLayout";
import { DosDonts, UsageRule, PreviewCard } from "@/components/design-system/DosDonts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState, EmptyStateInline } from "@/components/ui/empty-state";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

function LoadingDemo() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const simulateLoad = () => {
    setIsLoading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return p + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-4">
      <Button onClick={simulateLoad} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          "Simulate Loading"
        )}
      </Button>
      {isLoading && <Progress value={progress} className="w-full" />}
    </div>
  );
}

export default function Patterns() {
  const [retryCount, setRetryCount] = useState(0);

  return (
    <DesignSystemLayout
      title="Patterns"
      description="Reusable patterns for empty states, loading, and error handling that maintain consistency across the app."
    >
      <div className="space-y-16">
        {/* Empty States */}
        <section className="space-y-8">
          <div>
            <Badge variant="secondary" className="mb-2">Pattern</Badge>
            <h2 className="font-display text-2xl font-bold">Empty States</h2>
            <p className="text-muted-foreground mt-1">
              Helpful guidance when there's no content to display.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <PreviewCard
              title="No Results"
              description="When a search returns empty"
              tokens={["EmptyState", "variant='search'"]}
            >
              <EmptyState
                icon={Search}
                title="No results found"
                description="Try adjusting your search or filters to find what you're looking for."
                action={{ label: "Clear filters", onClick: () => {} }}
              />
            </PreviewCard>

            <PreviewCard
              title="First Time"
              description="When starting with no data"
              tokens={["EmptyState", "variant='default'"]}
            >
              <EmptyState
                icon={Inbox}
                title="No devices yet"
                description="Connect your first DePIN device to start earning rewards."
                action={{ label: "Add Device", onClick: () => {}, icon: Plus }}
              />
            </PreviewCard>

            <PreviewCard
              title="No Connection"
              description="When offline or disconnected"
              tokens={["EmptyState", "variant='error'"]}
            >
              <EmptyState
                icon={WifiOff}
                title="You're offline"
                description="Check your internet connection and try again."
                action={{ label: "Retry", onClick: () => {}, icon: RefreshCw }}
              />
            </PreviewCard>

            <PreviewCard
              title="Inline Empty"
              description="Compact version for cards/lists"
              tokens={["EmptyStateInline"]}
            >
              <Card>
                <CardContent className="pt-6">
                  <EmptyStateInline
                    message="No team members yet"
                    action={{ label: "Invite", onClick: () => {} }}
                  />
                </CardContent>
              </Card>
            </PreviewCard>
          </div>

          <DosDonts
            dos={[
              "Provide a clear explanation of why it's empty",
              "Include a primary action to resolve the state",
              "Use friendly, encouraging language",
              "Match the icon to the context",
            ]}
            donts={[
              "Leave users without guidance",
              "Use technical jargon or error codes",
              "Show a blank screen with no explanation",
              "Make the empty state feel like an error",
            ]}
          />
        </section>

        {/* Loading States */}
        <section className="space-y-8">
          <div>
            <Badge variant="secondary" className="mb-2">Pattern</Badge>
            <h2 className="font-display text-2xl font-bold">Loading States</h2>
            <p className="text-muted-foreground mt-1">
              Visual feedback during asynchronous operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <PreviewCard
              title="Skeleton Loading"
              description="Placeholder content shape"
              tokens={["Skeleton"]}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-20 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            </PreviewCard>

            <PreviewCard
              title="Progress Bar"
              description="For determinate progress"
              tokens={["Progress"]}
            >
              <LoadingDemo />
            </PreviewCard>

            <PreviewCard
              title="Button Loading"
              description="Inline spinner for actions"
              tokens={["Button", "disabled", "Loader2"]}
            >
              <div className="flex gap-3">
                <Button disabled>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </Button>
                <Button variant="outline" disabled>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading
                </Button>
              </div>
            </PreviewCard>

            <PreviewCard
              title="Card Loading"
              description="Full card skeleton"
              tokens={["Card", "Skeleton"]}
            >
              <Card>
                <CardHeader>
                  <Skeleton className="h-5 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-24 w-full mb-4" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            </PreviewCard>
          </div>

          <UsageRule
            title="Match skeleton to content"
            description="Skeleton shapes should mirror the actual content layout to reduce visual shift when data loads."
            variant="info"
          />

          <DosDonts
            dos={[
              "Use skeletons for content that takes >200ms to load",
              "Match skeleton shapes to actual content layout",
              "Show progress percentage for long operations",
              "Disable interactive elements during loading",
            ]}
            donts={[
              "Use spinners for page-level content",
              "Show loading forever without timeout handling",
              "Block the entire UI for small updates",
              "Use unpredictable loading indicators",
            ]}
          />
        </section>

        {/* Error Handling */}
        <section className="space-y-8">
          <div>
            <Badge variant="secondary" className="mb-2">Pattern</Badge>
            <h2 className="font-display text-2xl font-bold">Error Handling</h2>
            <p className="text-muted-foreground mt-1">
              Graceful recovery from failed states.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <PreviewCard
              title="Inline Error"
              description="Non-blocking error message"
              tokens={["AlertBanner", "variant='danger'"]}
            >
              <AlertBanner
                variant="danger"
                title="Failed to save changes"
                dismissible
              >
                Please check your connection and try again.
              </AlertBanner>
            </PreviewCard>

            <PreviewCard
              title="Retry Pattern"
              description="With retry counter"
              tokens={["AlertBanner", "Button"]}
            >
              <AlertBanner
                variant="warning"
                title="Connection unstable"
                action={
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => setRetryCount((c) => c + 1)}
                  >
                    <RefreshCw className="h-3 w-3" />
                    Retry ({retryCount})
                  </Button>
                }
              >
                Having trouble reaching the server.
              </AlertBanner>
            </PreviewCard>

            <PreviewCard
              title="Full Page Error"
              description="When the page can't load"
              tokens={["EmptyState"]}
            >
              <EmptyState
                icon={AlertTriangle}
                title="Something went wrong"
                description="We couldn't load this page. Please try again later."
                action={{ label: "Retry", onClick: () => {}, icon: RefreshCw }}
                secondaryAction={{ label: "Go Back", onClick: () => {} }}
              />
            </PreviewCard>

            <PreviewCard
              title="Success Recovery"
              description="After error is resolved"
              tokens={["AlertBanner", "variant='success'"]}
            >
              <AlertBanner
                variant="success"
                title="Connection restored"
                dismissible
              >
                Your changes have been saved successfully.
              </AlertBanner>
            </PreviewCard>
          </div>

          <DosDonts
            dos={[
              "Explain what went wrong in plain language",
              "Offer a clear action to recover",
              "Preserve user input when possible",
              "Show success confirmation after recovery",
            ]}
            donts={[
              "Show raw error codes or stack traces",
              "Blame the user for the error",
              "Force users to start over",
              "Hide errors silently",
            ]}
          />
        </section>

        {/* State Transitions */}
        <section className="space-y-8">
          <div>
            <Badge variant="secondary" className="mb-2">Pattern</Badge>
            <h2 className="font-display text-2xl font-bold">State Transitions</h2>
            <p className="text-muted-foreground mt-1">
              Smooth transitions between states.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                  Idle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Default resting state. Ready for user interaction.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-info animate-pulse" />
                  Loading
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Operation in progress. Disable triggers, show feedback.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  Success
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Operation complete. Brief confirmation, then return to idle.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="p-6 rounded-xl border border-border bg-muted/30">
            <h3 className="font-semibold mb-4">State Flow</h3>
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="px-3 py-1 rounded bg-surface border">Idle</span>
              <span className="text-muted-foreground">→</span>
              <span className="px-3 py-1 rounded bg-info-soft text-info border border-info/20">Loading</span>
              <span className="text-muted-foreground">→</span>
              <span className="px-3 py-1 rounded bg-success-soft text-success border border-success/20">Success</span>
              <span className="text-muted-foreground">or</span>
              <span className="px-3 py-1 rounded bg-danger-soft text-danger border border-danger/20">Error</span>
              <span className="text-muted-foreground">→</span>
              <span className="px-3 py-1 rounded bg-surface border">Idle</span>
            </div>
          </div>

          <UsageRule
            title="Consistent state handling"
            description="Every async operation should follow the same Idle → Loading → Success/Error → Idle pattern for predictability."
            variant="success"
          />
        </section>
      </div>
    </DesignSystemLayout>
  );
}
