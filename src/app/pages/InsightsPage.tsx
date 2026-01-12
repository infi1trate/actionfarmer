import * as React from "react";
import { BarChart3 } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export function InsightsPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <EmptyState
        icon={BarChart3}
        title="Insights"
        description="Performance analytics and trends will appear here"
        size="lg"
      />
    </div>
  );
}
