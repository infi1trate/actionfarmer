import * as React from "react";
import { useNavigate } from "react-router-dom";
import { MainAppShell, ContentSection } from "@/components/shells";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Home,
  Camera,
  Gamepad2,
  User,
  Trophy,
  Shield,
  Eye,
  EyeOff,
  TrendingUp,
  Minus,
} from "lucide-react";
import type { TabItem } from "@/components/ui/bottom-tab-bar";

const tabs: TabItem[] = [
  { label: "Home", icon: Home, href: "/app" },
  { label: "Ambient", icon: Camera, href: "/ambient" },
  { label: "Play", icon: Gamepad2, href: "/play" },
  { label: "Profile", icon: User, href: "/profile" },
];

type TimePeriod = "weekly" | "monthly";

interface LeaderboardEntry {
  rank: number;
  anonymousId: string;
  score: number;
  trend: "up" | "down" | "stable";
  isYou: boolean;
}

// Mock leaderboard data - anonymous IDs only
const generateLeaderboardData = (period: TimePeriod): LeaderboardEntry[] => {
  const baseData: LeaderboardEntry[] = [
    { rank: 1, anonymousId: "Player #7291", score: period === "weekly" ? 2450 : 9820, trend: "stable", isYou: false },
    { rank: 2, anonymousId: "Player #3847", score: period === "weekly" ? 2380 : 9540, trend: "up", isYou: false },
    { rank: 3, anonymousId: "Player #9152", score: period === "weekly" ? 2210 : 8890, trend: "up", isYou: false },
    { rank: 4, anonymousId: "Player #4628", score: period === "weekly" ? 2150 : 8650, trend: "down", isYou: false },
    { rank: 5, anonymousId: "Player #8034", score: period === "weekly" ? 2080 : 8320, trend: "stable", isYou: false },
    { rank: 6, anonymousId: "Player #2156", score: period === "weekly" ? 1950 : 7800, trend: "up", isYou: false },
    { rank: 7, anonymousId: "Player #6473", score: period === "weekly" ? 1890 : 7560, trend: "down", isYou: false },
    { rank: 8, anonymousId: "You", score: period === "weekly" ? 1820 : 7280, trend: "up", isYou: true },
    { rank: 9, anonymousId: "Player #1829", score: period === "weekly" ? 1750 : 7000, trend: "stable", isYou: false },
    { rank: 10, anonymousId: "Player #5094", score: period === "weekly" ? 1680 : 6720, trend: "down", isYou: false },
  ];
  return baseData;
};

const TrendIcon = ({ trend }: { trend: "up" | "down" | "stable" }) => {
  if (trend === "up") return <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />;
  if (trend === "down") return <TrendingUp className="h-3.5 w-3.5 text-rose-500 rotate-180" />;
  return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
};

const RankBadge = ({ rank }: { rank: number }) => {
  if (rank === 1) return <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center"><Trophy className="h-4 w-4 text-amber-500" /></div>;
  if (rank === 2) return <div className="w-8 h-8 rounded-full bg-slate-300/20 flex items-center justify-center"><span className="text-sm font-bold text-slate-400">2</span></div>;
  if (rank === 3) return <div className="w-8 h-8 rounded-full bg-amber-600/20 flex items-center justify-center"><span className="text-sm font-bold text-amber-600">3</span></div>;
  return <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"><span className="text-sm font-medium text-muted-foreground">{rank}</span></div>;
};

export const LeaderboardPage = () => {
  const navigate = useNavigate();
  const [isOptedIn, setIsOptedIn] = React.useState(false);
  const [period, setPeriod] = React.useState<TimePeriod>("weekly");
  const [showYourRank, setShowYourRank] = React.useState(true);

  const leaderboardData = generateLeaderboardData(period);
  const yourEntry = leaderboardData.find(e => e.isYou);

  const handleOptInChange = (checked: boolean) => {
    setIsOptedIn(checked);
  };

  return (
    <MainAppShell
      title="Leaderboard"
      tabs={tabs}
    >
      <ContentSection className="space-y-6">
        {/* Opt-in Card */}
        <Card className="p-4 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">Join Leaderboard</p>
                <Switch 
                  checked={isOptedIn} 
                  onCheckedChange={handleOptInChange}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Participate anonymously in weekly and monthly rankings. Your identity is never shown.
              </p>
            </div>
          </div>
          
          {isOptedIn && (
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                {showYourRank ? (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-sm text-muted-foreground">Show your rank to yourself</span>
              </div>
              <Switch 
                checked={showYourRank} 
                onCheckedChange={setShowYourRank}
              />
            </div>
          )}
        </Card>

        {/* Not Opted In State */}
        {!isOptedIn && (
          <Card className="p-8 text-center space-y-4 bg-muted/30 border-0">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
              <Trophy className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <p className="font-medium text-foreground">Leaderboard is opt-in</p>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                Enable the toggle above to see anonymous rankings and compare your progress with others.
              </p>
            </div>
          </Card>
        )}

        {/* Leaderboard Content */}
        {isOptedIn && (
          <>
            {/* Period Tabs */}
            <Tabs value={period} onValueChange={(v) => setPeriod(v as TimePeriod)}>
              <TabsList className="w-full">
                <TabsTrigger value="weekly" className="flex-1">Weekly</TabsTrigger>
                <TabsTrigger value="monthly" className="flex-1">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Your Position Summary */}
            {showYourRank && yourEntry && (
              <Card className="p-4 bg-primary/5 border-primary/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <RankBadge rank={yourEntry.rank} />
                    <div>
                      <p className="text-sm font-medium text-foreground">Your Rank</p>
                      <p className="text-xs text-muted-foreground">
                        {period === "weekly" ? "This week" : "This month"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">{yourEntry.score.toLocaleString()}</p>
                    <div className="flex items-center gap-1 justify-end">
                      <TrendIcon trend={yourEntry.trend} />
                      <span className="text-xs text-muted-foreground">
                        {yourEntry.trend === "up" ? "Moving up" : yourEntry.trend === "down" ? "Moving down" : "Holding steady"}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Rankings List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {period === "weekly" ? "Weekly" : "Monthly"} Rankings
                </h2>
                <span className="text-xs text-muted-foreground">Top 10</span>
              </div>
              
              <Card className="divide-y divide-border">
                {leaderboardData.map((entry) => (
                  <div 
                    key={entry.rank}
                    className={`flex items-center justify-between p-3 ${
                      entry.isYou && showYourRank ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <RankBadge rank={entry.rank} />
                      <div>
                        <p className={`text-sm font-medium ${entry.isYou && showYourRank ? "text-primary" : "text-foreground"}`}>
                          {entry.isYou && showYourRank ? "You" : entry.anonymousId}
                        </p>
                        {entry.isYou && showYourRank && (
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary border-0 mt-0.5">
                            Your position
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendIcon trend={entry.trend} />
                      <span className="text-sm font-medium text-foreground tabular-nums w-16 text-right">
                        {entry.score.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </Card>
            </div>

            {/* Privacy Note */}
            <Card className="p-4 bg-muted/30 border-0">
              <div className="flex items-start gap-3">
                <Shield className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  All rankings are anonymous. Your username and personal information are never displayed to other users. Rankings reset each {period === "weekly" ? "week" : "month"}.
                </p>
              </div>
            </Card>
          </>
        )}
      </ContentSection>
    </MainAppShell>
  );
};

export default LeaderboardPage;
