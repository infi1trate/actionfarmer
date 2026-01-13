import * as React from "react";
import { Target } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export function PlayPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <EmptyState
        icon={Target}
        title="Challenges"
        description="Start a challenge to begin earning rewards"
        size="lg"
      />
    </div>
  );
}
