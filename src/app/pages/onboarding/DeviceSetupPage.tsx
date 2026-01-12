import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Wifi, Check, Loader2, ArrowRight, Plus, Smartphone, Monitor, Router } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type SetupStep = "intro" | "scanning" | "found" | "connecting" | "success";

const deviceTypes = [
  { id: "phone", name: "Smartphone", icon: Smartphone, description: "This device" },
  { id: "desktop", name: "Desktop/Laptop", icon: Monitor, description: "Add later" },
  { id: "router", name: "Smart Router", icon: Router, description: "Add later" },
];

export function DeviceSetupPage() {
  const navigate = useNavigate();
  const [step, setStep] = React.useState<SetupStep>("intro");
  const [progress, setProgress] = React.useState(0);

  const startScan = async () => {
    setStep("scanning");
    
    // Simulate scanning progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }
    
    setStep("found");
  };

  const connectDevice = async () => {
    setStep("connecting");
    
    // Simulate connection
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setProgress(i);
    }
    
    setStep("success");
  };

  const finish = () => {
    navigate("/app");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Progress indicator */}
      <header className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Step 3 of 3
          </span>
        </div>
        <Progress value={step === "success" ? 100 : step === "intro" ? 0 : 50} className="h-1" />
      </header>

      <main className="flex-1 flex flex-col p-6">
        {step === "intro" && (
          <>
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-3xl bg-brand-yellow/10 flex items-center justify-center mb-8">
                <Wifi className="w-12 h-12 text-brand-yellow" strokeWidth={1.5} />
              </div>
              
              <h1 className="text-2xl font-display font-bold mb-3">
                Connect Your First Device
              </h1>
              <p className="text-muted-foreground mb-8 max-w-sm">
                We'll set up this device to start earning. You can add more devices later.
              </p>

              <div className="w-full max-w-sm space-y-3">
                {deviceTypes.map((device) => (
                  <Card 
                    key={device.id}
                    className={cn(
                      "p-4 flex items-center gap-4 cursor-pointer transition-all",
                      device.id === "phone" 
                        ? "border-brand-yellow/50 bg-brand-yellow/5" 
                        : "opacity-60"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      device.id === "phone" ? "bg-brand-yellow/20" : "bg-surface-2"
                    )}>
                      <device.icon className={cn(
                        "w-6 h-6",
                        device.id === "phone" ? "text-brand-yellow" : "text-muted-foreground"
                      )} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{device.name}</p>
                      <p className="text-sm text-muted-foreground">{device.description}</p>
                    </div>
                    {device.id === "phone" && (
                      <Check className="w-5 h-5 text-brand-yellow" />
                    )}
                  </Card>
                ))}
              </div>
            </div>

            <Button 
              variant="primary" 
              size="lg" 
              className="w-full"
              onClick={startScan}
            >
              Continue with This Device
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </>
        )}

        {step === "scanning" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="relative w-32 h-32 mb-8">
              <div className="absolute inset-0 rounded-full border-4 border-surface-2" />
              <div 
                className="absolute inset-0 rounded-full border-4 border-brand-yellow border-t-transparent animate-spin"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Wifi className="w-12 h-12 text-brand-yellow" />
              </div>
            </div>
            
            <h2 className="text-xl font-display font-bold mb-2">
              Scanning Device...
            </h2>
            <p className="text-muted-foreground mb-6">
              Checking compatibility and network
            </p>
            
            <div className="w-full max-w-xs">
              <Progress value={progress} variant="brand" className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">{progress}%</p>
            </div>
          </div>
        )}

        {step === "found" && (
          <>
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-3xl bg-success/10 flex items-center justify-center mb-8">
                <Check className="w-12 h-12 text-success" strokeWidth={1.5} />
              </div>
              
              <h2 className="text-2xl font-display font-bold mb-3">
                Device Compatible!
              </h2>
              <p className="text-muted-foreground mb-8 max-w-sm">
                Your device meets all requirements. Ready to connect to the network.
              </p>

              <Card className="w-full max-w-sm p-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-brand-yellow" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">This Device</p>
                    <p className="text-sm text-muted-foreground">iPhone 15 Pro</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Network</span>
                    <span className="text-success font-medium">Excellent</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Estimated earnings</span>
                    <span className="font-medium">$2-5/day</span>
                  </div>
                </div>
              </Card>
            </div>

            <Button 
              variant="primary" 
              size="lg" 
              className="w-full"
              onClick={connectDevice}
            >
              Connect to Network
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </>
        )}

        {step === "connecting" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <Loader2 className="w-16 h-16 text-brand-yellow animate-spin mb-8" />
            
            <h2 className="text-xl font-display font-bold mb-2">
              Connecting...
            </h2>
            <p className="text-muted-foreground mb-6">
              Setting up secure connection
            </p>
            
            <div className="w-full max-w-xs">
              <Progress value={progress} variant="brand" className="h-2" />
            </div>
          </div>
        )}

        {step === "success" && (
          <>
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-32 h-32 rounded-full bg-success/10 flex items-center justify-center mb-8 animate-bounce-once">
                <Check className="w-16 h-16 text-success" strokeWidth={1.5} />
              </div>
              
              <h1 className="text-3xl font-display font-bold mb-3">
                You're All Set!
              </h1>
              <p className="text-muted-foreground mb-8 max-w-sm text-lg">
                Your device is now connected and earning. Welcome to the network!
              </p>

              <Card className="w-full max-w-sm p-5 bg-brand-yellow/5 border-brand-yellow/20">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Welcome Bonus</p>
                  <p className="text-3xl font-display font-bold text-brand-yellow">+50 XP</p>
                  <p className="text-sm text-muted-foreground mt-1">Added to your account</p>
                </div>
              </Card>
            </div>

            <div className="space-y-3">
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full"
                onClick={finish}
              >
                Start Earning
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="lg" 
                className="w-full"
                onClick={() => setStep("intro")}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Another Device
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
