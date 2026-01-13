import * as React from "react";
import { useNavigate } from "react-router-dom";
import { MainAppShell, ContentSection } from "@/components/shells";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Clock, 
  Wallet, 
  Circle,
  Home,
  User,
  Pause,
  Play
} from "lucide-react";
import type { TabItem } from "@/components/ui/bottom-tab-bar";

import { Target } from "lucide-react";

const tabs: TabItem[] = [
  { label: "Home", icon: Home, href: "/app" },
  { label: "Challenges", icon: Target, href: "/challenges" },
  { label: "Profile", icon: User, href: "/app/profile" },
];

interface Zone {
  id: string;
  name: string;
  location: string;
  isActive: boolean;
  earningsToday: number;
  dataPoints: number;
}

const AmbientModePage = () => {
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = React.useState(false);
  
  // Placeholder data
  const [zones, setZones] = React.useState<Zone[]>([
    { id: "1", name: "Kitchen Counter", location: "Kitchen", isActive: true, earningsToday: 0.12, dataPoints: 847 },
    { id: "2", name: "Desk Area", location: "Office", isActive: true, earningsToday: 0.08, dataPoints: 523 },
    { id: "3", name: "Living Room", location: "Living Room", isActive: false, earningsToday: 0, dataPoints: 0 },
  ]);

  const activeZones = zones.filter(z => z.isActive);
  const totalEarningsToday = zones.reduce((sum, z) => sum + z.earningsToday, 0);
  const timeActiveMinutes = 247; // Placeholder
  const hours = Math.floor(timeActiveMinutes / 60);
  const minutes = timeActiveMinutes % 60;

  const toggleZone = (zoneId: string) => {
    setZones(prev => prev.map(z => 
      z.id === zoneId ? { ...z, isActive: !z.isActive } : z
    ));
  };

  return (
    <MainAppShell
      title="Ambient Mode"
      tabs={tabs}
      rightActions={
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsPaused(!isPaused)}
          className="text-muted-foreground"
        >
          {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
        </Button>
      }
    >
      <ContentSection className="space-y-6">
        {/* Live Streaming Value Zone */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/8 via-emerald-500/4 to-transparent p-5">
          {/* Animated pulse ring when active */}
          {!isPaused && (
            <>
              <div className="absolute top-4 right-4 w-3 h-3">
                <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-40" />
                <span className="absolute inset-0 rounded-full bg-emerald-500" />
              </div>
              <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
            </>
          )}
          
          <div className="relative space-y-4">
            {/* Status indicator */}
            <div className="flex items-center gap-2">
              <div className={`
                px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5
                ${isPaused 
                  ? 'bg-muted text-muted-foreground' 
                  : 'bg-emerald-500/15 text-emerald-600'
                }
              `}>
                <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? 'bg-muted-foreground' : 'bg-emerald-500'}`} />
                {isPaused ? 'Paused' : 'Active'}
              </div>
              <span className="text-xs text-muted-foreground">
                {activeZones.length} zone{activeZones.length !== 1 ? 's' : ''} contributing
              </span>
            </div>

            {/* Main value display */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className={`
                  text-3xl font-bold tracking-tight transition-colors
                  ${isPaused ? 'text-muted-foreground' : 'text-foreground'}
                `}>
                  +{Math.round(totalEarningsToday * 1000)} pts
                </span>
                <span className="text-sm text-muted-foreground">today so far</span>
              </div>
              
              {/* Streaming indicator */}
              {!isPaused && (
                <div className="flex items-center gap-2 text-xs text-emerald-600">
                  <span className="inline-flex gap-0.5">
                    <span className="w-1 h-3 bg-emerald-500/60 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-4 bg-emerald-500/80 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-2 bg-emerald-500/40 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                  </span>
                  <span>Quietly streaming</span>
                </div>
              )}
            </div>

            {/* Time active - subtle */}
            <div className="flex items-center gap-4 pt-2 border-t border-border/30">
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {hours}h {minutes}m active today
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Zones */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-foreground">Zones</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-muted-foreground h-auto p-0"
              onClick={() => navigate("/onboarding/zones")}
            >
              Manage
            </Button>
          </div>

          <div className="space-y-2">
            {zones.map((zone) => (
              <Card 
                key={zone.id} 
                className={`p-4 transition-colors ${!zone.isActive ? 'bg-muted/20' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    zone.isActive ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <Camera className={`h-5 w-5 ${zone.isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground truncate">
                        {zone.name}
                      </p>
                      {zone.isActive && (
                        <Circle className="h-2 w-2 fill-emerald-500 text-emerald-500" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {zone.isActive 
                        ? `$${zone.earningsToday.toFixed(2)} today · ${zone.dataPoints.toLocaleString()} points`
                        : "Inactive"
                      }
                    </p>
                  </div>

                  <Switch
                    checked={zone.isActive}
                    onCheckedChange={() => toggleZone(zone.id)}
                    disabled={isPaused}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quiet Tip */}
        <Card className="p-4 bg-muted/20 border-0">
          <p className="text-xs text-muted-foreground text-center">
            Ambient Mode runs quietly in the background. 
            Your data stays on-device until you choose to share.
          </p>
        </Card>
      </ContentSection>
    </MainAppShell>
  );
};

export default AmbientModePage;
