import { AppState } from ".";
import { correctTime } from "./uiEvents/clock";

const getPeriodFromPeriodName = (periodName: string): string => {
  try {
    return String(periodName.split(".")[0].toString());
  } catch (e) {
    return "E";
  }
};

// any as of request body
const handleMessageGlobalSideEffects = (
  appState: AppState,
  message: any
): AppState => {
  let remainingTime;
  let period;
  if (message["PeriodName"]) {
    period = getPeriodFromPeriodName(message["PeriodName"]);
  }
  if (message["Time"]) {
    const calculatedRemainingTime = 600 - Number(message["Time"]);
    if (
      appState.clock.lastKownSecondsRemaining > calculatedRemainingTime ||
      period !== appState.clock.period
    ) {
      remainingTime = calculatedRemainingTime;
    } else {
      remainingTime = appState.clock.lastKownSecondsRemaining;
    }
  }

  const newAppState: AppState = {
    ...appState,
    clock: {
      period: period ?? appState.clock.period,
      lastKownSecondsRemaining:
        remainingTime ?? appState.clock.lastKownSecondsRemaining,
    },
  };
  correctTime(newAppState);
  return newAppState;
};

export { handleMessageGlobalSideEffects };
