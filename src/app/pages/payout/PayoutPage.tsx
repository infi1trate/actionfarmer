import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ArrowLeft,
  Wallet,
  ChevronDown,
  ChevronUp,
  Check,
  AlertCircle,
  Info,
  ExternalLink,
  Clock,
  Loader2,
  Leaf,
  RefreshCw,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useAppData } from "@/contexts/AppDataContext";
import { toast } from "sonner";

type OnboardingStatus = "not_connected" | "pending" | "enabled";

interface PayoutRequest {
  id: string;
  amount_cents: number;
  status: "requested" | "processing" | "paid" | "failed" | "canceled";
  created_at: string;
}

const MIN_PAYOUT_CENTS = 1000; // $10 minimum

const formatCents = (cents: number): string => {
  return `$${(cents / 100).toFixed(2)}`;
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "paid": return "text-emerald-600 bg-emerald-50";
    case "processing": case "requested": return "text-amber-600 bg-amber-50";
    case "failed": case "canceled": return "text-rose-600 bg-rose-50";
    default: return "text-muted-foreground bg-muted";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "paid": return "Paid";
    case "processing": return "Processing";
    case "requested": return "Requested";
    case "failed": return "Failed";
    case "canceled": return "Canceled";
    default: return status;
  }
};

export const PayoutPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { wallet, refreshData } = useAppData();

  // State
  const [loading, setLoading] = React.useState(true);
  const [onboardingStatus, setOnboardingStatus] = React.useState<OnboardingStatus>("not_connected");
  const [payoutsEnabled, setPayoutsEnabled] = React.useState(false);
  const [payoutHistory, setPayoutHistory] = React.useState<PayoutRequest[]>([]);
  const [pendingPayout, setPendingPayout] = React.useState<PayoutRequest | null>(null);
  
  // UI State
  const [showHowItWorks, setShowHowItWorks] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [actionLoading, setActionLoading] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [successAmount, setSuccessAmount] = React.useState(0);

  const availableBalance = wallet?.available_balance_cents || 0;
  const pendingBalance = wallet?.pending_balance_cents || 0;
  const parsedAmount = parseFloat(amount) * 100 || 0; // Convert to cents
  const isValidAmount = parsedAmount >= MIN_PAYOUT_CENTS && parsedAmount <= availableBalance;

  // Fetch status and history on mount
  const fetchStatus = React.useCallback(async () => {
    if (!user) return;

    try {
      // Refresh connect status from Stripe
      const { data, error } = await supabase.functions.invoke("stripe-refresh-connect-status");
      
      if (error) {
        console.error("Error refreshing status:", error);
      } else if (data) {
        setOnboardingStatus(data.stripe_onboarding_status || "not_connected");
        setPayoutsEnabled(data.payouts_enabled || false);
      }

      // Fetch payout history
      const { data: payouts, error: payoutsError } = await supabase
        .from("payout_requests")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);

      if (!payoutsError && payouts) {
        setPayoutHistory(payouts as PayoutRequest[]);
        
        // Find pending payout
        const pending = payouts.find(p => p.status === "requested" || p.status === "processing");
        setPendingPayout(pending as PayoutRequest | null);
      }
    } catch (err) {
      console.error("Error fetching status:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  React.useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // Handle ?connected=1 query param (returning from Stripe)
  React.useEffect(() => {
    if (searchParams.get("connected") === "1") {
      toast.success("Stripe connected successfully!");
      fetchStatus();
      // Clean URL
      navigate("/app/payout", { replace: true });
    }
  }, [searchParams, navigate, fetchStatus]);

  const handleConnectStripe = async () => {
    setActionLoading(true);
    try {
      // First create/get the Connect account
      const { error: accountError } = await supabase.functions.invoke("stripe-connect-account");
      
      if (accountError) {
        toast.error("Failed to create Stripe account");
        return;
      }

      // Then get the onboarding link
      const { data, error } = await supabase.functions.invoke("stripe-onboarding-link", {
        body: {
          return_url: `${window.location.origin}/app/payout?connected=1`,
          refresh_url: `${window.location.origin}/app/payout?refresh=1`,
        },
      });

      if (error || !data?.url) {
        toast.error("Failed to get onboarding link");
        return;
      }

      // Redirect to Stripe
      window.location.href = data.url;
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleContinueSetup = async () => {
    setActionLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("stripe-onboarding-link", {
        body: {
          return_url: `${window.location.origin}/app/payout?connected=1`,
          refresh_url: `${window.location.origin}/app/payout?refresh=1`,
        },
      });

      if (error || !data?.url) {
        toast.error("Failed to get onboarding link");
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRequestPayout = async () => {
    if (!isValidAmount) return;

    setActionLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("request-payout", {
        body: { amount_cents: parsedAmount },
      });

      if (error || data?.error) {
        toast.error(data?.error || "Failed to request payout");
        return;
      }

      // Success!
      setSuccessAmount(parsedAmount);
      setShowConfirmation(false);
      setShowSuccess(true);
      setAmount("");
      
      // Refresh data
      await refreshData();
      await fetchStatus();
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRefreshStatus = async () => {
    setActionLoading(true);
    await fetchStatus();
    await refreshData();
    setActionLoading(false);
    toast.success("Status refreshed");
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="flex items-center gap-3 p-4 border-b border-border">
          <button onClick={() => navigate("/app/earnings")} className="p-2 -ml-2 hover:bg-muted rounded-lg">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Cash Out</h1>
        </header>
        <div className="p-4 space-y-4">
          <Skeleton className="h-24 rounded-2xl" />
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
        </div>
      </div>
    );
  }

  // Success state
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="flex items-center gap-3 p-4 border-b border-border">
          <button onClick={() => navigate("/app/earnings")} className="p-2 -ml-2 hover:bg-muted rounded-lg">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Cash Out</h1>
        </header>
        
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Payout Requested 🌿</h2>
          <p className="text-muted-foreground mb-6">
            {formatCents(successAmount)} is on its way to your bank account
          </p>
          
          <Card className="p-4 w-full max-w-sm mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Timeline</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-foreground">Request submitted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-muted" />
                <span className="text-muted-foreground">Processing (1-2 days)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-muted" />
                <span className="text-muted-foreground">Arrives in bank (2-3 days)</span>
              </div>
            </div>
          </Card>

          <Button onClick={() => setShowSuccess(false)} variant="outline" className="mb-2">
            Request another payout
          </Button>
          <Button onClick={() => navigate("/app/earnings")} variant="ghost">
            Back to Earnings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/app/earnings")} className="p-2 -ml-2 hover:bg-muted rounded-lg">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Cash Out</h1>
        </div>
        <button 
          onClick={handleRefreshStatus}
          disabled={actionLoading}
          className="p-2 hover:bg-muted rounded-lg"
        >
          <RefreshCw className={`h-4 w-4 text-muted-foreground ${actionLoading ? "animate-spin" : ""}`} />
        </button>
      </header>

      {/* Balance Summary */}
      <div className="p-4">
        <Card className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-3xl font-bold text-foreground">{formatCents(availableBalance)}</p>
              {pendingBalance > 0 && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatCents(pendingBalance)} pending
                </p>
              )}
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 pb-32 space-y-4">
        {/* State A: Not connected to Stripe */}
        {onboardingStatus === "not_connected" && (
          <>
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Cash out your harvest</h2>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                Connect to Stripe to withdraw your earnings to your bank account
              </p>
            </div>

            <Button 
              onClick={handleConnectStripe}
              disabled={actionLoading}
              className="w-full h-12 text-base font-semibold"
            >
              {actionLoading ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : (
                <ExternalLink className="h-5 w-5 mr-2" />
              )}
              Connect to Stripe
            </Button>

            {/* How it works */}
            <Card className="p-4">
              <button 
                onClick={() => setShowHowItWorks(!showHowItWorks)}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-sm font-medium text-foreground">How it works</span>
                {showHowItWorks ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              {showHowItWorks && (
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-primary">1</span>
                    </div>
                    <p>Connect your Stripe account (takes ~2 minutes)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-primary">2</span>
                    </div>
                    <p>Request a payout when you have $10+ available</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-primary">3</span>
                    </div>
                    <p>Funds arrive in your bank in 2-3 business days</p>
                  </div>
                </div>
              )}
            </Card>
          </>
        )}

        {/* State B: Stripe onboarding pending */}
        {onboardingStatus === "pending" && (
          <>
            <Card className="p-5 bg-amber-50 border-amber-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-amber-900 mb-1">Stripe setup in progress</h3>
                  <p className="text-sm text-amber-700">
                    Complete your Stripe verification to start cashing out
                  </p>
                </div>
              </div>
            </Card>

            <Button 
              onClick={handleContinueSetup}
              disabled={actionLoading}
              className="w-full h-12 text-base font-semibold"
            >
              {actionLoading ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : (
                <ExternalLink className="h-5 w-5 mr-2" />
              )}
              Continue Stripe Setup
            </Button>

            <Card className="p-3 bg-muted/30 border-0">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  You can return anytime — your balance is safe and will be here when you're ready.
                </p>
              </div>
            </Card>
          </>
        )}

        {/* State C: Stripe enabled - ready to cash out */}
        {onboardingStatus === "enabled" && payoutsEnabled && !pendingPayout && (
          <>
            {!showConfirmation ? (
              <>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Amount to withdraw</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-muted-foreground">$</span>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-8 text-lg h-14 text-center"
                      min={MIN_PAYOUT_CENTS / 100}
                      max={availableBalance / 100}
                      step="0.01"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Min: {formatCents(MIN_PAYOUT_CENTS)}</span>
                    <button 
                      className="text-primary font-medium"
                      onClick={() => setAmount((availableBalance / 100).toFixed(2))}
                    >
                      Withdraw All
                    </button>
                  </div>

                  {parsedAmount > 0 && parsedAmount < MIN_PAYOUT_CENTS && (
                    <div className="flex items-center gap-2 text-amber-600 text-xs">
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>Minimum payout is {formatCents(MIN_PAYOUT_CENTS)}</span>
                    </div>
                  )}

                  {availableBalance < MIN_PAYOUT_CENTS && (
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                      <Info className="h-3.5 w-3.5" />
                      <span>You need at least {formatCents(MIN_PAYOUT_CENTS)} to request a payout</span>
                    </div>
                  )}

                  {parsedAmount > availableBalance && (
                    <div className="flex items-center gap-2 text-rose-600 text-xs">
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>Amount exceeds available balance</span>
                    </div>
                  )}
                </div>

                <Button 
                  onClick={() => setShowConfirmation(true)}
                  disabled={!isValidAmount || availableBalance < MIN_PAYOUT_CENTS}
                  className="w-full h-12 text-base font-semibold"
                >
                  Request Payout
                </Button>
              </>
            ) : (
              <>
                <Card className="p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-foreground">Confirm Payout</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Amount</span>
                      <span className="text-lg font-bold text-foreground">{formatCents(parsedAmount)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Arrival estimate</span>
                      <span className="text-sm font-medium text-foreground">2-3 business days</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-sm text-muted-foreground">Remaining balance</span>
                      <span className="text-sm font-medium text-foreground">
                        {formatCents(availableBalance - parsedAmount)}
                      </span>
                    </div>
                  </div>
                </Card>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowConfirmation(false)}
                    className="flex-1 h-12"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleRequestPayout}
                    disabled={actionLoading}
                    className="flex-1 h-12 font-semibold"
                  >
                    {actionLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <Check className="h-5 w-5 mr-2" />
                        Confirm
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </>
        )}

        {/* State D: Active pending payout */}
        {pendingPayout && (
          <>
            <Card className="p-5 bg-amber-50 border-amber-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-amber-900 mb-1">Payout in progress</h3>
                  <p className="text-lg font-bold text-amber-900">{formatCents(pendingPayout.amount_cents)}</p>
                  <p className="text-xs text-amber-700 mt-1">
                    Requested {formatDate(pendingPayout.created_at)}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pendingPayout.status)}`}>
                  {getStatusLabel(pendingPayout.status)}
                </span>
              </div>
            </Card>

            <Card className="p-3 bg-muted/30 border-0">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  You can request another payout once this one completes.
                </p>
              </div>
            </Card>
          </>
        )}

        {/* Payout History */}
        {payoutHistory.length > 0 && (
          <div className="pt-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Payout History</h3>
            <Card className="divide-y divide-border">
              {payoutHistory.slice(0, 10).map((payout) => (
                <div key={payout.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{formatCents(payout.amount_cents)}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(payout.created_at)}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payout.status)}`}>
                    {getStatusLabel(payout.status)}
                  </span>
                </div>
              ))}
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default PayoutPage;
