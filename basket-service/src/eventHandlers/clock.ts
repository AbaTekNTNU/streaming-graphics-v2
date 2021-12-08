import { AppState } from "..";
import { EventResult, InternalEvent } from "../event";
import { periodEnd, startClock, stopClock } from "../uiEvents/clock";

enum ClockEvent {
  START = 1,
  STOP = 2,
  PERIOD_END = 7,
}

export enum ClockNifEvent {
  TYPE = "Type",
}

const handleClockEvent = (
  appState: AppState,
  type: ClockEvent
): [AppState, EventResult] => {
  if (type === ClockEvent.START) {
    startClock();
    return [appState, { event: InternalEvent.START }];
  } else if (type === ClockEvent.STOP) {
    stopClock();
    return [appState, { event: InternalEvent.STOP }];
  } else if (type === ClockEvent.PERIOD_END) {
    return [periodEnd(appState), { event: InternalEvent.RESET_CLOCK }];
  }
  return [appState, { event: InternalEvent.NOTHING }];
};

export { handleClockEvent };
