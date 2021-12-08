import { AppState } from "..";
import { sendMessage } from "../dto/dtoEvents";

const stopClock = () => {
  console.log("Stopping clock");
  sendMessage("score", {
    type: "application",
    event: "clock.stop",
  });
};

const startClock = () => {
  console.log("starting clock");
  sendMessage("score", {
    type: "application",
    event: "clock.start",
  });
};

const resetClock = (appState: AppState): AppState => {
  const newAppState = {
    ...appState,
    clock: {
      period: appState.clock.period,
      lastKownSecondsRemaining: 600,
    },
  };
  correctTime(newAppState);
  return newAppState;
};

const periodEnd = (appState: AppState): AppState => {
  const newAppState = {
    ...appState,
    clock: {
      period: String(parseInt(appState.clock.period) + 1),
      lastKownSecondsRemaining: 600,
    },
  };
  correctTime(newAppState);
  return newAppState;
};

const correctTime = (appState: AppState) => {
  sendMessage("score", {
    type: "application",
    event: "clockCorrection",
    remainingSeconds: appState.clock.lastKownSecondsRemaining,
    period: appState.clock.period,
  });
};

export { stopClock, startClock, correctTime, resetClock, periodEnd };
