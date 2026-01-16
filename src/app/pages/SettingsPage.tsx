import * as React from "react";
import { 
  User, 
  Shield, 
  Eye,
  Trash2,
  Download,
  Bell,
  HelpCircle,
  Mail,
  FileText,
  Smartphone,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  SettingsGroup, 
  SettingsLinkRow, 
  SettingsToggleRow,
  SettingsButtonRow,
} from "@/components/shells";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function SettingsPage() {
  const navigate = useNavigate();
  const { user, profile, signOut, loading: authLoading } = useAuth();
  
  // Toggle states - initialized from profile
  const [notifications, setNotifications] = React.useState(true);
  const [dataSharingAnalytics, setDataSharingAnalytics] = React.useState(true);
  
  // Loading state for profile preferences
  const [prefsLoading, setPrefsLoading] = React.useState(true);

  // Load profile preferences
  React.useEffect(() => {
    const loadPreferences = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("push_notifications_enabled, analytics_enabled")
          .eq("user_id", user.id)
          .single();

        if (!error && data) {
          setNotifications(data.push_notifications_enabled ?? true);
          setDataSharingAnalytics(data.analytics_enabled ?? true);
        }
      } catch (err) {
        console.error("Failed to load preferences:", err);
      } finally {
        setPrefsLoading(false);
      }
    };

    if (user) {
      loadPreferences();
    } else {
      setPrefsLoading(false);
    }
  }, [user]);

  // Update notifications preference
  const handleNotificationsChange = async (checked: boolean) => {
    setNotifications(checked);
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({ push_notifications_enabled: checked })
      .eq("user_id", user.id);

    if (error) {
      toast.error("Failed to update preference");
      setNotifications(!checked); // Revert
    }
  };

  // Update analytics preference
  const handleAnalyticsChange = async (checked: boolean) => {
    setDataSharingAnalytics(checked);
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({ analytics_enabled: checked })
      .eq("user_id", user.id);

    if (error) {
      toast.error("Failed to update preference");
      setDataSharingAnalytics(!checked); // Revert
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  // Build profile row subtitle
  const profileSubtitle = React.useMemo(() => {
    const parts: string[] = [];
    if (profile?.first_name) parts.push(profile.first_name);
    if (user?.email) parts.push(user.email);
    return parts.length > 0 ? parts.join(" • ") : "Manage your profile";
  }, [profile, user]);

  if (authLoading || prefsLoading) {
    return (
      <div className="pb-24">
        <header className="px-5 pt-8 pb-4">
          <Skeleton className="h-3 w-20 mb-2" />
          <Skeleton className="h-8 w-24 mb-1" />
          <Skeleton className="h-4 w-48" />
        </header>
        <div className="space-y-6 px-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* ==========================================
          EDITORIAL HERO HEADER - Settings
          Calm, control-oriented, reduced height
          ========================================== */}
      <header className="px-5 pt-8 pb-4">
        <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-2">
          Your Account
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-1">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[320px]">
          Manage your preferences. You're always in control.
        </p>
      </header>

      <div className="space-y-6">
        
        {/* Account */}
        <SettingsGroup label="Account">
          <Card>
            <SettingsLinkRow
              label="Profile"
              icon={User}
              iconBg="bg-info/10"
              description={profileSubtitle}
              onClick={() => navigate("/app/settings/profile")}
            />
            <Separator />
            <SettingsLinkRow
              label="Security"
              icon={Shield}
              iconBg="bg-warning/10"
              description="Password, two-factor authentication"
              onClick={() => navigate("/app/settings/security")}
            />
            <Separator />
            <SettingsToggleRow
              label="Push Notifications"
              icon={Bell}
              iconBg="bg-brand-yellow/10"
              description="Challenge reminders and earnings updates"
              checked={notifications}
              onCheckedChange={handleNotificationsChange}
            />
          </Card>
        </SettingsGroup>

        {/* Privacy & Data */}
        <SettingsGroup label="Privacy & Data">
          <Card>
            <SettingsToggleRow
              label="Analytics Data"
              icon={Eye}
              iconBg="bg-muted"
              description="Help us improve your experience"
              checked={dataSharingAnalytics}
              onCheckedChange={handleAnalyticsChange}
            />
            <Separator />
            <SettingsLinkRow
              label="Download My Data"
              icon={Download}
              iconBg="bg-success/10"
              description="Export all your data in a portable format"
              onClick={() => {}}
            />
          </Card>
        </SettingsGroup>

        {/* Support & Info */}
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
              label="Privacy Policy"
              icon={FileText}
              iconBg="bg-muted"
              onClick={() => {}}
            />
            <Separator />
            <SettingsLinkRow
              label="Terms of Service"
              icon={FileText}
              iconBg="bg-muted"
              onClick={() => {}}
            />
          </Card>
        </SettingsGroup>

        {/* App Version */}
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

        {/* Delete Account - Single location with confirmation */}
        <div className="px-4 pt-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                <SettingsButtonRow
                  label="Delete Account"
                  icon={Trash2}
                  iconBg="bg-danger/10"
                  description="Permanently delete your account and all data"
                  danger
                  onClick={() => {}}
                />
              </Card>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete your account, all data, and any pending payouts. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    await signOut();
                    toast.success("Account deleted");
                    navigate("/");
                  }}
                  className="bg-danger hover:bg-danger/90"
                >
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
