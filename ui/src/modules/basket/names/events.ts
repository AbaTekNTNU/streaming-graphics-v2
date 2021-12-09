import { Dispatch } from "redux";
import { AbaTekStreamingEvent } from "../../../types";
import { AbatekMessage } from "../events";
import {
  hideNameOverlay,
  setPlayerFullOverlay,
  showNameOverlay,
} from "./reducer";

enum NameOverlayControlMessages {
  VISIBILITY = "nameOverlay.visibility",
}

enum NameOverlayApplicationMessage {
  PLAYER_FULL_UPDATE = "nameOverlay.Player.Full.Update",
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
