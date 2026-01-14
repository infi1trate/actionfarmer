import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, Radio, Square } from "lucide-react";

export function ChallengesExplainPage() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/app");
  };

  const steps = [
    {
      icon: Play,
      text: "Start a challenge",
    },
    {
      icon: Radio,
      text: "Motion is captured while it runs",
    },
    {
      icon: Square,
      text: "Finish → recording stops",
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-[#f0fdf4] to-[#dcfce7]">
      {/* Content area - centered vertically */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-2xl font-semibold text-[#3d5a47] leading-snug">
            Challenges are simple
          </h1>
        </div>

        {/* Step sequence - vertical with connecting line */}
        <div className="max-w-xs mx-auto w-full relative">
          {/* Connecting line */}
          <div 
            className="absolute left-6 top-6 bottom-6 w-0.5 bg-[#a8e6cf]"
            style={{ transform: "translateX(-50%)" }}
          />
          
          <div className="space-y-8 relative">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="flex items-center gap-5"
              >
                {/* Icon circle */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
                  style={{
                    background: "linear-gradient(135deg, #a8e6cf 0%, #88d8b0 100%)",
                  }}
                >
                  <step.icon 
                    className="w-5 h-5 text-[#3d5a47]" 
                    strokeWidth={2}
                    fill={index === 0 ? "currentColor" : "none"}
                  />
                </div>
                
                {/* Text */}
                <p className="text-[#3d5a47] font-medium text-base">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Supporting sentence */}
        <p className="text-center text-[#6b8f74] text-sm mt-14 px-4">
          Nothing runs in the background unless you start it.
        </p>
      </div>

      {/* CTA - bottom pinned */}
      <div className="px-6 pb-12 pt-4">
        <Button
          onClick={handleContinue}
          className="w-full h-14 rounded-full text-lg font-semibold"
          style={{
            background: "linear-gradient(180deg, #FFD966 0%, #F5C542 100%)",
            color: "#5D4037",
            border: "2px solid rgba(255,255,255,0.5)",
            boxShadow: "0 4px 20px rgba(245, 197, 66, 0.3)",
          }}
        >
          Got it
        </Button>
      </div>
    </div>
  );
}

export default ChallengesExplainPage;
