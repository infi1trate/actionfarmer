import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export function SignInPage() {
  const navigate = useNavigate();
  const { signIn, user, profile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  // Auto-focus email on mount
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const firstName = profile?.first_name || "there";
      toast({
        title: `Welcome back, ${firstName} 🌿`,
        variant: "success",
      });
      navigate("/app");
    }
  }, [user, profile, navigate]);

  const onSubmit = async (data: SignInFormData) => {
    setIsSubmitting(true);

    const { error } = await signIn(data.email, data.password);

    if (error) {
      toast({
        title: "Couldn't sign in",
        description: error.message,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Navigation handled by useEffect above
  };

  // Watch form values for validation
  const formValues = watch();
  const isFormValid = isValid && formValues.email?.trim() && formValues.password;

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-[#f0fdf4] to-[#dcfce7]">
      {/* Content area - centered vertically */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-semibold text-[#3d5a47] mb-3 leading-snug">
            Welcome back
          </h1>
          <p className="text-[#5a7d63] text-base px-4">
            Sign in to continue growing your garden.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 max-w-sm mx-auto w-full"
        >
          {/* Email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-[#3d5a47] font-medium text-sm"
            >
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...register("email")}
              ref={(e) => {
                register("email").ref(e);
                (emailRef as React.MutableRefObject<HTMLInputElement | null>).current = e;
              }}
              className="h-14 text-base rounded-xl border-[#a8e6cf] focus:border-[#6bbf8a] focus:ring-[#6bbf8a] bg-white/80"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-[#3d5a47] font-medium text-sm"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                autoComplete="current-password"
                {...register("password")}
                className="h-14 text-base rounded-xl border-[#a8e6cf] focus:border-[#6bbf8a] focus:ring-[#6bbf8a] bg-white/80 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b8f74] hover:text-[#3d5a47] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full h-16 rounded-full text-xl font-bold shadow-xl mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: isFormValid && !isSubmitting
                ? "linear-gradient(180deg, #FFD966 0%, #F5C542 100%)"
                : "linear-gradient(180deg, #e0e0e0 0%, #c9c9c9 100%)",
              color: isFormValid && !isSubmitting ? "#5D4037" : "#888",
              border: "3px solid rgba(255,255,255,0.5)",
              boxShadow: isFormValid && !isSubmitting
                ? "0 6px 28px rgba(245, 197, 66, 0.5)"
                : "none",
            }}
          >
            {isSubmitting ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              "Sign in"
            )}
          </Button>

          {/* Create Account Link */}
          <div className="text-center pt-2">
            <Link
              to="/auth/create-account"
              className="text-[#5a7d63] text-sm hover:text-[#3d5a47] underline underline-offset-2"
            >
              Don't have an account? Create one
            </Link>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="px-6 pb-10 pt-4 text-center">
        <p className="text-[#6b8f74] text-xs">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default SignInPage;
