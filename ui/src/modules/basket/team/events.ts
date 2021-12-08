import { Dispatch } from "redux";
import { AbaTekStreamingEvent } from "../../../types";
import { AbatekMessage } from "../events";
import {
  hideGameInitialSummary,
  hideTeamInformation,
  showGameInitialSummary,
  showTeamInformation,
} from "./reducer";

enum GameEventMessage {
  GAME_INITIAL_SUMMARY = "game.initial.summary",
  TEAM_INFORMATION = "team.information",
}

const handleGameEventControl = (
  event: AbaTekStreamingEvent,
  dispatch: Dispatch
) => {
  switch ((event as any).payload.control) {
    case GameEventMessage.GAME_INITIAL_SUMMARY:
      if ((event as any).payload.value) {
        dispatch(showGameInitialSummary());
      } else {
        dispatch(hideGameInitialSummary());
      }
      break;
    case GameEventMessage.TEAM_INFORMATION:
      if ((event as any).payload.value) {
        dispatch(showTeamInformation());
      } else {
        dispatch(hideTeamInformation());
      }
  }
};

export const handleGameEvent = (
  event: AbaTekStreamingEvent,
  dispatch: Dispatch
) => {
  switch ((event as any).payload.type) {
    case AbatekMessage.CONTROL:
      handleGameEventControl(event, dispatch);
      break;
  }
};
