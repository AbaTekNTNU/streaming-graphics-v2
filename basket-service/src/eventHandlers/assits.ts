import { AppState } from "..";
import { Team, TeamData } from "../types";

const handleInduvidualAssist = (
  appState: AppState,
  playerId: number,
  team: Team
): AppState => {
  let teamThatScored: TeamData | null = null;
  if (team === Team.HOME) {
    teamThatScored = appState.teams?.home ?? null;
  } else {
    teamThatScored = appState.teams?.away ?? null;
  }

  if (teamThatScored === null) {
    console.log("players not setup correctly");
  }

  const player = teamThatScored?.players.find(
    (player) => player.personId === playerId
  );

  if (player === undefined) {
    // players have not been set up yet, however store player information
    const undefinedPlayer = appState.undefinedPlayers.find(
      (player) => player.personId === playerId
    );

    if (undefinedPlayer === undefined) {
      appState.undefinedPlayers.push({
        personId: playerId,
        stats: {
          points: 0,
          assists: 1,
          turnovers: 0,
          shotsMade: {
            1: 0,
            2: 0,
            3: 0,
          },
          shotsMissed: {
            1: 0,
            2: 0,
            3: 0,
          },
        },
      });
    } else {
      // undefined player is already setup
      undefinedPlayer.stats.assists += 1;
    }
  } else {
    player.stats.assists += 1;
  }

  return appState;
};

const handleAssistsEvent = (
  appState: AppState,
  playerId: number,
  team: Team
): AppState => {
  const newAppState = handleInduvidualAssist(appState, playerId, team);
  return newAppState;
};

export { handleAssistsEvent };
