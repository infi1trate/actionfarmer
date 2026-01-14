import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Flower2, Eye } from "lucide-react";

export function ExplainPage() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/onboarding/challenges");
  };

  const features = [
    {
      icon: Sparkles,
      title: "Do small challenges",
      description: "Everyday tasks. Just a few minutes.",
    },
    {
      icon: Flower2,
      title: "Grow your garden",
      description: "Each challenge plants and nurtures something.",
    },
    {
      icon: Eye,
      title: "Discover patterns about yourself",
      description: "Insights appear naturally over time.",
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-[#f0fdf4] to-[#dcfce7]">
      {/* Content area - centered vertically */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-semibold text-[#3d5a47] mb-3 leading-snug">
            Your everyday life,
            <br />
            gently grown
          </h1>
          <p className="text-[#5a7d63] text-base">
            Small moments add up when you show up consistently.
          </p>
        </div>

        {/* Feature rows */}
        <div className="space-y-6 max-w-sm mx-auto w-full">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex items-start gap-4"
            >
              {/* Icon container */}
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #a8e6cf 0%, #88d8b0 100%)",
                }}
              >
                <feature.icon className="w-5 h-5 text-[#3d5a47]" strokeWidth={2} />
              </div>
              
              {/* Text */}
              <div className="pt-1">
                <h3 className="text-[#3d5a47] font-medium text-base mb-0.5">
                  {feature.title}
                </h3>
                <p className="text-[#6b8f74] text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
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
          Continue
        </Button>
      </div>
    </div>
  );
}

export default ExplainPage;
