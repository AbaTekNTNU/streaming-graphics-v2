import { Dispatch } from "redux";
import { AbaTekStreamingEvent, AbaTekStreamingEventType } from "../../types";
import { handleFiriLogoEvent } from "./firilogo/events";
import { handleScoreEvent } from "./score/events";
import { handleGameEvent } from "./team/events";

export enum AbatekMessage {
  CONTROL = "control",
  APPLICATION = "application",
}

export const handleBasketEvent = (
  event: AbaTekStreamingEvent,
  dispatch: Dispatch
) => {
  switch (event.type) {
    case AbaTekStreamingEventType.SCORE:
      handleScoreEvent(event, dispatch);
      break;
    case AbaTekStreamingEventType.FIRI_LOGO_EVENT:
      handleFiriLogoEvent(event, dispatch);
      break;
    case AbaTekStreamingEventType.GAME_INFORMATION:
      handleGameEvent(event, dispatch);
      break;
  }
};
