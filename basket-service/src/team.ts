import { AppState } from ".";
import { NifDefaultTypes } from "./event";
import { Team, TeamData } from "./types";

const getTeamFromMessage = (message: any): Team => {
  if (message[NifDefaultTypes.TEAM] === Team.HOME) {
    return Team.HOME;
  }
  return Team.AWAY;
};

const getTeam = (appState: AppState, team: Team): TeamData => {
  if (team === Team.HOME) {
    if (!appState.teams) {
      throw new Error("Home team is undefined");
    } else {
      return appState.teams.home;
    }
  } else if (team === Team.AWAY) {
    if (!appState.teams?.away) {
      throw new Error("Away team is undefined");
    }
    return appState.teams?.away;
  }
  throw new Error("Could not find team");
};

export { getTeam, getTeamFromMessage };
