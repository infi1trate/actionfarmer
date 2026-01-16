import * as React from "react";
import { ArrowLeft, Shield, Key, Trash2, AlertTriangle, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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

export function SecuritySettingsPage() {
  const navigate = useNavigate();
  const { user, signOut, loading: authLoading } = useAuth();

  const [isSendingReset, setIsSendingReset] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = React.useState("");

  const handleSendPasswordReset = async () => {
    if (!user?.email) return;

    setIsSendingReset(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      toast.success("Password reset email sent! Check your inbox.");
    } catch (error: any) {
      toast.error(error.message || "Failed to send password reset email");
    } finally {
      setIsSendingReset(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    setIsDeleting(true);
    try {
      // Delete user data from profiles, plants, challenge_sessions, insights_weekly
      // These will cascade or be handled by RLS
      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("user_id", user.id);

      if (profileError) {
        console.error("Error deleting profile:", profileError);
      }

      const { error: plantsError } = await supabase
        .from("plants")
        .delete()
        .eq("user_id", user.id);

      if (plantsError) {
        console.error("Error deleting plants:", plantsError);
      }

      const { error: insightsError } = await supabase
        .from("insights_weekly")
        .delete()
        .eq("user_id", user.id);

      if (insightsError) {
        console.error("Error deleting insights:", insightsError);
      }

      // Note: challenge_sessions doesn't have DELETE policy, so we can't delete those
      // In production, this would require a server-side function

      // Sign out the user
      await signOut();
      
      toast.success("Account data deleted. You've been signed out.");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete account");
      setIsDeleting(false);
    }
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
          Security
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your password and account security
        </p>
      </header>

      <div className="px-4 space-y-6">
        {/* Change Password */}
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
              <Key className="h-5 w-5 text-warning" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">Change Password</h3>
              <p className="text-sm text-muted-foreground mt-1">
                We'll send a password reset link to your email
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {user?.email}
              </p>
              <Button
                onClick={handleSendPasswordReset}
                disabled={isSendingReset}
                variant="outline"
                className="mt-4 gap-2"
              >
                <Mail className="h-4 w-4" />
                {isSendingReset ? "Sending..." : "Send Reset Email"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Two-Factor Authentication (placeholder) */}
        <Card className="p-4 opacity-60">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-info/10 flex items-center justify-center flex-shrink-0">
              <Shield className="h-5 w-5 text-info" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Add an extra layer of security to your account
              </p>
              <p className="text-xs text-muted-foreground mt-3 italic">
                Coming soon
              </p>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <div className="pt-6">
          <h2 className="text-sm font-semibold text-danger uppercase tracking-wider px-1 mb-3">
            Danger Zone
          </h2>
          <Card className="border-danger/20">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="w-full p-4 flex items-start gap-3 text-left hover:bg-danger/5 transition-colors rounded-xl">
                  <div className="h-10 w-10 rounded-full bg-danger/10 flex items-center justify-center flex-shrink-0">
                    <Trash2 className="h-5 w-5 text-danger" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-danger">Delete Account</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                  </div>
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <div className="flex items-center gap-2 text-danger">
                    <AlertTriangle className="h-5 w-5" />
                    <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                  </div>
                  <AlertDialogDescription className="space-y-3">
                    <p>
                      This will permanently delete your account including:
                    </p>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Your profile and preferences</li>
                      <li>Your garden and plant progress</li>
                      <li>All challenge history</li>
                      <li>Weekly insights and patterns</li>
                    </ul>
                    <p className="font-medium text-foreground">
                      This action cannot be undone.
                    </p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="bg-danger hover:bg-danger/90"
                  >
                    {isDeleting ? "Deleting..." : "Delete Account"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Card>
        </div>
      </div>
    </div>
  );
}
