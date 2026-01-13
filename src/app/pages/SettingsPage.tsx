import * as React from "react";
import { 
  User, 
  Shield, 
  Eye,
  Trash2,
  Download,
  Camera,
  Grid3X3,
  Calendar,
  Clock,
  Pause,
  Power,
  Bell,
  Moon,
  HelpCircle,
  Mail,
  FileText,
  Smartphone,
  LogOut,
  AlertTriangle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
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

export function SettingsPage() {
  const navigate = useNavigate();
  
  // Toggle states
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [dataSharingResearch, setDataSharingResearch] = React.useState(false);
  const [dataSharingAnalytics, setDataSharingAnalytics] = React.useState(true);
  const [isPaused, setIsPaused] = React.useState(false);

  const handleSignOut = () => {
    navigate("/onboarding");
  };

  const handleDeleteData = () => {
    // Mock: Would trigger data deletion
    console.log("Data deletion requested");
  };

  const handleDeleteAccount = () => {
    // Mock: Would trigger account deletion
    navigate("/onboarding");
  };

  const handleKillSwitch = () => {
    // Mock: Immediately stops all recording
    setIsPaused(true);
    console.log("Kill switch activated - all recording stopped");
  };

  return (
    <div className="pb-4">
      <div className="mt-2 space-y-6">
        
        {/* Account */}
        <SettingsGroup label="Account">
          <Card>
            <SettingsLinkRow
              label="Profile"
              icon={User}
              iconBg="bg-info/10"
              description="Name, email, profile picture"
              onClick={() => navigate("/app/profile")}
            />
            <Separator />
            <SettingsLinkRow
              label="Security"
              icon={Shield}
              iconBg="bg-warning/10"
              description="Password, two-factor authentication"
              onClick={() => {}}
            />
            <Separator />
            <SettingsToggleRow
              label="Push Notifications"
              icon={Bell}
              iconBg="bg-brand-yellow/10"
              description="Challenge reminders and earnings updates"
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

        {/* Privacy & Data */}
        <SettingsGroup label="Privacy & Data">
          <Card>
            <SettingsToggleRow
              label="Share for Research"
              icon={Eye}
              iconBg="bg-info/10"
              description="Contribute anonymized data to improve the platform"
              checked={dataSharingResearch}
              onCheckedChange={setDataSharingResearch}
            />
            <Separator />
            <SettingsToggleRow
              label="Analytics Data"
              icon={Eye}
              iconBg="bg-muted"
              description="Help us improve your experience"
              checked={dataSharingAnalytics}
              onCheckedChange={setDataSharingAnalytics}
            />
            <Separator />
            <SettingsLinkRow
              label="Download My Data"
              icon={Download}
              iconBg="bg-success/10"
              description="Export all your data in a portable format"
              onClick={() => {}}
            />
            <Separator />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div>
                  <SettingsButtonRow
                    label="Delete All Data"
                    icon={Trash2}
                    iconBg="bg-danger/10"
                    description="Permanently remove all recorded data"
                    danger
                    onClick={() => {}}
                  />
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete all data?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your recorded data, insights, and activity history. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteData}
                    className="bg-danger hover:bg-danger/90"
                  >
                    Delete All Data
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Separator />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div>
                  <SettingsButtonRow
                    label="Delete Account"
                    icon={Trash2}
                    iconBg="bg-danger/10"
                    description="Permanently delete your account and all data"
                    danger
                    onClick={() => {}}
                  />
                </div>
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
                    onClick={handleDeleteAccount}
                    className="bg-danger hover:bg-danger/90"
                  >
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Card>
        </SettingsGroup>

        {/* Camera & Zones */}
        <SettingsGroup label="Camera & Zones">
          <Card>
            <SettingsLinkRow
              label="Camera Setup"
              icon={Camera}
              iconBg="bg-info/10"
              description="Position and permissions"
              onClick={() => navigate("/onboarding/camera-placement")}
            />
            <Separator />
            <SettingsLinkRow
              label="Privacy Zones"
              icon={Grid3X3}
              iconBg="bg-warning/10"
              description="Areas excluded from recording"
              onClick={() => navigate("/onboarding/zone-selection")}
            />
          </Card>
        </SettingsGroup>

        {/* Ambient Mode */}
        <SettingsGroup label="Ambient Mode">
          <Card>
            <SettingsToggleRow
              label="Enable Ambient Mode"
              icon={Camera}
              iconBg="bg-success/10"
              description="Earn points passively in the background"
              checked={dataSharingAnalytics}
              onCheckedChange={setDataSharingAnalytics}
            />
            <Separator />
            <SettingsLinkRow
              label="Recording Schedule"
              icon={Calendar}
              iconBg="bg-brand-yellow/10"
              description="Set active hours for Ambient Mode"
              onClick={() => navigate("/onboarding/schedule-selection")}
            />
            <Separator />
            <SettingsLinkRow
              label="Quiet Hours"
              icon={Clock}
              iconBg="bg-muted"
              description="Times when recording is paused"
              value="10pm - 7am"
              onClick={() => {}}
            />
          </Card>
        </SettingsGroup>

        {/* Pause / Kill Switch */}
        <SettingsGroup label="Recording Controls">
          <Card>
            <SettingsToggleRow
              label="Pause Recording"
              icon={Pause}
              iconBg="bg-warning/10"
              description="Temporarily stop all ambient recording"
              checked={isPaused}
              onCheckedChange={setIsPaused}
            />
            <Separator />
            <div className="p-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="destructive" 
                    className="w-full gap-2"
                    size="lg"
                  >
                    <Power className="h-4 w-4" />
                    Emergency Stop
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <div className="flex items-center gap-2 text-danger">
                      <AlertTriangle className="h-5 w-5" />
                      <AlertDialogTitle>Emergency Stop</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription>
                      This will immediately stop all recording and data collection. You can resume recording at any time from settings.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleKillSwitch}
                      className="bg-danger hover:bg-danger/90"
                    >
                      Stop All Recording
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Immediately stops all recording activity
              </p>
            </div>
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
      </div>
    </div>
  );
}
