import * as React from "react";
import { Gamepad2 } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export function PlayPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <EmptyState
        icon={Gamepad2}
        title="Play"
        description="Start a session to begin earning rewards"
        size="lg"
      />
    </div>
  );
}
