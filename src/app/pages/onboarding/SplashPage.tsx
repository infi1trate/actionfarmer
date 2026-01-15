import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import splashBg from "@/assets/splash-farm.png";
import actionFarmerLogo from "@/assets/action-farmer-logo.png";

export function SplashPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/onboarding/explain");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#a8e6cf] to-[#7dd3c0]">
      {/* Full-screen background image */}
      <img 
        src={splashBg}
        alt="DePIN Farmer"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      
      {/* Logo at top */}
      <div className="absolute top-4 left-0 right-0 flex justify-center z-10">
        <img 
          src={actionFarmerLogo}
          alt="Action Farmer"
          className="w-[36rem] h-auto drop-shadow-lg"
        />
      </div>
      
      {/* Slow drifting cloud overlays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Cloud 1 - top left, slow drift right */}
        <div 
          className="absolute top-[12%] -left-[10%] w-32 h-20 opacity-40"
          style={{
            background: "radial-gradient(ellipse, rgba(255,255,255,0.8) 0%, transparent 70%)",
            animation: "drift-right 60s linear infinite"
          }}
        />
        {/* Cloud 2 - top right, slow drift left */}
        <div 
          className="absolute top-[8%] -right-[5%] w-40 h-24 opacity-30"
          style={{
            background: "radial-gradient(ellipse, rgba(255,255,255,0.7) 0%, transparent 70%)",
            animation: "drift-left 80s linear infinite"
          }}
        />
        {/* Cloud 3 - middle, very slow */}
        <div 
          className="absolute top-[20%] left-[30%] w-24 h-16 opacity-20"
          style={{
            background: "radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, transparent 70%)",
            animation: "drift-right 100s linear infinite"
          }}
        />
      </div>

      {/* Bottom gradient for CTA visibility */}
      <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-black/30 via-black/15 to-transparent pointer-events-none" />

      {/* CTA Section - bottom center */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-12 px-6 gap-4">
        {/* Primary CTA */}
        <Button
          onClick={handleStart}
          className="w-full max-w-xs h-14 rounded-full text-lg font-semibold shadow-lg"
          style={{
            background: "linear-gradient(180deg, #FFD966 0%, #F5C542 100%)",
            color: "#5D4037",
            border: "2px solid rgba(255,255,255,0.4)",
            boxShadow: "0 4px 20px rgba(245, 197, 66, 0.4)"
          }}
        >
          🌱 Plant your first seed
        </Button>

        {/* Secondary CTA */}
        <button
          onClick={handleStart}
          className="text-white/90 text-sm font-medium hover:text-white transition-colors underline underline-offset-2"
        >
          Learn how it works
        </button>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes drift-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(120vw); }
        }
        @keyframes drift-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-120vw); }
        }
      `}</style>
    </div>
  );
}

export default SplashPage;
