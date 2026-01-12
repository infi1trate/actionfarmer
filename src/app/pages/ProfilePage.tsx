import * as React from "react";
import { 
  User, 
  Wifi, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Moon,
  Smartphone,
  FileText,
  Mail
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StreakBadge } from "@/components/ui/streak-indicator";
import { 
  SettingsShell, 
  SettingsGroup, 
  SettingsLinkRow, 
  SettingsToggleRow,
  SettingsButtonRow,
  SettingsSeparator
} from "@/components/shells";

// Mock user data
const mockUser = {
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "",
  memberSince: "Jan 2025",
  streak: 12,
  tier: "Pro",
  devicesCount: 4,
};

export function ProfilePage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);

  return (
    <div className="pb-4">
      {/* Profile Header */}
      <section className="px-4 pt-4">
        <Card className="p-5">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
              <AvatarFallback className="bg-brand-yellow text-brand-yellow-foreground text-xl font-semibold">
                {mockUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-semibold truncate">{mockUser.name}</h2>
                <Badge variant="secondary" className="shrink-0">{mockUser.tier}</Badge>
              </div>
              <p className="text-sm text-muted-foreground truncate">{mockUser.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <StreakBadge count={mockUser.streak} variant="fire" size="sm" />
                <span className="text-xs text-muted-foreground">Member since {mockUser.memberSince}</span>
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
              label="My Devices"
              icon={Wifi}
              iconBg="bg-success/10"
              value={`${mockUser.devicesCount} connected`}
              onClick={() => navigate("/app/profile/devices")}
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
              onClick={() => navigate("/onboarding")}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
