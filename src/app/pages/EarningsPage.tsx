import * as React from "react";
import { DollarSign } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export function EarningsPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <EmptyState
        icon={DollarSign}
        title="Earnings"
        description="Your earnings and payout history will appear here"
        size="lg"
      />
    </div>
  );
}
