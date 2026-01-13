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
        {/* Status Banner */}
        <Card className="p-4 bg-muted/30 border-0">
          <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full ${isPaused ? 'bg-muted-foreground' : 'bg-emerald-500 animate-pulse'}`} />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                {isPaused ? "Paused" : "Quietly collecting"}
              </p>
              <p className="text-xs text-muted-foreground">
                {isPaused 
                  ? "Resume when you're ready" 
                  : `${activeZones.length} zone${activeZones.length !== 1 ? 's' : ''} active`
                }
              </p>
            </div>
            {!isPaused && (
              <Badge variant="secondary" className="text-xs">
                Live
              </Badge>
            )}
          </div>
        </Card>

        {/* Today's Summary */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-xs">Time Active</span>
            </div>
            <p className="text-2xl font-semibold text-foreground">
              {hours}h {minutes}m
            </p>
            <p className="text-xs text-muted-foreground">Today</p>
          </Card>
          
          <Card className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Wallet className="h-4 w-4" />
              <span className="text-xs">Earnings</span>
            </div>
            <p className="text-2xl font-semibold text-foreground">
              ${totalEarningsToday.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">Today</p>
          </Card>
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
