import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Sprout } from "lucide-react";
import splashBg from "@/assets/splash-farmer.png";

export function SplashPage() {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [showSprout, setShowSprout] = React.useState(false);

  const handlePlantSeed = () => {
    // Trigger seed -> sprout animation
    setShowSprout(true);
    
    // Begin fade transition after sprout animation
    setTimeout(() => {
      setIsTransitioning(true);
    }, 400);
    
    // Navigate after transition
    setTimeout(() => {
      navigate("/onboarding");
    }, 800);
  };

  const handleLearnMore = () => {
    navigate("/onboarding/explain");
  };

  return (
    <div 
      className={`
        fixed inset-0 flex flex-col
        transition-opacity duration-500
        ${isTransitioning ? 'opacity-0' : 'opacity-100'}
      `}
      style={{
        backgroundImage: `url(${splashBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Subtle ambient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

      {/* Logo + Tagline - Top section */}
      <header className="relative z-10 pt-16 px-8 flex flex-col items-center">
        {/* Logo */}
        <div className="w-20 h-20 rounded-2xl bg-brand-yellow flex items-center justify-center shadow-lg shadow-brand-yellow/30 mb-5">
          <span className="text-3xl font-display font-bold text-brand-yellow-foreground">🌱</span>
        </div>
        
        {/* App name */}
        <h1 className="text-2xl font-display font-bold text-white drop-shadow-md mb-2">
          DePIN Farmer
        </h1>
        
        {/* Tagline */}
        <p className="text-lg text-white/90 drop-shadow-sm font-medium">
          Farm your everyday life
        </p>
      </header>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom section with CTA */}
      <div className="relative z-10 w-full px-8 pb-12 pt-20 flex flex-col items-center">
        {/* Gradient backdrop for CTA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/60 to-transparent backdrop-blur-[2px]" />
        
        {/* Primary CTA */}
        <button
          onClick={handlePlantSeed}
          disabled={isTransitioning}
          className={`
            relative z-10
            flex items-center justify-center gap-2.5
            px-8 py-4 rounded-full
            bg-primary text-primary-foreground
            font-semibold text-lg
            shadow-lg shadow-primary/30
            transition-all duration-300
            hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02]
            active:scale-[0.98]
            disabled:opacity-70
            ${!isTransitioning ? 'animate-cta-float' : ''}
          `}
        >
          {/* Seed/Sprout icon with animation */}
          <span className={`
            inline-flex items-center justify-center
            transition-all duration-300
            ${showSprout ? 'scale-125' : 'scale-100'}
          `}>
            {showSprout ? (
              <Sprout className="h-5 w-5 text-primary-foreground animate-sprout-grow" />
            ) : (
              <span className="text-xl">🌱</span>
            )}
          </span>
          <span>Plant your first seed</span>
        </button>

        {/* Secondary action */}
        <button
          onClick={handleLearnMore}
          className="relative z-10 mt-5 text-sm text-foreground/60 hover:text-foreground/80 transition-colors font-medium"
        >
          Learn how it works
        </button>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes cta-float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        
        @keyframes sprout-grow {
          0% {
            transform: scale(0.5) rotate(-10deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.3) rotate(5deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        
        .animate-cta-float {
          animation: cta-float 3s ease-in-out infinite;
        }
        
        .animate-sprout-grow {
          animation: sprout-grow 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
