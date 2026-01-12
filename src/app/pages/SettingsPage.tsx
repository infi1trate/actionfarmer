import * as React from "react";
import { 
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  Moon,
  Smartphone,
  FileText,
  Mail,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  SettingsGroup, 
  SettingsLinkRow, 
  SettingsToggleRow,
  SettingsButtonRow,
} from "@/components/shells";

export function SettingsPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);

  const handleSignOut = () => {
    navigate("/onboarding");
  };

  return (
    <div className="pb-4">
      {/* Settings Groups */}
      <div className="mt-2 space-y-6">
        {/* Account Settings */}
        <SettingsGroup label="Account">
          <Card>
            <SettingsLinkRow
              label="Profile"
              icon={User}
              iconBg="bg-info/10"
              onClick={() => {}}
            />
            <Separator />
            <SettingsLinkRow
              label="Security"
              icon={Shield}
              iconBg="bg-warning/10"
              onClick={() => {}}
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
              description="Get notified about earnings and sessions"
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
