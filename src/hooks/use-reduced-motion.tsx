import * as React from "react";

const REDUCED_MOTION_KEY = "depin-reduce-motion";

type ReducedMotionContextValue = {
  prefersReducedMotion: boolean;
  userReducedMotion: boolean | null;
  effectiveReducedMotion: boolean;
  setReducedMotion: (value: boolean | null) => void;
};

const ReducedMotionContext = React.createContext<ReducedMotionContextValue | undefined>(undefined);

function getInitialUserPreference(): boolean | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(REDUCED_MOTION_KEY);
  if (stored === "true") return true;
  if (stored === "false") return false;
  return null;
}

function getSystemPreference(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ReducedMotionProvider({ children }: { children: React.ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(getSystemPreference);
  const [userReducedMotion, setUserReducedMotion] = React.useState<boolean | null>(getInitialUserPreference);

  // Listen for system preference changes
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Apply class to html element
  React.useEffect(() => {
    const effective = userReducedMotion ?? prefersReducedMotion;
    if (effective) {
      document.documentElement.classList.add("reduce-motion");
    } else {
      document.documentElement.classList.remove("reduce-motion");
    }
  }, [userReducedMotion, prefersReducedMotion]);

  const setReducedMotion = React.useCallback((value: boolean | null) => {
    setUserReducedMotion(value);
    if (value === null) {
      localStorage.removeItem(REDUCED_MOTION_KEY);
    } else {
      localStorage.setItem(REDUCED_MOTION_KEY, String(value));
    }
  }, []);

  const effectiveReducedMotion = userReducedMotion ?? prefersReducedMotion;

  return (
    <ReducedMotionContext.Provider
      value={{
        prefersReducedMotion,
        userReducedMotion,
        effectiveReducedMotion,
        setReducedMotion,
      }}
    >
      {children}
    </ReducedMotionContext.Provider>
  );
}

export function useReducedMotion() {
  const context = React.useContext(ReducedMotionContext);
  if (!context) {
    throw new Error("useReducedMotion must be used within a ReducedMotionProvider");
  }
  return context;
}

// Standalone hook for simple use cases
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}
