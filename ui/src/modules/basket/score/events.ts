import { Dispatch } from "redux";
import { AbaTekStreamingEvent } from "../../../types";
import { AbatekMessage } from "../events";
import {
  correctTime,
  hideClock,
  hideScore,
  setScore,
  showClock,
  showScore,
  startClock,
  stopClock,
} from "./reducer";

enum ScoreEventControlMessages {
  SCORE_VISIBILITY = "score_visibility",
  CLOCK_VISIBILITY = "clock_visibility",
}

enum ScoreEventApplicationMessage {
  START_CLOCK = "clock.start",
  STOP_CLOCK = "clock.stop",
  UPDATE_SCORE = "scoreUpdate",
  CLOCK_CORRECITON = "clockCorrection",
}

// enum ScoreEventControlPayload {
//   SHOW,
//   HIDE,
// }

const handleScoreVisibility = (
  event: AbaTekStreamingEvent,
  dispatch: Dispatch
) => {
  if ((event as any).payload.value) {
    dispatch(showScore());
  } else {
    dispatch(hideScore());
  }
};

const handleClockVisibility = (
  event: AbaTekStreamingEvent,
  dispatch: Dispatch
) => {
  if ((event as any).payload.value) {
    dispatch(showClock());
  } else {
    dispatch(hideClock());
  }
};

const handleScoreUpdateEvent = (
  event: AbaTekStreamingEvent,
  dispatch: Dispatch
) => {
  dispatch(
    setScore({
      home: (event as any).payload.home,
      away: (event as any).payload.away,
    })
  );
};

const handleClockCorrection = (
  event: AbaTekStreamingEvent,
  dispatch: Dispatch
) => {
  dispatch(
    correctTime({
      secondsRemaining: (event as any).payload.remainingSeconds,
      period: (event as any).payload.period,
    })
  );
};

const handleScoreApplicationMessage = (
  event: AbaTekStreamingEvent,
  dispatch: Dispatch
) => {
  switch ((event as any).payload.event) {
    case ScoreEventApplicationMessage.UPDATE_SCORE:
      handleScoreUpdateEvent(event, dispatch);
      break;
    case ScoreEventApplicationMessage.CLOCK_CORRECITON:
      handleClockCorrection(event, dispatch);
      break;
    case ScoreEventApplicationMessage.START_CLOCK:
      dispatch(startClock());
      break;
    case ScoreEventApplicationMessage.STOP_CLOCK:
      dispatch(stopClock());
      break;
  }
};

export const handleScoreControllMessage = (
  event: AbaTekStreamingEvent,
  dispatch: Dispatch
) => {
  switch ((event as any).payload.control) {
    case ScoreEventControlMessages.SCORE_VISIBILITY:
      handleScoreVisibility(event, dispatch);
      break;
    case ScoreEventControlMessages.CLOCK_VISIBILITY:
      handleClockVisibility(event, dispatch);
      break;
  }
};

export const handleScoreEvent = (
  event: AbaTekStreamingEvent,
  dispatch: Dispatch
) => {
  switch ((event as any).payload.type) {
    case AbatekMessage.APPLICATION:
      handleScoreApplicationMessage(event, dispatch);
      break;
    case AbatekMessage.CONTROL:
      handleScoreControllMessage(event, dispatch);
      break;
  }
};
