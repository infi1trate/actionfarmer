import * as React from "react";

interface TransitionData {
  challengeId: string;
  video: string;
  name: string;
  rect?: DOMRect;
}

interface ChallengeTransitionContextType {
  transitionData: TransitionData | null;
  setTransitionData: (data: TransitionData | null) => void;
  isTransitioning: boolean;
  setIsTransitioning: (value: boolean) => void;
}

const ChallengeTransitionContext = React.createContext<ChallengeTransitionContextType | null>(null);

export const ChallengeTransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const [transitionData, setTransitionData] = React.useState<TransitionData | null>(null);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  return (
    <ChallengeTransitionContext.Provider value={{ transitionData, setTransitionData, isTransitioning, setIsTransitioning }}>
      {children}
    </ChallengeTransitionContext.Provider>
  );
};

export const useChallengeTransition = () => {
  const context = React.useContext(ChallengeTransitionContext);
  if (!context) {
    throw new Error("useChallengeTransition must be used within ChallengeTransitionProvider");
  }
  return context;
};

// Video mapping for challenge detail pages
export const challengeVideos: Record<string, string> = {};

export const registerChallengeVideo = (id: string, video: string) => {
  challengeVideos[id] = video;
};
