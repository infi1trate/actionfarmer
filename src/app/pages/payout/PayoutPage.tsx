import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft,
  Wallet,
  CreditCard,
  Building2,
  Gift,
  ChevronRight,
  Check,
  AlertCircle,
  Info,
} from "lucide-react";

type PayoutMethod = "bank" | "paypal" | "giftcard" | null;

interface PayoutMethodOption {
  id: PayoutMethod;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  processingTime: string;
  minAmount: number;
  available: boolean;
}

const payoutMethods: PayoutMethodOption[] = [
  {
    id: "bank",
    name: "Bank Transfer",
    description: "Direct deposit to your bank account",
    icon: Building2,
    processingTime: "3-5 business days",
    minAmount: 25,
    available: true,
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Send to your PayPal email",
    icon: CreditCard,
    processingTime: "1-2 business days",
    minAmount: 10,
    available: true,
  },
  {
    id: "giftcard",
    name: "Gift Card",
    description: "Redeem for popular retailer gift cards",
    icon: Gift,
    processingTime: "Instant",
    minAmount: 5,
    available: true,
  },
];

// Mock balance data - no crypto, no volatility
const balanceData = {
  available: 47.50,
  pending: 12.25,
  lifetime: 284.75,
  currency: "USD",
};

export const PayoutPage = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = React.useState<PayoutMethod>(null);
  const [amount, setAmount] = React.useState("");
  const [step, setStep] = React.useState<"select" | "amount" | "review">("select");

  const selectedMethodData = payoutMethods.find(m => m.id === selectedMethod);
  const parsedAmount = parseFloat(amount) || 0;
  const isValidAmount = parsedAmount >= (selectedMethodData?.minAmount || 0) && parsedAmount <= balanceData.available;

  const handleMethodSelect = (methodId: PayoutMethod) => {
    setSelectedMethod(methodId);
    setStep("amount");
  };

  const handleAmountContinue = () => {
    if (isValidAmount) {
      setStep("review");
    }
  };

  const handleRequestPayout = () => {
    // Navigate to confirmation with mock data
    navigate("/payout/confirmation", { 
      state: { 
        amount: parsedAmount, 
        method: selectedMethodData?.name,
        processingTime: selectedMethodData?.processingTime,
      } 
    });
  };

  const handleBack = () => {
    if (step === "amount") {
      setStep("select");
      setSelectedMethod(null);
    } else if (step === "review") {
      setStep("amount");
    } else {
      navigate("/app/earnings");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 p-4 border-b border-border">
        <button 
          onClick={handleBack}
          className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">
          {step === "select" && "Request Payout"}
          {step === "amount" && "Enter Amount"}
          {step === "review" && "Review Payout"}
        </h1>
      </header>

      {/* Balance Summary */}
      <div className="p-4">
        <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-2xl font-bold text-foreground">
                ${balanceData.available.toFixed(2)}
              </p>
              {balanceData.pending > 0 && (
                <p className="text-xs text-muted-foreground">
                  + ${balanceData.pending.toFixed(2)} pending
                </p>
              )}
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Step Content */}
      <main className="flex-1 p-4 pb-32">
        {/* Step 1: Select Method */}
        {step === "select" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground px-1">
              Choose how you'd like to receive your payout
            </p>
            
            <div className="space-y-2">
              {payoutMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <Card
                    key={method.id}
                    className={`p-4 cursor-pointer transition-all ${
                      method.available 
                        ? "hover:bg-muted/30 active:scale-[0.99]" 
                        : "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={() => method.available && handleMethodSelect(method.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground">{method.name}</p>
                          {method.processingTime === "Instant" && (
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-emerald-500/10 text-emerald-600 border-0">
                              Instant
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{method.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Min: ${method.minAmount} • {method.processingTime}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Enter Amount */}
        {step === "amount" && selectedMethodData && (
          <div className="space-y-6">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <selectedMethodData.icon className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{selectedMethodData.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedMethodData.processingTime}</p>
                </div>
              </div>
            </Card>

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
                  min={selectedMethodData.minAmount}
                  max={balanceData.available}
                  step="0.01"
                />
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Min: ${selectedMethodData.minAmount.toFixed(2)}</span>
                <button 
                  className="text-primary font-medium"
                  onClick={() => setAmount(balanceData.available.toString())}
                >
                  Withdraw All
                </button>
              </div>

              {parsedAmount > 0 && parsedAmount < selectedMethodData.minAmount && (
                <div className="flex items-center gap-2 text-amber-600 text-xs">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Minimum withdrawal is ${selectedMethodData.minAmount.toFixed(2)}</span>
                </div>
              )}

              {parsedAmount > balanceData.available && (
                <div className="flex items-center gap-2 text-rose-600 text-xs">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Amount exceeds available balance</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === "review" && selectedMethodData && (
          <div className="space-y-6">
            <Card className="p-4 space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Payout Summary</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span className="text-sm font-medium text-foreground">${parsedAmount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Method</span>
                  <span className="text-sm font-medium text-foreground">{selectedMethodData.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Processing Time</span>
                  <span className="text-sm font-medium text-foreground">{selectedMethodData.processingTime}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-sm text-muted-foreground">Remaining Balance</span>
                  <span className="text-sm font-medium text-foreground">
                    ${(balanceData.available - parsedAmount).toFixed(2)}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-3 bg-muted/30 border-0">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  This is a demo. No actual funds will be transferred. In a real application, you would be asked to verify your payout details.
                </p>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Footer Actions */}
      {step !== "select" && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
          {step === "amount" && (
            <Button 
              className="w-full h-12 text-base font-semibold"
              onClick={handleAmountContinue}
              disabled={!isValidAmount}
            >
              Continue
            </Button>
          )}
          {step === "review" && (
            <Button 
              className="w-full h-12 text-base font-semibold"
              onClick={handleRequestPayout}
            >
              <Check className="h-5 w-5 mr-2" />
              Request Payout
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PayoutPage;
