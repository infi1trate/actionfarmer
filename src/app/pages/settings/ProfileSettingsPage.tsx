import * as React from "react";
import { ArrowLeft, User, Mail, LogOut, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function ProfileSettingsPage() {
  const navigate = useNavigate();
  const { user, profile, signOut, loading: authLoading } = useAuth();

  const [firstName, setFirstName] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);
  const [hasChanges, setHasChanges] = React.useState(false);

  // Initialize form with profile data
  React.useEffect(() => {
    if (profile?.first_name) {
      setFirstName(profile.first_name);
    }
  }, [profile]);

  // Track changes
  React.useEffect(() => {
    if (profile?.first_name) {
      setHasChanges(firstName !== profile.first_name);
    }
  }, [firstName, profile]);

  const handleSave = async () => {
    if (!user || !hasChanges) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ first_name: firstName.trim() })
        .eq("user_id", user.id);

      if (error) throw error;

      toast.success("Profile updated successfully");
      setHasChanges(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  if (authLoading) {
    return (
      <div className="pb-24">
        <header className="px-5 pt-8 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-8 w-32" />
        </header>
        <div className="px-4 space-y-4">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="px-5 pt-8 pb-6">
        <button
          onClick={() => navigate("/app/settings")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm">Settings</span>
        </button>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Profile
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your personal information
        </p>
      </header>

      <div className="px-4 space-y-6">
        {/* Name Field */}
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-info/10 flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-info" />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">
                First Name
              </Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Your first name"
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        {/* Email Field (Read-only) */}
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <Mail className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 space-y-2">
              <Label className="text-sm font-medium">
                Email
              </Label>
              <Input
                value={user?.email || ""}
                disabled
                className="mt-1 bg-muted/50"
              />
              <p className="text-xs text-muted-foreground">
                Email changes are not available yet
              </p>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        {hasChanges && (
          <Button
            onClick={handleSave}
            disabled={isSaving || !firstName.trim()}
            className="w-full gap-2"
            size="lg"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        )}

        {/* Sign Out */}
        <Card className="mt-8">
          <button
            onClick={handleSignOut}
            className="w-full p-4 flex items-center gap-3 text-danger hover:bg-danger/5 transition-colors rounded-xl"
          >
            <div className="h-10 w-10 rounded-full bg-danger/10 flex items-center justify-center">
              <LogOut className="h-5 w-5 text-danger" />
            </div>
            <span className="font-medium">Sign Out</span>
          </button>
        </Card>
      </div>
    </div>
  );
}
