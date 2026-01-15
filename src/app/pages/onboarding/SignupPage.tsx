import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function SignupPage() {
  const navigate = useNavigate();

  // Redirect to the new auth flow
  useEffect(() => {
    navigate("/auth/create-account", { replace: true });
  }, [navigate]);

  return null;
}

export default SignupPage;
