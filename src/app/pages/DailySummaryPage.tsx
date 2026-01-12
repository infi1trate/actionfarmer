import * as React from "react";
import { useNavigate } from "react-router-dom";
import { MainAppShell, ContentSection } from "@/components/shells";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Hand,
  Sparkles,
  Wallet,
  ChevronLeft,
  ChevronRight,
  X,
  Home,
  Camera,
  Gamepad2,
  User,
} from "lucide-react";
import type { TabItem } from "@/components/ui/bottom-tab-bar";

const tabs: TabItem[] = [
  { label: "Home", icon: Home, href: "/app" },
  { label: "Ambient", icon: Camera, href: "/ambient" },
  { label: "Play", icon: Gamepad2, href: "/play" },
  { label: "Profile", icon: User, href: "/profile" },
];

type DataQuality = "high" | "normal";

interface TaskDetected {
  id: string;
  name: string;
  count: number;
  icon: React.ReactNode;
}

const DailySummaryPage = () => {
  const navigate = useNavigate();
  
  // Placeholder date navigation
  const [currentDate] = React.useState(new Date());
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  // Placeholder data
  const dataQuality: DataQuality = "high";
  const dailyEarnings = 0.42;
  const tasksDetected: TaskDetected[] = [
    { id: "1", name: "Object pickups", count: 23, icon: <Hand className="h-4 w-4" /> },
    { id: "2", name: "Object placements", count: 19, icon: <Hand className="h-4 w-4 rotate-180" /> },
    { id: "3", name: "Hand interactions", count: 156, icon: <Sparkles className="h-4 w-4" /> },
  ];

  const totalTasks = tasksDetected.reduce((sum, t) => sum + t.count, 0);

  return (
    <MainAppShell
      title="Daily Summary"
      tabs={tabs}
      rightActions={
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-muted-foreground"
        >
          <X className="h-5 w-5" />
        </Button>
      }
    >
      <ContentSection className="space-y-6">
        {/* Date Navigator */}
        <Card className="p-3 bg-muted/30 border-0">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{formattedDate}</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* Daily Earnings */}
        <Card className="p-6 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Wallet className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wide">Today's Earnings</span>
          </div>
          <p className="text-4xl font-semibold text-foreground">
            ${dailyEarnings.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">
            Thank you for contributing
          </p>
        </Card>

        {/* Data Quality */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">Data Quality</p>
              <p className="text-xs text-muted-foreground">
                {dataQuality === "high" 
                  ? "Great lighting and clear captures" 
                  : "Usable data collected"
                }
              </p>
            </div>
            <Badge 
              variant={dataQuality === "high" ? "default" : "secondary"}
              className={dataQuality === "high" ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-0" : ""}
            >
              {dataQuality === "high" ? "High" : "Normal"}
            </Badge>
          </div>
        </Card>

        {/* Tasks Detected */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-foreground">Tasks Detected</h2>
            <span className="text-xs text-muted-foreground">{totalTasks} total</span>
          </div>

          <div className="space-y-2">
            {tasksDetected.map((task) => (
              <Card key={task.id} className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                    {task.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{task.name}</p>
                  </div>
                  <span className="text-lg font-semibold text-foreground">{task.count}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Gentle Footer */}
        <Card className="p-4 bg-muted/20 border-0">
          <p className="text-xs text-muted-foreground text-center">
            Summaries are optional and can be turned off in settings.
            Your data helps improve everyday technology.
          </p>
        </Card>
      </ContentSection>
    </MainAppShell>
  );
};

export default DailySummaryPage;
