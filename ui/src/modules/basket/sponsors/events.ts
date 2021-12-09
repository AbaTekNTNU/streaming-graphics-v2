import { Dispatch } from "redux";
import { AbaTekStreamingEvent } from "../../../types";
import { AbatekMessage } from "../events";
import { hideSponsorDisplay, showSponsorDisplay } from "./reducer";

enum AbaTekSponsorControlMessage {
  SPONSOR_DISPLAY = "sponsor.display",
}

const handleSponsorControlMessage = (
  event: AbaTekStreamingEvent,
  dispatch: Dispatch
) => {
  console.log(event);
  console.log("hey");
  switch ((event as any).payload.control) {
    case AbaTekSponsorControlMessage.SPONSOR_DISPLAY:
      if ((event as any).payload.value) {
        dispatch(showSponsorDisplay());
      } else {
        dispatch(hideSponsorDisplay());
      }
      break;
  }
};

const handleSponsorDisplayEvent = (
  event: AbaTekStreamingEvent,
  dispatch: Dispatch
) => {
  switch ((event as any).payload.type) {
    case AbatekMessage.CONTROL:
      handleSponsorControlMessage(event, dispatch);
      break;
  }
};

export { handleSponsorDisplayEvent };
