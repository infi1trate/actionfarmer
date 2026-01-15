import * as React from "react";
import { useNavigate } from "react-router-dom";
import gardenBg from "@/assets/garden-bg.png";
import plantDay1 from "@/assets/plants/day-1-seed.png";
import plantDay2 from "@/assets/plants/day-2-sprout.png";
import plantDay3 from "@/assets/plants/day-3-small-plant.png";
import plantDay4 from "@/assets/plants/day-4-leafy-plant.png";
import plantDay5 from "@/assets/plants/day-5-bud.png";
import plantDay6 from "@/assets/plants/day-6-flower.png";
import plantDay7 from "@/assets/plants/day-7-fruit.png";
import { Droplets, Sun, Sparkles, Leaf, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useAppData } from "@/contexts/AppDataContext";

const GROWTH_STAGES = [
  { day: 0, label: "No Plant", image: plantDay1, color: "text-muted-foreground" },
  { day: 1, label: "Seed", image: plantDay1, color: "text-amber-600" },
  { day: 2, label: "Sprout", image: plantDay2, color: "text-lime-500" },
  { day: 3, label: "Small Plant", image: plantDay3, color: "text-lime-600" },
  { day: 4, label: "Leafy Plant", image: plantDay4, color: "text-emerald-500" },
  { day: 5, label: "Bud", image: plantDay5, color: "text-pink-400" },
  { day: 6, label: "Flower", image: plantDay6, color: "text-pink-500" },
  { day: 7, label: "Fruit", image: plantDay7, color: "text-rose-500" },
];

const getPlantStageInfo = (stage: number) => {
  const clampedStage = Math.min(Math.max(stage, 0), 7);
  return GROWTH_STAGES[clampedStage];
};

