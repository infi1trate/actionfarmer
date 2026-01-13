import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  QrCode,
  Smartphone,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface EventChallengeCardProps {
  onNavigate: (path: string) => void;
}

export function EventChallengeCard({ onNavigate }: EventChallengeCardProps) {
  const [showPairing, setShowPairing] = React.useState(false);

  return (
    <div className="relative group">
      {/* Event stamp - rotated, positioned like a physical stamp */}
      <div className="absolute -top-3 -right-2 z-10 rotate-12">
        <div className="relative">
          {/* Stamp border effect */}
          <div className="absolute inset-0 rounded-lg border-2 border-dashed border-brand-orange/40 rotate-[-2deg]" />
          <div className="px-3 py-1.5 rounded-lg bg-brand-orange/10 border-2 border-brand-orange/60">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange">
              This week only
            </span>
          </div>
        </div>
      </div>

      {/* Main event card */}
      <div className="relative rounded-3xl overflow-hidden">
        {/* Rich gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/12 via-brand-orange/6 to-primary/8" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-brand-orange/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/15 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative border border-brand-orange/20 rounded-3xl p-6 pt-8 space-y-5">
          {/* Event type indicator */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-brand-orange/20 to-brand-orange/10 text-brand-orange">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="text-xs font-semibold">Weekly Event</span>
            </div>
          </div>

          {/* Event headline */}
          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-foreground tracking-tight">
                Cook Together
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-brand-orange">2×</span>
                <span className="text-sm font-medium text-brand-orange/80">rewards for both</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">
              Team up with a friend to cook the same recipe. Complete it together and you both earn double.
            </p>
          </div>

          {/* Participant count */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-muted border-2 border-background" />
              <div className="w-6 h-6 rounded-full bg-muted border-2 border-background" />
              <div className="w-6 h-6 rounded-full bg-muted border-2 border-background" />
            </div>
            <span>47 pairs joined this week</span>
          </div>

          {/* CTA that reveals pairing */}
          <div className="space-y-3">
            <Button 
              variant="brand"
              size="lg"
              onClick={() => setShowPairing(!showPairing)}
              className="w-full"
              leftIcon={<Users className="h-5 w-5" />}
              rightIcon={showPairing ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            >
              Find a partner
            </Button>

            {/* Pairing methods - revealed on interaction */}
            <div 
              className={`grid grid-cols-2 gap-3 overflow-hidden transition-all duration-300 ease-out ${
                showPairing ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <button
                onClick={() => onNavigate("/challenge/cook-together/pair?method=qr")}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-background/60 border border-border/50 hover:border-brand-orange/30 hover:bg-background transition-all group/method"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center group-hover/method:bg-brand-orange/15 transition-colors">
                  <QrCode className="h-5 w-5 text-brand-orange" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Scan QR</p>
                  <p className="text-[10px] text-muted-foreground">Show to friend</p>
                </div>
              </button>

              <button
                onClick={() => onNavigate("/challenge/cook-together/pair?method=nfc")}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-background/60 border border-border/50 hover:border-brand-orange/30 hover:bg-background transition-all group/method"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center group-hover/method:bg-brand-orange/15 transition-colors">
                  <Smartphone className="h-5 w-5 text-brand-orange" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Tap phones</p>
                  <p className="text-[10px] text-muted-foreground">NFC pairing</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
