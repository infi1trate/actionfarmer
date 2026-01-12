import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Home, Gamepad2, DollarSign, BarChart3, Settings } from "lucide-react";
import { MainAppShell } from "@/components/shells";
import type { TabItem } from "@/components/ui/bottom-tab-bar";

const tabs: TabItem[] = [
  { icon: Home, label: "Home", href: "/app" },
  { icon: Gamepad2, label: "Play", href: "/app/play" },
  { icon: DollarSign, label: "Earnings", href: "/app/earnings" },
  { icon: BarChart3, label: "Insights", href: "/app/insights" },
  { icon: Settings, label: "Settings", href: "/app/settings" },
];

export function AppLayout() {
  const location = useLocation();
  
  // Determine title based on current route
  const getTitle = () => {
    if (location.pathname === "/app") return "Home";
    if (location.pathname.startsWith("/app/play")) return "Play";
    if (location.pathname.startsWith("/app/earnings")) return "Earnings";
    if (location.pathname.startsWith("/app/insights")) return "Insights";
    if (location.pathname.startsWith("/app/settings")) return "Settings";
    return "MoveAI";
  };

  return (
    <MainAppShell
      title={getTitle()}
      tabs={tabs}
      showBottomTabs={true}
      scrollable={true}
    >
      <Outlet />
    </MainAppShell>
  );
}
