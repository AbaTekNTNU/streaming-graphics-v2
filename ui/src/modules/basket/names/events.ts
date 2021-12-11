import { Dispatch } from "redux";
import { AbaTekStreamingEvent } from "../../../types";
import { AbatekMessage } from "../events";
import {
  hideNameOverlay,
  setCoachOverlay,
  setPlayerFullOverlay,
  showNameOverlay,
} from "./reducer";

enum NameOverlayControlMessages {
  VISIBILITY = "nameOverlay.visibility",
}

enum NameOverlayApplicationMessage {
  PLAYER_FULL_UPDATE = "nameOverlay.Player.Full.Update",
  COACH_FULL_UPDATE = "nameOverlay.Coach.Full.Update",
}

const handlePlayerFullUpdate = (
  event: AbaTekStreamingEvent,
  dispatch: Dispatch
) => {
  dispatch(
    setPlayerFullOverlay({
      team: (event as any).payload.team,
      player: (event as any).payload.player,
    })
  );
};

const handleCoachFullUpdate = (
  event: AbaTekStreamingEvent,
  dispatch: Dispatch
) => {
  dispatch(
    setCoachOverlay({
      team: (event as any).payload.team,
      coach: (event as any).payload.coach,
    })
  );
};

const handleNameOverlayVisibility = (
  event: AbaTekStreamingEvent,
  dispatch: Dispatch
) => {
  if ((event as any).payload.value) {
    dispatch(showNameOverlay());
  } else {
    dispatch(hideNameOverlay());
  }
};

const handleNameOverlayApplicationEvent = (
  event: AbaTekStreamingEvent,
  dispatch: Dispatch
) => {
  switch ((event as any).payload.event) {
    case NameOverlayApplicationMessage.PLAYER_FULL_UPDATE:
      handlePlayerFullUpdate(event, dispatch);
      break;
    case NameOverlayApplicationMessage.COACH_FULL_UPDATE:
      handleCoachFullUpdate(event, dispatch);
      break;
  }
};

const handleNameOverlayControlEvent = (
  event: AbaTekStreamingEvent,
  dispatch: Dispatch
) => {
  switch ((event as any).payload.event) {
    case NameOverlayControlMessages.VISIBILITY:
      handleNameOverlayVisibility(event, dispatch);
      break;
  }
};

const handleNameOverlayEvent = (
  event: AbaTekStreamingEvent,
  dispatch: Dispatch
) => {
  switch ((event as any).payload.type) {
    case AbatekMessage.CONTROL:
      handleNameOverlayControlEvent(event, dispatch);
      break;

    case AbatekMessage.APPLICATION:
      handleNameOverlayApplicationEvent(event, dispatch);
  }
};

export { handleNameOverlayEvent };
