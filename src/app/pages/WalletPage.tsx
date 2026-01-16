import * as React from "react";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  ChevronRight,
  Plus,
  CreditCard,
  Building2,
  Sprout,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KPIBlock, KPIRow } from "@/components/ui/kpi-block";
import { List, ListRow } from "@/components/ui/list-row";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useAppData } from "@/contexts/AppDataContext";

export function WalletPage() {
  const navigate = useNavigate();
  const { loading: authLoading } = useAuth();
  const { sessions, stats, loading: dataLoading } = useAppData();

  const isLoading = authLoading || dataLoading;

  // Compute balance data from real sessions
  const balanceData = React.useMemo(() => {
    const completedSessions = sessions.filter(s => s.status === "completed");
    const pendingSessions = sessions.filter(s => s.status === "submitted");
    
    // Each point = $0.01 for demo purposes
    const available = completedSessions.reduce((acc, s) => acc + (s.points_earned || 0), 0) * 0.01;
    const pending = pendingSessions.reduce((acc, s) => acc + (s.points_earned || 0), 0) * 0.01;
    const lifetime = available + pending;
    
    return { available, pending, lifetime };
  }, [sessions]);

  // Build transactions from sessions
  const recentTransactions = React.useMemo(() => {
    return sessions.slice(0, 10).map(session => ({
      id: session.id,
      type: "earning" as const,
      title: session.challenge?.title || "Challenge completed",
      amount: `+$${((session.points_earned || 0) * 0.01).toFixed(2)}`,
      date: new Date(session.created_at).toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric",
        year: "numeric"
      }),
      status: session.status === "completed" ? "completed" : "pending",
    }));
  }, [sessions]);

  // Payment methods - empty for new users
  const paymentMethods: Array<{
    id: number;
    type: string;
    name: string;
    details: string;
    icon: typeof Building2;
    isDefault: boolean;
  }> = [];

  if (isLoading) {
    return (
      <div className="pb-4">
        <section className="px-4 pt-4">
          <Skeleton className="h-40 w-full rounded-xl" />
        </section>
        <section className="px-4 mt-4">
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </section>
        <section className="px-4 mt-6">
          <Skeleton className="h-10 w-full rounded-lg mb-4" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </section>
      </div>
    );
  }

  return (
    <div className="pb-4">
      {/* Balance Card */}
      <section className="px-4 pt-4">
        <Card className="p-5 bg-gradient-to-br from-brand-yellow/10 to-brand-yellow/5 border-brand-yellow/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
              <h2 className="text-4xl font-display font-bold text-foreground">
                ${balanceData.available.toFixed(2)}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-brand-yellow/20 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-brand-yellow" />
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <KPIRow dividers>
            <KPIBlock 
              label="Pending" 
              value={`$${balanceData.pending.toFixed(2)}`}
              size="sm"
            />
            <KPIBlock 
              label="Lifetime" 
              value={`$${balanceData.lifetime.toFixed(2)}`}
              size="sm"
            />
          </KPIRow>
        </Card>
      </section>

      {/* Action Buttons */}
      <section className="px-4 mt-4">
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full"
            onClick={() => navigate("/app/wallet/withdraw")}
            disabled={balanceData.available < 10}
          >
            <ArrowUpRight className="w-5 h-5 mr-2" />
            Withdraw
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full"
            onClick={() => navigate("/app/wallet/methods")}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Method
          </Button>
        </div>
        {balanceData.available < 10 && balanceData.available > 0 && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            Minimum withdrawal: $10.00
          </p>
        )}
      </section>

      {/* Tabs: Transactions & Payment Methods */}
      <section className="px-4 mt-6">
        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="transactions" className="flex-1">Transactions</TabsTrigger>
            <TabsTrigger value="methods" className="flex-1">Payment Methods</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="mt-4">
            {recentTransactions.length > 0 ? (
              <List>
                {recentTransactions.map((tx) => (
                  <ListRow
                    key={tx.id}
                    icon={tx.type === "earning" ? ArrowDownLeft : ArrowUpRight}
                    iconBg={tx.type === "earning" ? "bg-success/10" : "bg-warning/10"}
                    title={tx.title}
                    subtitle={tx.date}
                    meta={
                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-sm font-semibold ${
                          tx.type === "earning" ? "text-success" : "text-foreground"
                        }`}>
                          {tx.amount}
                        </span>
                        {tx.status === "pending" && (
                          <Badge variant="secondary" className="text-[10px]">Pending</Badge>
                        )}
                      </div>
                    }
                    showChevron
                    onClick={() => {}}
                  />
                ))}
              </List>
            ) : (
              <EmptyState
                icon={Sprout}
                title="No earnings yet"
                description="Complete challenges to start earning. Your transactions will appear here."
                variant="default"
                size="sm"
              />
            )}
          </TabsContent>

          <TabsContent value="methods" className="mt-4">
            {paymentMethods.length > 0 ? (
              <div className="space-y-3">
                <List>
                  {paymentMethods.map((method) => (
                    <ListRow
                      key={method.id}
                      icon={method.icon}
                      iconBg="bg-surface-2"
                      title={method.name}
                      subtitle={method.details}
                      meta={
                        method.isDefault && (
                          <Badge variant="secondary">Default</Badge>
                        )
                      }
                      showChevron
                      onClick={() => {}}
                    />
                  ))}
                </List>
                
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => navigate("/app/wallet/methods")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add payment method
                </Button>
              </div>
            ) : (
              <EmptyState
                title="No payment methods"
                description="Add a payment method to withdraw your earnings"
                action={{
                  label: "Add Method",
                  onClick: () => navigate("/app/wallet/methods"),
                }}
                variant="default"
                size="sm"
              />
            )}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
