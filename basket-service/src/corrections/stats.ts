import { AppState } from "..";
import { getTeam } from "../team";
import { Correction, PlayerStats, Team } from "../types";

type CorrectScoreRequest = {
  type: Correction.STATS;
  payload: {
    playerId: number;
    team: Team;
    stats: PlayerStats;
  };
};

const correctStats = (
  appState: AppState,
  correctionRequest: CorrectScoreRequest
): AppState => {
  const teamToModify = getTeam(appState, correctionRequest.payload.team);
  const player = teamToModify.players.find(
    (it) => it.personId === correctionRequest.payload.playerId
  );

  if (player === undefined) {
    throw new Error("Could not find player");
  }

  player.stats = correctionRequest.payload.stats;

  return appState;
};

export { correctStats };
