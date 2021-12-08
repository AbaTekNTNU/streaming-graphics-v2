import { Dispatch } from "redux";
import { handleBasketEvent } from "../modules/basket/events";
import { AbaTekStreamingEvent, AbaTekStreamingModule } from "../types";

export const handleEvent = (
  event: MessageEvent<string>, // Is actually AbaTekStreamingEvent
  dispatch: Dispatch
) => {
  const data = JSON.parse(event.data) as AbaTekStreamingEvent;
  switch (data.module) {
    case AbaTekStreamingModule.BASKET:
      handleBasketEvent(data, dispatch);
      break;
  }
};
