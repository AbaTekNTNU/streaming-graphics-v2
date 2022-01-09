import { AppState } from "..";
import { sendMessage } from "../dto/dtoEvents";
import { Team, TeamData } from "../types";

const sendUpdateScoreEvent = (appState: AppState) => {
  sendMessage("score", {
    type: "application",
    event: "scoreUpdate",
    home: appState.score.home,
    away: appState.score.away,
  });
};

const sendLastScoreUpdateEvent = (name: string, points: number, team: Team) => {
  sendMessage("score", {
    type: "application",
    event: "lastScoreUpdate",
    name: name,
    points: points,
    team: team,
  });
};

export { sendUpdateScoreEvent, sendLastScoreUpdateEvent };
