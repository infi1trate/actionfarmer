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
  Bitcoin
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

// Mock data
const balanceData = {
  available: 127.45,
  pending: 12.30,
  lifetime: 892.75,
};

const recentTransactions = [
  {
    id: 1,
    type: "earning",
    title: "Device uptime reward",
    amount: "+$0.42",
    date: "Today, 2:34 PM",
    status: "completed",
  },
  {
    id: 2,
    type: "earning",
    title: "Peak hours bonus",
    amount: "+$1.20",
    date: "Today, 8:00 AM",
    status: "completed",
  },
  {
    id: 3,
    type: "withdrawal",
    title: "Withdrawal to Bank",
    amount: "-$50.00",
    date: "Jan 10, 2025",
    status: "completed",
  },
  {
    id: 4,
    type: "earning",
    title: "Mission reward",
    amount: "+$5.00",
    date: "Jan 9, 2025",
    status: "completed",
  },
  {
    id: 5,
    type: "earning",
    title: "Network contribution",
    amount: "+$3.15",
    date: "Jan 8, 2025",
    status: "pending",
  },
];

const paymentMethods = [
  {
    id: 1,
    type: "bank",
    name: "Bank Account",
    details: "••••4582",
    icon: Building2,
    isDefault: true,
  },
  {
    id: 2,
    type: "card",
    name: "Debit Card",
    details: "••••7823",
    icon: CreditCard,
    isDefault: false,
  },
];

export function WalletPage() {
  const navigate = useNavigate();

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
                title="No transactions yet"
                description="Your earnings and withdrawals will appear here"
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
