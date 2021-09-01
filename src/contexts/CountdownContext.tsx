import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChallengesContext } from "./ChallengeContext";

import { event as GAEvent } from "../lib/ga";

interface CountdownContextData {
  isActive: boolean;
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  resetCountdown: () => void;
  startCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const totalTime = 1;
  const [time, setTime] = useState(totalTime);
  const [finish, setFinish] = useState<number>();
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    GAEvent({
      action: "start_countdown",
      category: "countdown",
      label: "Start Countdown",
      value: 1,
    });

    setIsActive(true);
    setFinish(Date.now() + totalTime * 1000);

    setTimeout(() => {
      startNewChallenge();
    }, totalTime * 1000);
  }

  function resetCountdown() {
    GAEvent({
      action: "reset_countdown",
      category: "countdown",
      label: "Reset Countdown",
      value: 1,
    });

    clearTimeout(countdownTimeout);
    setIsActive(false);
    setHasFinished(false);
    setTime(totalTime);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        const now = Math.floor((finish - Date.now()) / 1000);
        setTime(now <= 0 ? 0 : now);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
    }
  }, [time, isActive]);

  return (
    <CountdownContext.Provider
      value={{
        isActive,
        minutes,
        seconds,
        hasFinished,
        resetCountdown,
        startCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
