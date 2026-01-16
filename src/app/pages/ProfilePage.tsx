import * as React from "react";
import { 
  User, 
  Shield, 
  HelpCircle, 
  LogOut,
  Moon,
  Smartphone,
  FileText,
  Mail,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { StreakBadge } from "@/components/ui/streak-indicator";
import { 
  SettingsGroup, 
  SettingsLinkRow, 
  SettingsToggleRow,
  SettingsButtonRow,
} from "@/components/shells";
import { useAuth } from "@/contexts/AuthContext";
import { useAppData } from "@/contexts/AppDataContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, profile, signOut, loading: authLoading } = useAuth();
  const { plant, stats, loading: dataLoading } = useAppData();
  
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);

  // Load notification preference
  React.useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("push_notifications_enabled")
        .eq("user_id", user.id)
        .single()
        .then(({ data }) => {
          if (data) {
            setNotifications(data.push_notifications_enabled ?? true);
          }
        });
    }
  }, [user]);

  const handleNotificationsChange = async (checked: boolean) => {
    setNotifications(checked);
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({ push_notifications_enabled: checked })
      .eq("user_id", user.id);

    if (error) {
      toast.error("Failed to update preference");
      setNotifications(!checked);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  const isLoading = authLoading || dataLoading;

  // Loading state with skeletons
  if (isLoading) {
    return (
      <div className="pb-4">
        <section className="px-4 pt-4">
          <Card className="p-5">
            <div className="flex items-center gap-4">
              <Skeleton className="w-16 h-16 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          </Card>
        </section>
        <div className="mt-6 space-y-6 px-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // Get user data
  const userName = profile?.first_name || "Friend";
  const userEmail = profile ? `User since ${new Date(profile.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}` : "";
  const currentStreak = plant?.current_stage || 0;

  return (
    <div className="pb-4">
      {/* Profile Header */}
      <section className="px-4 pt-4">
        <Card className="p-5">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-brand-yellow text-brand-yellow-foreground text-xl font-semibold">
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-semibold truncate">{userName}</h2>
                {stats.totalCompleted >= 10 && (
                  <Badge variant="secondary" className="shrink-0">Pro</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">{userEmail}</p>
              <div className="flex items-center gap-2 mt-2">
                {currentStreak > 0 && (
                  <StreakBadge count={currentStreak} variant="fire" size="sm" />
                )}
                <span className="text-xs text-muted-foreground">
                  {stats.totalCompleted} challenge{stats.totalCompleted !== 1 ? "s" : ""} completed
                </span>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Settings Groups */}
      <div className="mt-6 space-y-6">
        {/* Account Settings */}
        <SettingsGroup label="Account">
          <Card>
            <SettingsLinkRow
              label="Edit Profile"
              icon={User}
              iconBg="bg-info/10"
              onClick={() => navigate("/app/settings/profile")}
            />
            <Separator />
            <SettingsLinkRow
              label="Security"
              icon={Shield}
              iconBg="bg-warning/10"
              onClick={() => navigate("/app/settings/security")}
            />
          </Card>
        </SettingsGroup>

        {/* Preferences */}
        <SettingsGroup label="Preferences">
          <Card>
            <SettingsToggleRow
              label="Push Notifications"
              icon={Bell}
              iconBg="bg-brand-yellow/10"
              description="Get notified about earnings and missions"
              checked={notifications}
              onCheckedChange={handleNotificationsChange}
            />
            <Separator />
            <SettingsToggleRow
              label="Dark Mode"
              icon={Moon}
              iconBg="bg-surface-3"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </Card>
        </SettingsGroup>

        {/* Support */}
        <SettingsGroup label="Support">
          <Card>
            <SettingsLinkRow
              label="Help Center"
              icon={HelpCircle}
              iconBg="bg-info/10"
              onClick={() => {}}
            />
            <Separator />
            <SettingsLinkRow
              label="Contact Us"
              icon={Mail}
              iconBg="bg-success/10"
              onClick={() => {}}
            />
            <Separator />
            <SettingsLinkRow
              label="Terms & Privacy"
              icon={FileText}
              iconBg="bg-surface-2"
              onClick={() => {}}
            />
          </Card>
        </SettingsGroup>

        {/* App Info */}
        <SettingsGroup>
          <Card>
            <SettingsLinkRow
              label="App Version"
              icon={Smartphone}
              iconBg="bg-surface-2"
              value="1.0.0"
            />
          </Card>
        </SettingsGroup>

        {/* Sign Out */}
        <div className="px-4">
          <Card>
            <SettingsButtonRow
              label="Sign Out"
              icon={LogOut}
              iconBg="bg-danger/10"
              danger
              onClick={handleSignOut}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
