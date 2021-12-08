import { AppState } from "..";
import { sendMessage } from "../dto/dtoEvents";

const sendUpdateScoreEvent = (appState: AppState) => {
  sendMessage("score", {
    type: "application",
    event: "scoreUpdate",
    home: appState.score.home,
    away: appState.score.away,
  });
};

export { sendUpdateScoreEvent };
