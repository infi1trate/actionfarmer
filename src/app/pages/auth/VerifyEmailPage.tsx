import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export function VerifyEmailPage() {
  const navigate = useNavigate();
  const { user, resendConfirmation } = useAuth();
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    // Get email from session storage
    const pendingEmail = sessionStorage.getItem("pendingVerificationEmail");
    if (pendingEmail) {
      setEmail(pendingEmail);
    }
  }, []);

  // Redirect if user is confirmed
  useEffect(() => {
    if (user?.email_confirmed_at) {
      sessionStorage.removeItem("pendingVerificationEmail");
      toast({
        title: "Garden saved 🌿",
        description: "Your account has been created successfully.",
        variant: "success",
      });
      navigate("/app");
    }
  }, [user, navigate]);

  // Cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleResend = async () => {
    if (!email || isResending || resendCooldown > 0) return;

    setIsResending(true);
    const { error } = await resendConfirmation(email);

    if (error) {
      toast({
        title: "Couldn't resend email",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Email sent!",
        description: "Check your inbox for the confirmation link.",
        variant: "success",
      });
      setResendCooldown(60); // 60 second cooldown
    }

    setIsResending(false);
  };

  const handleChangeEmail = () => {
    sessionStorage.removeItem("pendingVerificationEmail");
    navigate("/auth/create-account");
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-[#f0fdf4] to-[#dcfce7]">
      {/* Content area - centered vertically */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
        {/* Mail Icon */}
        <div className="w-20 h-20 rounded-full bg-[#a8e6cf]/40 flex items-center justify-center mb-8">
          <Mail className="w-10 h-10 text-[#3d5a47]" />
        </div>

        {/* Header */}
        <div className="text-center mb-10 max-w-sm">
          <h1 className="text-2xl font-semibold text-[#3d5a47] mb-3 leading-snug">
            Check your email 🌱
          </h1>
          <p className="text-[#5a7d63] text-base">
            We sent a confirmation link to{" "}
            <span className="font-medium text-[#3d5a47]">{email || "your email"}</span>.
          </p>
          <p className="text-[#5a7d63] text-base mt-2">
            Tap the link to finish setting up your garden.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4 max-w-xs w-full">
          {/* Resend */}
          <Button
            onClick={handleResend}
            disabled={isResending || resendCooldown > 0}
            variant="outline"
            className="w-full h-14 rounded-full text-base font-semibold border-[#a8e6cf] text-[#3d5a47] hover:bg-[#a8e6cf]/20"
          >
            {isResending ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : null}
            {resendCooldown > 0
              ? `Resend in ${resendCooldown}s`
              : "Resend email"}
          </Button>

          {/* Change Email */}
          <button
            onClick={handleChangeEmail}
            className="w-full text-center text-[#5a7d63] text-sm hover:text-[#3d5a47] underline underline-offset-2"
          >
            Change email
          </button>
        </div>
      </div>

      {/* Back to Sign In */}
      <div className="px-6 pb-10 pt-4 text-center">
        <button
          onClick={() => navigate("/auth/sign-in")}
          className="inline-flex items-center gap-2 text-[#6b8f74] text-sm hover:text-[#3d5a47]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </button>
      </div>
    </div>
  );
}

export default VerifyEmailPage;
