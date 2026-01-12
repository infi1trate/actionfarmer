import * as React from "react";
import { Home } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export function HomePage() {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <EmptyState
        icon={Home}
        title="Home"
        description="Your dashboard and activity overview will appear here"
        size="lg"
      />
    </div>
  );
}

// Activity Item Component
interface ActivityItemProps {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  time: string;
}

function ActivityItem({ icon, iconBg, iconColor, title, subtitle, time }: ActivityItemProps) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center ${iconColor}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{title}</p>
        <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
      </div>
      <span className="text-xs text-muted-foreground shrink-0">{time}</span>
    </div>
  );
}
