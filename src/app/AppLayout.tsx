import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Home, Activity, Wallet, User } from "lucide-react";
import { MainAppShell } from "@/components/shells";
import type { TabItem } from "@/components/ui/bottom-tab-bar";

const tabs: TabItem[] = [
  { icon: Home, label: "Home", href: "/app" },
  { icon: Activity, label: "Activity", href: "/app/activity" },
  { icon: Wallet, label: "Wallet", href: "/app/wallet" },
  { icon: User, label: "Profile", href: "/app/profile" },
];

export function AppLayout() {
  const location = useLocation();
  
  // Determine title based on current route
  const getTitle = () => {
    if (location.pathname === "/app") return "Home";
    if (location.pathname.startsWith("/app/activity")) return "Activity";
    if (location.pathname.startsWith("/app/wallet")) return "Wallet";
    if (location.pathname.startsWith("/app/profile")) return "Profile";
    return "DePIN";
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
