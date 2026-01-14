import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";

export function ReadyPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/app");
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-[#f0fdf4] to-[#dcfce7]">
      {/* Content area - centered vertically */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-12">
        {/* Seed illustration with gentle hover */}
        <div 
          className="w-24 h-24 rounded-full flex items-center justify-center mb-10"
          style={{
            background: "linear-gradient(135deg, #a8e6cf 0%, #88d8b0 100%)",
            animation: "gentle-hover 3s ease-in-out infinite",
          }}
        >
          <Sprout className="w-12 h-12 text-[#3d5a47]" strokeWidth={1.5} />
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#3d5a47] mb-3 leading-snug">
            Your first seed is ready
          </h1>
          <p className="text-[#5a7d63] text-base">
            Let's plant it together.
          </p>
        </div>
      </div>

      {/* CTA - bottom pinned */}
      <div className="px-6 pb-12 pt-4">
        <Button
          onClick={handleGoHome}
          className="w-full h-14 rounded-full text-lg font-semibold"
          style={{
            background: "linear-gradient(180deg, #FFD966 0%, #F5C542 100%)",
            color: "#5D4037",
            border: "2px solid rgba(255,255,255,0.5)",
            boxShadow: "0 4px 20px rgba(245, 197, 66, 0.3)",
          }}
        >
          Go to Home
        </Button>
      </div>

      {/* Gentle hover animation */}
      <style>{`
        @keyframes gentle-hover {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}

export default ReadyPage;
