import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Apple, Mail } from "lucide-react";

export function SignupPage() {
  const navigate = useNavigate();

  const handleApple = () => {
    // Apple auth would go here
    navigate("/onboarding/ready");
  };

  const handleGoogle = () => {
    // Google auth would go here
    navigate("/onboarding/ready");
  };

  const handleEmail = () => {
    // Email auth would go here
    navigate("/onboarding/ready");
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-[#f0fdf4] to-[#dcfce7]">
      {/* Content area - centered vertically */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-semibold text-[#3d5a47] mb-3 leading-snug">
            Save your garden
          </h1>
          <p className="text-[#5a7d63] text-base px-4">
            Create an account to keep your progress, plants, and insights.
          </p>
        </div>

        {/* Auth Options */}
        <div className="space-y-3 max-w-xs mx-auto w-full">
          {/* Apple */}
          <Button
            onClick={handleApple}
            leftIcon={<Apple className="w-5 h-5" />}
            className="w-full h-14 rounded-full text-base font-semibold bg-black hover:bg-gray-900 text-white"
          >
            Continue with Apple
          </Button>

          {/* Google */}
          <Button
            onClick={handleGoogle}
            leftIcon={
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            }
            className="w-full h-14 rounded-full text-base font-semibold bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
          >
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 py-2">
            <div className="flex-1 h-px bg-[#a8e6cf]" />
            <span className="text-[#6b8f74] text-sm">or</span>
            <div className="flex-1 h-px bg-[#a8e6cf]" />
          </div>

          {/* Email */}
          <Button
            onClick={handleEmail}
            leftIcon={<Mail className="w-5 h-5" />}
            className="w-full h-14 rounded-full text-lg font-semibold"
            style={{
              background: "linear-gradient(180deg, #FFD966 0%, #F5C542 100%)",
              color: "#5D4037",
              border: "2px solid rgba(255,255,255,0.5)",
              boxShadow: "0 4px 20px rgba(245, 197, 66, 0.3)",
            }}
          >
            Continue with Email
          </Button>
        </div>
      </div>

      {/* Footer hint */}
      <div className="px-6 pb-10 pt-4 text-center">
        <p className="text-[#6b8f74] text-xs">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