export function EarningsPage() {
  const navigate = useNavigate();
  const { loading: authLoading } = useAuth();
  const { plant, stats, sessions, loading: dataLoading } = useAppData();

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const currentStage = plant?.current_stage || 0;
  const stageInfo = getPlantStageInfo(currentStage);
  const completedCount = stats.totalCompleted;
  const totalWatering = stats.totalWatering;
  const totalSunlight = stats.totalSunlight;
  const challengesForNextStage = Math.max(0, (currentStage + 1) * 2 - completedCount);
  const stageProgress = currentStage === 7 ? 100 : Math.min(100, (completedCount / ((currentStage + 1) * 2)) * 100);

  // Empty state
  if (!plant && completedCount === 0) {
    return (
      <div className="min-h-screen pb-28 bg-background">
        <header className="relative overflow-hidden" style={{ minHeight: '50vh' }}>
          <div className="absolute inset-0 bg-cover bg-bottom bg-no-repeat z-0" style={{ backgroundImage: `url(${gardenBg})`, backgroundPosition: 'center 70%' }} />
          <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(245, 252, 249, 0.08)' }} />
          <div className="absolute inset-x-0 bottom-0 z-[4]" style={{ height: '90px', background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.98) 100%)' }} />
          <div className="relative z-10 px-5 pt-8 pb-4">
            <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-2">Your Growth</p>
            <h1 className="text-2xl font-bold text-foreground tracking-tight mb-1">Earnings</h1>
            <p className="text-sm text-muted-foreground">Nurture your garden with every challenge</p>
          </div>
        </header>
        <section className="px-5 pt-8 pb-6 relative z-10 bg-background">
          <div className="rounded-3xl bg-gradient-to-b from-muted/40 to-muted/20 border border-border/30 p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <Leaf className="h-8 w-8 text-primary/60" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-3">No garden yet</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto mb-6">Complete your first challenge to plant a seed and start growing your garden.</p>
            <button onClick={() => navigate("/challenges")} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/25 hover:shadow-xl transition-all">
              🌱 Start your first challenge
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-28 bg-background">
      <style>{`
        @keyframes gentle-sway { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
        .animate-sway { animation: gentle-sway 4s ease-in-out infinite; }
      `}</style>
      <header className="relative overflow-hidden" style={{ minHeight: '60vh' }}>
        <div className="absolute inset-0 bg-cover bg-bottom bg-no-repeat z-0" style={{ backgroundImage: `url(${gardenBg})`, backgroundPosition: 'center 70%' }} />
        <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(245, 252, 249, 0.08)' }} />
        <div className="absolute inset-x-0 bottom-0 z-[4]" style={{ height: '90px', background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.98) 100%)' }} />
        <div className="absolute inset-x-0 bottom-0 z-[5]" style={{ height: '16px', background: 'rgba(255,255,255,0.98)' }} />
        <div className="relative z-10 px-5 pt-8 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-2">Your Growth</p>
              <h1 className="text-2xl font-bold text-foreground tracking-tight mb-1">Earnings</h1>
              <p className="text-sm text-muted-foreground">Nurture your garden with every challenge</p>
            </div>
            <div className="flex flex-col items-end gap-2 pt-1">
              <div className="flex items-center gap-1.5 opacity-70"><Droplets className="h-3 w-3 text-sky-400" /><span className="text-[10px] font-medium text-foreground/70">+{totalWatering}</span></div>
              <div className="flex items-center gap-1.5 opacity-70"><Sun className="h-3 w-3 text-amber-400" /><span className="text-[10px] font-medium text-foreground/70">+{totalSunlight}</span></div>
              <div className="flex items-center gap-1.5 opacity-70"><Leaf className="h-3 w-3 text-emerald-400" /><span className="text-[10px] font-medium text-foreground/70">Stage {currentStage}</span></div>
            </div>
          </div>
        </div>
        <div className="relative z-10 px-5 -mt-6 flex flex-col items-center justify-end" style={{ height: '48vh', minHeight: '340px', maxHeight: '440px' }}>
          <div className="animate-sway origin-bottom relative z-20">
            <img src={stageInfo.image} alt={stageInfo.label} className="object-contain" style={{ height: '380px', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.25))' }} />
          </div>
          <div className="-mt-2 mb-4 z-20">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm">
              <span className="text-sm">🌱</span>
              <span className="text-xs font-medium text-foreground/90">{currentStage === 7 ? "Fully grown!" : `${challengesForNextStage} challenges to evolve`}</span>
            </div>
          </div>
        </div>
      </header>
      <section className="px-5 pt-8 pb-6 relative z-10 bg-background">
        <div className="rounded-3xl bg-gradient-to-b from-muted/40 to-muted/20 border border-border/10 overflow-hidden">
          <div className="px-6 pt-7 pb-2">
            <div className="flex items-center gap-2.5 mb-2"><Leaf className="h-4 w-4 text-emerald-500" /><h2 className="text-lg font-semibold text-foreground tracking-tight">Your Garden This Week</h2></div>
          </div>
          <div className="px-6 pb-6">
            <p className="text-[15px] text-foreground/80 leading-relaxed">
              You've shared <span className="font-medium text-sky-600">{completedCount} watering{completedCount !== 1 ? "s" : ""}</span> and 
              <span className="font-medium text-amber-600"> +{totalSunlight} rays of sunlight</span> with your plant.
              {currentStage >= 4 ? <span className="text-emerald-600"> It's thriving.</span> : <span> Steady growth continues.</span>}
            </p>
          </div>
          <div className="mx-6 mb-6 flex items-center gap-6">
            <div className="flex items-center gap-2"><Droplets className="h-4 w-4 text-sky-400/70" /><span className="text-sm text-foreground/70">{completedCount} waterings</span></div>
            <div className="w-px h-4 bg-border/30" />
            <div className="flex items-center gap-2"><Sun className="h-4 w-4 text-amber-400/70" /><span className="text-sm text-foreground/70">+{totalSunlight} light</span></div>
            <div className="w-px h-4 bg-border/30" />
            <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-emerald-400/70" /><span className="text-sm text-foreground/70">Stage {currentStage}</span></div>
          </div>
          <div className="mx-6 mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Progress to next bloom</span>
              <span className="text-xs font-semibold text-foreground">{Math.round(stageProgress)}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted/60 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-400 transition-all duration-500" style={{ width: `${stageProgress}%` }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
