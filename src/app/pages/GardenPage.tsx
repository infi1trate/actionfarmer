import * as React from "react";
import { useNavigate } from "react-router-dom";
import { DetailShell } from "@/components/shells/DetailShell";
import { Sprout, Sparkles, Calendar, Heart } from "lucide-react";

// Plant stage images
import plantDay1 from "@/assets/plants/day-1-seed.png";
import plantDay2 from "@/assets/plants/day-2-sprout.png";
import plantDay3 from "@/assets/plants/day-3-small-plant.png";
import plantDay4 from "@/assets/plants/day-4-leafy-plant.png";
import plantDay5 from "@/assets/plants/day-5-bud.png";
import plantDay6 from "@/assets/plants/day-6-flower.png";
import plantDay7 from "@/assets/plants/day-7-fruit.png";
import gardenBg from "@/assets/garden-bg.png";

// Sample collected plants data
const collectedPlants = [
  { id: 1, name: "Cherry Tree", completedAt: "Jan 7, 2026", streakDays: 7, image: plantDay7 },
  { id: 2, name: "Sunflower", completedAt: "Dec 31, 2025", streakDays: 7, image: plantDay7 },
  { id: 3, name: "Rose Bush", completedAt: "Dec 24, 2025", streakDays: 7, image: plantDay7 },
  { id: 4, name: "Lavender", completedAt: "Dec 17, 2025", streakDays: 7, image: plantDay7 },
  { id: 5, name: "Maple Sapling", completedAt: "Dec 10, 2025", streakDays: 7, image: plantDay7 },
  { id: 6, name: "Daisy", completedAt: "Dec 3, 2025", streakDays: 7, image: plantDay7 },
];

const gardenStats = {
  totalPlants: collectedPlants.length,
  totalStreakDays: collectedPlants.reduce((sum, p) => sum + p.streakDays, 0),
  longestStreak: 7,
};

export function GardenPage() {
  const navigate = useNavigate();

  return (
    <DetailShell
      title="My Garden"
      subtitle={`${gardenStats.totalPlants} plants collected`}
      onBack={() => navigate("/app/earnings")}
      headerVariant="blur"
    >
      {/* Inline keyframes for garden animations */}
      <style>{`
        @keyframes gentle-sway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes gentle-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        @keyframes float-up {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-sway { animation: gentle-sway 4s ease-in-out infinite; }
        .animate-breathe { animation: gentle-breathe 3s ease-in-out infinite; }
        .animate-float { animation: float-up 5s ease-in-out infinite; }
      `}</style>

      <div className="min-h-screen pb-8">
        {/* Hero Section with Garden Background */}
        <section className="relative overflow-hidden">
          {/* Illustrated Background */}
          <div 
            className="absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-80"
            style={{ backgroundImage: `url(${gardenBg})` }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
          
          <div className="relative z-10 px-5 pt-8 pb-12 text-center">
            {/* Celebratory Header */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-emerald-500/20 mb-6">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium text-foreground">Your Plant Collection</span>
              <Sparkles className="h-4 w-4 text-amber-500" />
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-2 drop-shadow-sm">
              A Garden of Memories
            </h1>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Each plant represents a completed 7-day streak—a testament to your consistency
            </p>
          </div>
        </section>

        {/* Garden Stats */}
        <section className="px-5 -mt-4 relative z-20">
          <div className="flex items-stretch gap-3 mb-8">
            {/* Total Plants */}
            <div className="flex-1 py-4 px-4 rounded-2xl bg-background border border-border/50 shadow-sm text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Sprout className="h-5 w-5 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-foreground">{gardenStats.totalPlants}</p>
              <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">Plants</p>
            </div>

            {/* Total Streak Days */}
            <div className="flex-1 py-4 px-4 rounded-2xl bg-background border border-border/50 shadow-sm text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
              <p className="text-2xl font-bold text-foreground">{gardenStats.totalStreakDays}</p>
              <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">Total Days</p>
            </div>

            {/* Love & Care */}
            <div className="flex-1 py-4 px-4 rounded-2xl bg-background border border-border/50 shadow-sm text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-rose-500/10 flex items-center justify-center">
                <Heart className="h-5 w-5 text-rose-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{gardenStats.longestStreak}</p>
              <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">Best Streak</p>
            </div>
          </div>
        </section>

        {/* Plant Collection Grid */}
        <section className="px-5">
          <div className="flex items-center gap-2 mb-4">
            <Sprout className="h-4 w-4 text-emerald-600" />
            <h2 className="text-sm font-semibold text-foreground">Collected Plants</h2>
          </div>

          {collectedPlants.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {collectedPlants.map((plant, index) => (
                <div 
                  key={plant.id}
                  className="relative rounded-2xl bg-gradient-to-br from-emerald-500/5 via-lime-500/3 to-transparent border border-emerald-500/10 p-4 text-center overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Decorative glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-amber-400/5 pointer-events-none" />
                  
                  {/* Plant Image with Animation */}
                  <div className="relative mb-3 animate-float" style={{ animationDelay: `${index * 0.3}s` }}>
                    <div className="w-20 h-20 mx-auto animate-sway origin-bottom" style={{ animationDelay: `${index * 0.2}s` }}>
                      <img 
                        src={plant.image} 
                        alt={plant.name}
                        className="w-full h-full object-contain drop-shadow-lg"
                      />
                    </div>
                  </div>

                  {/* Plant Info */}
                  <h3 className="text-sm font-semibold text-foreground mb-1">{plant.name}</h3>
                  
                  {/* Completion Badge */}
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 mb-2">
                    <span className="text-[10px] font-medium text-emerald-600">
                      {plant.streakDays}-day bloom
                    </span>
                  </div>
                  
                  {/* Completion Date */}
                  <p className="text-[11px] text-muted-foreground">
                    {plant.completedAt}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
                <Sprout className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">No plants yet</p>
              <p className="text-xs text-muted-foreground/70">
                Complete your first 7-day streak to grow a plant!
              </p>
            </div>
          )}
        </section>

        {/* Encouraging Footer */}
        <section className="px-5 pt-8">
          <div className="py-5 px-6 rounded-2xl bg-gradient-to-br from-amber-500/8 via-emerald-500/5 to-transparent border border-amber-500/10 text-center">
            <Sparkles className="h-5 w-5 text-amber-500 mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground mb-1">
              Every plant tells a story
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your garden grows with each streak you complete. Keep nurturing your progress!
            </p>
          </div>
        </section>
      </div>
    </DetailShell>
  );
}

export default GardenPage;
