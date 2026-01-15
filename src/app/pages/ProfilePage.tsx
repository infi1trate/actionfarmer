import * as React from "react";
import { 
  User, 
  Wifi, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  Moon,
  Smartphone,
  FileText,
  Mail,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StreakBadge } from "@/components/ui/streak-indicator";
import { 
  SettingsGroup, 
  SettingsLinkRow, 
  SettingsToggleRow,
  SettingsButtonRow,
} from "@/components/shells";
import { useAuth } from "@/contexts/AuthContext";
import { useAppData } from "@/contexts/AppDataContext";
import { toast } from "sonner";

export function ProfilePage() {
  const navigate = useNavigate();
  const { profile, signOut, loading: authLoading } = useAuth();
  const { plant, stats, loading: dataLoading } = useAppData();
  
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  // Loading state
  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
                  {stats.totalCompleted} challenges completed
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
              onClick={() => navigate("/app/profile/edit")}
            />
            <Separator />
            <SettingsLinkRow
              label="Security"
              icon={Shield}
              iconBg="bg-warning/10"
              onClick={() => navigate("/app/profile/security")}
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
              onCheckedChange={setNotifications}
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
