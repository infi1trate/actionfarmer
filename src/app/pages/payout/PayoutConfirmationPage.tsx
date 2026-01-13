import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";

interface PayoutState {
  amount: number;
  method: string;
  processingTime: string;
}

export const PayoutConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as PayoutState | null;

  // Default values if navigated directly
  const amount = state?.amount || 0;
  const method = state?.method || "Bank Transfer";
  const processingTime = state?.processingTime || "3-5 business days";

  // Generate a mock reference number
  const referenceNumber = React.useMemo(() => {
    return `PO-${Date.now().toString(36).toUpperCase()}`;
  }, []);

  const handleDone = () => {
    navigate("/app/earnings");
  };

  const handleViewHistory = () => {
    navigate("/app/earnings");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Success Animation */}
        <div className="text-center space-y-6">
          {/* Checkmark */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto animate-in zoom-in-50 duration-500">
              <CheckCircle2 className="h-12 w-12 text-emerald-500" />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            <h1 className="text-2xl font-bold text-foreground">Payout Requested!</h1>
            <p className="text-muted-foreground">Your request has been submitted successfully</p>
          </div>
        </div>

        {/* Payout Details Card */}
        <Card className="mt-8 p-5 w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="text-lg font-bold text-foreground">${amount.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Method</span>
              <span className="text-sm font-medium text-foreground">{method}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Reference</span>
              <span className="text-sm font-mono text-foreground">{referenceNumber}</span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-sm text-muted-foreground">Expected Arrival</span>
              <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                {processingTime}
              </div>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="mt-4 p-4 w-full max-w-sm bg-muted/30 border-0 animate-in fade-in duration-500 delay-500">
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">What happens next?</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">1</span>
                </div>
                <p className="text-xs text-muted-foreground">We'll verify your request</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">2</span>
                </div>
                <p className="text-xs text-muted-foreground">Funds will be sent to your {method.toLowerCase()}</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">3</span>
                </div>
                <p className="text-xs text-muted-foreground">You'll receive a confirmation when complete</p>
              </li>
            </ul>
          </div>
        </Card>

        {/* Demo Notice */}
        <p className="mt-6 text-xs text-muted-foreground text-center max-w-xs animate-in fade-in duration-500 delay-700">
          This is a demonstration. No actual funds have been transferred.
        </p>
      </main>

      {/* Footer */}
      <div className="p-4 space-y-2 border-t border-border">
        <Button 
          className="w-full h-12 text-base font-semibold"
          onClick={handleDone}
        >
          Done
        </Button>
        <Button 
          variant="ghost"
          className="w-full h-10 text-sm text-muted-foreground"
          onClick={handleViewHistory}
        >
          View Payout History
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default PayoutConfirmationPage;
